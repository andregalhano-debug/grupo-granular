interface Props {
  className?: string
  zoom?: number
}

export function GranuGrain({ className = '', zoom = 1.45 }: Props) {
  return (
    <iframe
      src={`/granu/granu-3d.html?embed=1&zoom=${zoom}`}
      title="A Granu"
      className={`border-0 bg-transparent pointer-events-none ${className}`}
    />
  )
}
