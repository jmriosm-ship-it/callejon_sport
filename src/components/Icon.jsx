export default function Icon({ name }) {
  const p = {
    width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round',
    strokeLinejoin: 'round', 'aria-hidden': true,
  }
  if (name === 'ig')
    return (
      <svg {...p}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
      </svg>
    )
  if (name === 'wa')
    return (
      <svg {...p}>
        <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z" />
        <path d="M9 9.5c.3 2.4 2.6 4.6 5.5 5.5l1.2-1.3-2-1-.9.7c-.8-.4-1.6-1.2-2-2l.7-.9-1-2L9 9.5z" />
      </svg>
    )
  if (name === 'bag')
    return (
      <svg {...p}>
        <path d="M5 8h14l-1 12H6L5 8z" />
        <path d="M9 8V7a3 3 0 0 1 6 0v1" />
      </svg>
    )
  return (
    <svg {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}
