export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const max =
    width === "wide"
      ? "max-w-6xl"
      : width === "narrow"
        ? "max-w-3xl"
        : "max-w-5xl";

  return (
    <div className={`mx-auto w-full ${max} px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
