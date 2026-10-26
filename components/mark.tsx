export function Mark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/icon-512.png"
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
