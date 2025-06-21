import { useState, useCallback, useEffect } from "react";
import type { Trail, TrailState } from "../types/trail";

export const useTrailNavigation = (trail: Trail | null) => {
  const [state, setState] = useState<TrailState>({
    currentPointIndex: 0,
    isPlaying: false,
    playbackSpeed: 1,
  });

  const goToPoint = useCallback(
    (index: number) => {
      if (!trail || index < 0 || index >= trail.points.length) return;
      setState((prev) => ({ ...prev, currentPointIndex: index }));
    },
    [trail]
  );

  const nextPoint = useCallback(() => {
    if (!trail) return;
    setState((prev) => ({
      ...prev,
      currentPointIndex: Math.min(
        prev.currentPointIndex + 1,
        trail.points.length - 1
      ),
    }));
  }, [trail]);

  const previousPoint = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPointIndex: Math.max(prev.currentPointIndex - 1, 0),
    }));
  }, []);

  const togglePlayback = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setPlaybackSpeed = useCallback((speed: number) => {
    setState((prev) => ({ ...prev, playbackSpeed: speed }));
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (!state.isPlaying || !trail) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.currentPointIndex >= trail.points.length - 1) {
          return { ...prev, isPlaying: false };
        }
        return { ...prev, currentPointIndex: prev.currentPointIndex + 1 };
      });
    }, 2000 / state.playbackSpeed);

    return () => clearInterval(interval);
  }, [state.isPlaying, state.playbackSpeed, trail]);

  return {
    state,
    currentPoint: trail?.points[state.currentPointIndex] || null,
    goToPoint,
    nextPoint,
    previousPoint,
    togglePlayback,
    setPlaybackSpeed,
    progress: trail
      ? (state.currentPointIndex / (trail.points.length - 1)) * 100
      : 0,
  };
};
export default useTrailNavigation;
