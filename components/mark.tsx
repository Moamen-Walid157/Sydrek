export function Mark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/images/mark.png"
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`rounded-[10px] object-cover ring-1 ring-white/10 ${className}`}
    />
  );
}
