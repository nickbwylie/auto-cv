export interface TrailPoint {
  id: string;
  latitude: number;
  longitude: number;
  elevation: number;
  distanceFromStart: number; // in miles or km
  imageUrl?: string;
  description?: string;
  landmarks?: string[];
}

export interface Trail {
  id: string;
  name: string;
  description: string;
  difficulty: "easy" | "moderate" | "hard" | "expert";
  length: number; // total distance
  elevationGain: number;
  estimatedTime: string;
  location: string;
  points: TrailPoint[];
  previewImage?: string;
  tags: string[];
}

export interface TrailState {
  currentPointIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
}
