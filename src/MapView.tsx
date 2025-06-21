import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useEffect, useState } from 'react'
import type { FeatureCollection } from 'geojson'
import 'leaflet/dist/leaflet.css'

export default function MapView() {
  const [data, setData] = useState<FeatureCollection | null>(null)

  useEffect(() => {
    fetch('/route.geojson')
      .then((res) => res.json())
      .then((geojson: FeatureCollection) => {
        setData(geojson)
      })
      .catch((err) => {
        console.error('Failed to load GeoJSON', err)
      })
  }, [])

  return (
    <MapContainer center={[37.832, -122.483]} zoom={15} className="h-screen w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && <GeoJSON data={data} />}
    </MapContainer>
  )
}
