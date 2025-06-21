import React from "react";
import type { Trail } from "../types/trail";
import { useTrailNavigation } from "../hooks/useTrailNavigation";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  MapPin,
  Mountain,
} from "lucide-react";

interface TrailViewerProps {
  trail: Trail;
}

export const TrailViewer: React.FC<TrailViewerProps> = ({ trail }) => {
  const {
    state,
    currentPoint,
    goToPoint,
    nextPoint,
    previousPoint,
    togglePlayback,
    setPlaybackSpeed,
    progress,
  } = useTrailNavigation(trail);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Trail Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{trail.name}</h1>
        <p className="text-gray-600 mb-4">{trail.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Mountain className="w-4 h-4" />
            {trail.difficulty.charAt(0).toUpperCase() +
              trail.difficulty.slice(1)}
          </span>
          <span>{trail.length} miles</span>
          <span>{trail.elevationGain}ft elevation gain</span>
          <span>{trail.estimatedTime}</span>
        </div>
      </div>

      {/* Main Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image/360 View Area */}
        <div className="lg:col-span-2">
          <div
            className="relative bg-gray-100 rounded-lg overflow-hidden"
            style={{ height: "400px" }}
          >
            {currentPoint?.imageUrl ? (
              <img
                src={currentPoint.imageUrl}
                alt={`Trail view at point ${state.currentPointIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Mountain className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Trail view placeholder</p>
                  <p className="text-sm">
                    Point {state.currentPointIndex + 1} of {trail.points.length}
                  </p>
                </div>
              </div>
            )}

            {/* Progress indicator */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
              <div className="flex justify-between items-center text-sm">
                <span>
                  Point {state.currentPointIndex + 1} of {trail.points.length}
                </span>
                <span>
                  {currentPoint?.distanceFromStart.toFixed(1)} miles from start
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={previousPoint}
              disabled={state.currentPointIndex === 0}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlayback}
              className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white"
            >
              {state.isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={nextPoint}
              disabled={state.currentPointIndex === trail.points.length - 1}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-sm text-gray-600">Speed:</span>
            {[0.5, 1, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-3 py-1 text-sm rounded ${
                  state.playbackSpeed === speed
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Trail Info Panel */}
        <div className="space-y-4">
          {/* Current Point Info */}
          {currentPoint && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Current Location
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Elevation:</strong>{" "}
                  {currentPoint.elevation.toLocaleString()}ft
                </p>
                <p>
                  <strong>Distance:</strong>{" "}
                  {currentPoint.distanceFromStart.toFixed(1)} miles
                </p>
                {currentPoint.description && (
                  <p>
                    <strong>Notes:</strong> {currentPoint.description}
                  </p>
                )}
                {currentPoint.landmarks &&
                  currentPoint.landmarks.length > 0 && (
                    <div>
                      <strong>Landmarks:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {currentPoint.landmarks.map((landmark, idx) => (
                          <li key={idx}>{landmark}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Trail Points List */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Trail Points</h3>
            <div className="max-h-64 overflow-y-auto space-y-1">
              {trail.points.map((point, index) => (
                <button
                  key={point.id}
                  onClick={() => goToPoint(index)}
                  className={`w-full text-left p-2 text-sm rounded transition-colors ${
                    index === state.currentPointIndex
                      ? "bg-green-100 border-l-4 border-green-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>Point {index + 1}</span>
                    <span className="text-gray-500">
                      {point.distanceFromStart.toFixed(1)}mi
                    </span>
                  </div>
                  {point.description && (
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      {point.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
