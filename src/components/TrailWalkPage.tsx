import { useState } from "react";
import TrailMap from "./TrailMap";
import "./TrailWalkPage.css"; // for optional styling
import img0 from "../assets/0.jpg";
import img1 from "../assets/1.jpg";

const sampleTrail = [
  [37.7749, -122.4194],
  [37.7758, -122.4182],
  [37.7766, -122.417],
  [37.7774, -122.416],
  [37.778, -122.415],
];

const sampleMedia = [img0, img0, img1, img1, img1];

export default function TrailWalkPage() {
  const [progress, setProgress] = useState(0);
  const hikerPosition = sampleTrail[progress];

  return (
    <div className="trail-container">
      {/* Map Left */}
      <div className="trail-map">
        <TrailMap trail={sampleTrail} hikerPosition={hikerPosition} />
        <input
          type="range"
          min={0}
          max={sampleTrail.length - 1}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{ width: "100%", marginTop: "1rem" }}
        />
      </div>

      {/* Media Right */}
      <div className="trail-media">
        <img
          src={sampleMedia[progress]}
          alt={`Trail view ${progress}`}
          style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
        />
      </div>
    </div>
  );
}
