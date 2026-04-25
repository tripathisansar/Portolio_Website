type Props = {
  className?: string
}

export function FrameMarkers({ className = '' }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-frost-300/40" />
      <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-frost-300/40" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-frost-300/40" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-frost-300/40" />
    </div>
  )
}
