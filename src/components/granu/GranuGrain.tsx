interface Props {
  className?: string
  zoom?: number
  fast?: boolean
}

export function GranuGrain({ className = '', zoom = 1.45, fast = false }: Props) {
  const src = `/granu/granu-3d.html?embed=1&zoom=${zoom}${fast ? '&fast=1' : ''}`
  return (
    <iframe
      src={src}
      title="A Granu"
      className={`border-0 bg-transparent pointer-events-none ${className}`}
    />
  )
}
