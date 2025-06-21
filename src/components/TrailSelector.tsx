// src/components/TrailSelector.tsx
import React from "react";
import type { Trail } from "../types/trail";
import { Mountain, Clock, TrendingUp, MapPin } from "lucide-react";

interface TrailSelectorProps {
  trails: Trail[];
  selectedTrail: Trail | null;
  onSelectTrail: (trail: Trail) => void;
}

export const TrailSelector: React.FC<TrailSelectorProps> = ({
  trails,
  selectedTrail,
  onSelectTrail,
}) => {
  const getDifficultyColor = (difficulty: Trail["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "moderate":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-orange-600 bg-orange-100";
      case "expert":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Virtual Trail Explorer
        </h1>
        <p className="text-xl text-gray-600">
          Experience trails from anywhere - choose a trail to begin your virtual
          hike
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trails.map((trail) => (
          <div
            key={trail.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
              selectedTrail?.id === trail.id ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => onSelectTrail(trail)}
          >
            {/* Trail Image Placeholder */}
            {trail.previewImage ? (
              <img
                src={trail.previewImage}
                alt={trail.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <Mountain className="w-16 h-16 text-white opacity-80" />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {trail.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                    trail.difficulty
                  )}`}
                >
                  {trail.difficulty.charAt(0).toUpperCase() +
                    trail.difficulty.slice(1)}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {trail.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{trail.location}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Mountain className="w-4 h-4 mr-1" />
                  <span>{trail.length} miles</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{trail.elevationGain}ft gain</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{trail.estimatedTime}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-1">
                  {trail.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {trail.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{trail.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">
                  {trail.points.length} viewpoints along the trail
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
