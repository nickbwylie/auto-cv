export interface Coordinate {
  lat: number
  lon: number
}

export interface MediaPoint extends Coordinate {
  // Additional data for the media point
  [key: string]: unknown
}

/**
 * Calculate distance between two coordinates using the Haversine formula.
 * The return value is the distance in meters.
 */
export function haversineDistance(a: Coordinate, b: Coordinate): number {
  const toRad = (value: number) => (value * Math.PI) / 180

  const R = 6371e3 // metres
  const φ1 = toRad(a.lat)
  const φ2 = toRad(b.lat)
  const Δφ = toRad(b.lat - a.lat)
  const Δλ = toRad(b.lon - a.lon)

  const sinΔφ = Math.sin(Δφ / 2)
  const sinΔλ = Math.sin(Δλ / 2)

  const c =
    2 *
    Math.atan2(
      Math.sqrt(sinΔφ * sinΔφ + Math.cos(φ1) * Math.cos(φ2) * sinΔλ * sinΔλ),
      Math.sqrt(1 - sinΔφ * sinΔφ - Math.cos(φ1) * Math.cos(φ2) * sinΔλ * sinΔλ)
    )

  return R * c
}

/**
 * Returns the media point from `points` that is closest to the provided coordinate.
 * If `points` is empty, `undefined` is returned.
 */
export function findNearestMediaPoint(
  current: Coordinate,
  points: MediaPoint[]
): MediaPoint | undefined {
  let nearest: MediaPoint | undefined
  let minDistance = Number.POSITIVE_INFINITY

  for (const point of points) {
    const dist = haversineDistance(current, point)
    if (dist < minDistance) {
      minDistance = dist
      nearest = point
    }
  }

  return nearest
}
