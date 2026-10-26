"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Config } from "@imgly/background-removal";
import { Download, ImagePlus } from "lucide-react";
import { Segmented } from "@/components/tools/segmented";
import { cn } from "@/lib/utils";

const MAX_BYTES = 25 * 1024 * 1024;

/** Same asset host and model the working studio tool uses. */
const PUBLIC_PATH = "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/";

const backgrounds = [
  { id: "clear" as const, label: "Clear" },
  { id: "white" as const, label: "White" },
  { id: "ink" as const, label: "Ink" },
  { id: "custom" as const, label: "Color" },
];

const views = [
  { id: "cut" as const, label: "Cut" },
  { id: "original" as const, label: "Original" },
];

type BackgroundId = (typeof backgrounds)[number]["id"];
type ViewId = (typeof views)[number]["id"];

type Status =
  | { phase: "idle" }
  | { phase: "running"; label: string; percent: number }
  | { phase: "done"; seconds: number }
  | { phase: "error"; message: string };

const progressRef: { current: (key: string, current: number, total: number) => void } = {
  current: () => {},
};

export function BackgroundRemoval() {
  const inputRef = useRef<HTMLInputElement>(null);
  const sourceRef = useRef<string | null>(null);
  const resultRef = useRef<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [cut, setCut] = useState<Blob | null>(null);
  const [background, setBackground] = useState<BackgroundId>("clear");
  const [custom, setCustom] = useState("#2563ff");
  const [view, setView] = useState<ViewId>("cut");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>({ phase: "idle" });

  const running = status.phase === "running";
  const fill = background === "clear" ? null : background === "white" ? "#ffffff" : background === "ink" ? "#070b1a" : custom;
  const shown = view === "original" || !resultUrl ? sourceUrl : resultUrl;

  useEffect(() => {
    return () => {
      if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
      if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cut) return;
    let cancel = false;
    void compose(cut, fill)
      .then((next) => {
        if (cancel) {
          URL.revokeObjectURL(next);
          return;
        }
        if (resultRef.current) URL.revokeObjectURL(resultRef.current);
        resultRef.current = next;
        setResultUrl(next);
      })
      .catch(() => {
        if (cancel) return;
        const next = URL.createObjectURL(cut);
        if (resultRef.current) URL.revokeObjectURL(resultRef.current);
        resultRef.current = next;
        setResultUrl(next);
      });
    return () => {
      cancel = true;
    };
  }, [cut, fill]);

  const rememberSource = useCallback((url: string) => {
    if (sourceRef.current) URL.revokeObjectURL(sourceRef.current);
    sourceRef.current = url;
    setSourceUrl(url);
  }, []);

  const clearCut = useCallback(() => {
    if (resultRef.current) URL.revokeObjectURL(resultRef.current);
    resultRef.current = null;
    setResultUrl(null);
    setCut(null);
  }, []);

  const takeFile = useCallback(
    async (file: File) => {
      if (running) return;
      if (!file.type.startsWith("image/")) {
        setStatus({ phase: "error", message: "Use a PNG, JPG, or WebP." });
        return;
      }
      if (file.size > MAX_BYTES) {
        setStatus({ phase: "error", message: "This photo is over 25 MB. Export a smaller copy and try again." });
        return;
      }
      const url = URL.createObjectURL(file);
      const readable = await canDecode(url);
      if (!readable) {
        URL.revokeObjectURL(url);
        setStatus({ phase: "error", message: "This browser can't read that file. Use a PNG, JPG, or WebP." });
        return;
      }
      clearCut();
      rememberSource(url);
      setFileName(file.name || "photo");
      setFileSize(file.size);
      setView("original");
      setStatus({ phase: "idle" });
    },
    [clearCut, rememberSource, running],
  );

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      const file = [...(event.clipboardData?.files ?? [])].find((item) => item.type.startsWith("image/"));
      if (!file) return;
      event.preventDefault();
      void takeFile(file);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [takeFile]);

  async function cutBackground() {
    const source = sourceRef.current;
    if (!source || running) return;
    const started = performance.now();
    progressRef.current = (key, current, total) => {
      setStatus({ phase: "running", ...describeProgress(key, current, total) });
    };
    setStatus({ phase: "running", label: "Preparing the model", percent: 4 });
    setView("cut");
    try {
      const response = await fetch(source);
      const blob = await response.blob();
      await quietRuntime();
      const { removeBackground } = await import("@imgly/background-removal");
      const config: Config = {
        debug: false,
        publicPath: PUBLIC_PATH,
        device: "gpu",
        model: "isnet_fp16",
        rescale: true,
        output: { format: "image/png", quality: 0.8 },
        progress: (key, current, total) => progressRef.current(key, current, total),
      };
      const result = await removeBackground(blob, config);
      setCut(result);
      setStatus({ phase: "done", seconds: Math.round((performance.now() - started) / 100) / 10 });
    } catch (error) {
      console.error(error);
      setStatus({
        phase: "error",
        message: "The cut didn't finish. Stay on this page and try again. The first run needs the model download to complete.",
      });
    }
  }

  function download() {
    if (!resultRef.current) return;
    const anchor = document.createElement("a");
    anchor.href = resultRef.current;
    const base = fileName.replace(/\.[^.]+$/, "") || "sydrek";
    anchor.download = `${base}-cut.png`;
    anchor.click();
  }

  return (
    <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div
        className={cn(
          "checker relative min-h-[420px] overflow-hidden rounded-[28px] border border-line",
          dragging && "ring-2 ring-[#22d3ee]",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          if (!running) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files[0];
          if (file) void takeFile(file);
        }}
      >
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt={view === "original" ? "Original photo" : "Photo with the background removed"} className="mx-auto max-h-[70vh] w-full object-contain" />
        ) : (
          <button
            type="button"
            className="grid min-h-[420px] w-full place-items-center px-6 text-center"
            onClick={() => inputRef.current?.click()}
          >
            <span>
              <ImagePlus className="mx-auto text-[#2563ff] dark:text-[#22d3ee]" size={28} />
              <span className="mt-4 block font-display text-2xl tracking-[-0.04em]">Drop a photo here</span>
              <span className="mt-2 block text-sm text-muted">PNG, JPG, or WebP, up to 25 MB. You can also paste one.</span>
            </span>
          </button>
        )}
        {status.phase === "running" && (
          <div className="absolute inset-0 grid place-items-center bg-[#070b1a]/50 px-6 text-center text-sm font-semibold text-white">
            {status.label}
          </div>
        )}
        {shown && (
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-end justify-between gap-2">
            <button type="button" className="btn btn-ghost bg-bg/80 backdrop-blur" onClick={() => inputRef.current?.click()} disabled={running}>
              Replace
            </button>
            {resultUrl && (
              <div className="rounded-2xl bg-bg/80 px-3 py-2 backdrop-blur">
                <Segmented label="View" value={view} options={views} onChange={setView} />
              </div>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void takeFile(file);
          }}
        />
      </div>

      <div className="glass grid gap-5 rounded-[28px] p-6 lg:sticky lg:top-28">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Photo</p>
          <p className="mt-2 truncate text-sm">{fileName || "No photo yet"}</p>
          {fileSize > 0 && <p className="text-xs text-muted">{formatBytes(fileSize)}</p>}
        </div>

        <p className="text-xs leading-relaxed text-muted">
          Detailed model, about 80 MB the first time. After that, this browser keeps the copy. Hair and product edges stay in the cut.
        </p>

        <Segmented label="Background" value={background} options={backgrounds} onChange={setBackground} />
        {background === "custom" && (
          <label className="flex items-center gap-3 text-sm">
            <input
              type="color"
              value={custom}
              aria-label="Background color"
              className="size-9 cursor-pointer rounded-full border border-line bg-transparent p-1"
              onChange={(event) => setCustom(event.target.value)}
            />
            <span className="font-mono text-xs text-muted uppercase">{custom}</span>
          </label>
        )}

        {status.phase === "running" && (
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>{status.label}</span>
              <span className="font-mono text-muted">{status.percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee] transition-[width] duration-300" style={{ width: `${status.percent}%` }} />
            </div>
          </div>
        )}
        {status.phase === "done" && <p className="text-sm text-good">Cut finished in {status.seconds}s.</p>}
        {status.phase === "error" && <p className="text-sm text-bad">{status.message}</p>}

        <button type="button" className="btn btn-primary disabled:pointer-events-none disabled:opacity-50" disabled={!sourceUrl || running} onClick={() => void cutBackground()}>
          {running ? "Cutting…" : resultUrl ? "Cut again" : "Remove background"}
        </button>
        <button type="button" className="btn btn-ghost disabled:pointer-events-none disabled:opacity-50" disabled={!resultUrl || running} onClick={download}>
          <Download size={16} />
          Download PNG
        </button>

        <p className="text-xs leading-relaxed text-muted">
          The photo stays in this browser. Sydrek does not upload it.{" "}
          <a className="underline decoration-line underline-offset-2 hover:text-fg" href="https://github.com/imgly/background-removal-js" target="_blank" rel="noreferrer">
            Background removal by IMG.LY
          </a>
          .
        </p>
      </div>
    </div>
  );
}

async function quietRuntime() {
  const modules = await Promise.all([import("onnxruntime-web/webgpu"), import("onnxruntime-web")]);
  for (const runtime of modules) {
    const ort = runtime.default ?? runtime;
    if (ort && typeof ort === "object" && "env" in ort && ort.env) {
      ort.env.logLevel = "error";
    }
  }
}

function describeProgress(key: string, current: number, total: number) {
  if (key.startsWith("fetch:")) {
    const percent = total > 0 ? Math.round((current / total) * 100) : 0;
    const label = key.includes("model") ? "Downloading the model" : key.includes("onnx") ? "Downloading the engine" : "Downloading files";
    return { label, percent: Math.min(99, Math.max(1, percent)) };
  }
  if (key === "compute:decode") return { label: "Reading the image", percent: 20 };
  if (key === "compute:inference") return { label: "Finding the subject", percent: 62 };
  if (key === "compute:mask") return { label: "Cutting the background", percent: 84 };
  if (key === "compute:encode") return { label: "Preparing the file", percent: current >= total ? 100 : 94 };
  return { label: "Working", percent: 8 };
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function canDecode(url: string) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.naturalWidth > 0);
    image.onerror = () => resolve(false);
    image.src = url;
  });
}

async function compose(blob: Blob, fill: string | null) {
  if (!fill) return URL.createObjectURL(blob);
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    return URL.createObjectURL(blob);
  }
  context.fillStyle = fill;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const painted = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  return URL.createObjectURL(painted ?? blob);
}
