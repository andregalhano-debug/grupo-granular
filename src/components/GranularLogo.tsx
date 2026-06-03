interface GranularLogoProps {
  size?: number
  className?: string
  color?: string
}

export function GranularLogo({ size = 40, className = '', color = 'currentColor' }: GranularLogoProps) {
  const rows = 8
  const cols = 8
  const dotSize = size / 12
  const gap = size / 9

  // Deterministic wine accent positions (bottom-right area)
  const winePositions = new Set(['5-6', '5-7', '6-5', '6-6', '6-7', '7-4', '7-5', '7-6', '7-7'])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label="Granular logo"
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const x = col * gap + gap / 2
          const y = row * gap + gap / 2
          const distFromTopLeft = Math.sqrt(row * row + col * col)
          const maxDist = Math.sqrt((rows - 1) ** 2 + (cols - 1) ** 2)
          const normalizedDist = distFromTopLeft / maxDist
          const radius = dotSize * (1 - normalizedDist * 0.7)
          const opacity = 1 - normalizedDist * 0.5

          const isWine = winePositions.has(`${row}-${col}`)
          const fill = isWine ? '#A31631' : color

          if (radius < 0.3) return null

          return (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r={radius}
              fill={fill}
              opacity={opacity}
            />
          )
        })
      )}
    </svg>
  )
}
