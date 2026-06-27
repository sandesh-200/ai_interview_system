interface ShimmerLoadingProps {
  text: string;
}

export function ShimmerLoading({ text }: ShimmerLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
}
