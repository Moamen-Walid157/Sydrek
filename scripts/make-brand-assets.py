"""Install the official Sydrek lockup and digital icons.

Reads the brand masters from the Sydrek Source folder and the attached
app-icon exports, then writes every public logo the site actually serves.
"""

from pathlib import Path
import shutil

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
IMAGES = PUBLIC / "images"
APP = ROOT / "app"
BACKEND_PUBLIC = ROOT / "backend" / "public"

SRC_PNG = Path(r"c:\Users\hp\Desktop\Sydrek Source\Branding\Logos\PNG")
SRC_SVG = Path(r"c:\Users\hp\Desktop\Sydrek Source\Branding\Logos\SVG")
ATTACHED = Path(r"C:\Users\hp\.cursor\projects\c-Users-hp-Desktop-Sydrek\assets")


def find_attached(token: str) -> Path:
    matches = [path for path in ATTACHED.glob("*.png") if token in path.name]
    if not matches:
        raise FileNotFoundError(token)
    return matches[0]


def flatten(image: Image.Image, color: tuple[int, int, int] = (10, 22, 56)) -> Image.Image:
    rgba = image.convert("RGBA")
    base = Image.new("RGBA", rgba.size, (*color, 255))
    base.alpha_composite(rgba)
    return base.convert("RGB")


def save_jpeg(image: Image.Image, path: Path, quality: int) -> None:
    image.save(path, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=1)


def place(source: Image.Image, size: tuple[int, int], align: str = "center") -> Image.Image:
    """Fit the artwork inside the frame and extend its own edge color into any leftover."""
    flat = flatten(source)
    fitted = flat.copy()
    fitted.thumbnail(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, fitted.getpixel((0, 0)))
    if align == "right":
        x = size[0] - fitted.width
    else:
        x = (size[0] - fitted.width) // 2
    y = (size[1] - fitted.height) // 2
    if x > 0:
        left = fitted.crop((0, 0, 1, fitted.height)).resize((x, fitted.height), Image.Resampling.NEAREST)
        canvas.paste(left, (0, y))
    right_w = size[0] - x - fitted.width
    if right_w > 0:
        right = fitted.crop((fitted.width - 1, 0, fitted.width, fitted.height)).resize((right_w, fitted.height), Image.Resampling.NEAREST)
        canvas.paste(right, (x + fitted.width, y))
    if y > 0:
        top = fitted.crop((0, 0, fitted.width, 1)).resize((fitted.width, y), Image.Resampling.NEAREST)
        canvas.paste(top, (x, 0))
        bottom_h = size[1] - y - fitted.height
        bottom = fitted.crop((0, fitted.height - 1, fitted.width, fitted.height)).resize((fitted.width, bottom_h), Image.Resampling.NEAREST)
        canvas.paste(bottom, (x, y + fitted.height))
    canvas.paste(fitted, (x, y))
    return canvas


def copy_masters() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    IMAGES.mkdir(parents=True, exist_ok=True)

    svg_names = {
        "Sydrek-Symbol-3D.svg": "symbol.svg",
        "Sydrek-Symbol-3D-on-Navy.svg": "symbol-navy.svg",
        "Sydrek-Logo-Horizontal-3D.svg": "logo-horizontal.svg",
        "Sydrek-Logo-Horizontal-3D-on-Navy.svg": "logo-horizontal-navy.svg",
        "Sydrek-Logo-Primary-3D.svg": "logo-primary.svg",
        "Sydrek-Logo-Primary-3D-on-Navy.svg": "logo-primary-navy.svg",
    }
    png_names = {
        "Sydrek-Symbol-3D_2048px.png": "symbol.png",
        "Sydrek-Symbol-3D-on-Navy_2048px.png": "symbol-navy.png",
        "Sydrek-Logo-Horizontal-3D_2048px.png": "logo-horizontal.png",
        "Sydrek-Logo-Horizontal-3D-on-Navy_2048px.png": "logo-horizontal-navy.png",
        "Sydrek-Logo-Primary-3D_2048px.png": "logo-primary.png",
        "Sydrek-Logo-Primary-3D-on-Navy_2048px.png": "logo-primary-navy.png",
    }
    for source, dest in svg_names.items():
        shutil.copyfile(SRC_SVG / source, BRAND / dest)
    for source, dest in png_names.items():
        shutil.copyfile(SRC_PNG / source, BRAND / dest)

    shutil.copyfile(find_attached("App-Icon_1024x1024"), BRAND / "app-icon-1024.png")
    shutil.copyfile(find_attached("App-Icon_512x512"), BRAND / "app-icon-512.png")
    shutil.copyfile(find_attached("Email-Signature-Logo_600px"), BRAND / "email-signature.png")


def install_icons() -> None:
    master = Image.open(BRAND / "app-icon-1024.png").convert("RGBA")
    shutil.copyfile(find_attached("App-Icon_512x512"), PUBLIC / "icon-512.png")
    shutil.copyfile(find_attached("App-Icon_192x192"), PUBLIC / "icon-192.png")
    shutil.copyfile(find_attached("App-Icon_180x180"), PUBLIC / "apple-touch-icon.png")
    shutil.copyfile(PUBLIC / "icon-512.png", APP / "icon.png")
    shutil.copyfile(PUBLIC / "apple-touch-icon.png", APP / "apple-icon.png")
    shutil.copyfile(PUBLIC / "icon-512.png", IMAGES / "mark.png")

    for size, name in ((16, "favicon-16x16.png"), (32, "favicon-32x32.png")):
        master.resize((size, size), Image.Resampling.LANCZOS).save(PUBLIC / name, "PNG", optimize=True)

    icon_48 = master.resize((48, 48), Image.Resampling.LANCZOS)
    icon_32 = master.resize((32, 32), Image.Resampling.LANCZOS)
    icon_16 = master.resize((16, 16), Image.Resampling.LANCZOS)
    for dest in (PUBLIC / "favicon.ico", APP / "favicon.ico", BACKEND_PUBLIC / "favicon.ico"):
        icon_48.save(dest, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)], append_images=[icon_32, icon_16])


def install_frames() -> None:
    symbol = Image.open(SRC_PNG / "Sydrek-Symbol-3D-on-Navy_4096px.png")
    horizontal = Image.open(SRC_PNG / "Sydrek-Logo-Horizontal-3D-on-Navy_4096px.png")
    primary = Image.open(SRC_PNG / "Sydrek-Logo-Primary-3D-on-Navy_4096px.png")

    # Symbol sits on the right, where the hero gradient opens.
    save_jpeg(place(symbol, (2400, 1350), "right"), IMAGES / "cover.jpg", 86)
    save_jpeg(place(symbol, (1600, 1600)), IMAGES / "mark-full.jpg", 88)
    save_jpeg(place(horizontal, (1800, 1000)), IMAGES / "mockup-desk.jpg", 88)
    save_jpeg(place(symbol, (1600, 1000)), IMAGES / "mockup-phone.jpg", 88)
    save_jpeg(place(primary, (1800, 1000)), IMAGES / "mockup-identity.jpg", 88)

    og = place(horizontal, (1200, 630))
    og_path = PUBLIC / "og.jpg"
    quality = 82
    save_jpeg(og, og_path, quality)
    while og_path.stat().st_size > 240_000 and quality > 52:
        quality -= 4
        save_jpeg(og, og_path, quality)

    save_jpeg(place(symbol, (800, 800)), PUBLIC / "og-square.jpg", 82)
    print("og.jpg", og_path.stat().st_size, "q", quality)
    print("cover.jpg", (IMAGES / "cover.jpg").stat().st_size)


if __name__ == "__main__":
    copy_masters()
    install_icons()
    install_frames()
    print("brand assets installed")
