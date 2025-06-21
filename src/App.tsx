// src/App.tsx
import React, { useState } from "react";
import type { Trail } from "./types/trail";
import { TrailSelector } from "./components/TrailSelector";
import { TrailViewer } from "./components/TrailViewer";
import { mockTrails } from "./data/mockTrails";
import { ArrowLeft } from "lucide-react";

function App() {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  const handleSelectTrail = (trail: Trail) => {
    setSelectedTrail(trail);
  };

  const handleBackToSelection = () => {
    setSelectedTrail(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedTrail ? (
        <div>
          {/* Back button */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <button
                onClick={handleBackToSelection}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to trail selection
              </button>
            </div>
          </div>

          {/* Trail viewer */}
          <div className="py-6">
            <TrailViewer trail={selectedTrail} />
          </div>
        </div>
      ) : (
        <TrailSelector
          trails={mockTrails}
          selectedTrail={selectedTrail}
          onSelectTrail={handleSelectTrail}
        />
      )}
    </div>
  );
}

export default App;
