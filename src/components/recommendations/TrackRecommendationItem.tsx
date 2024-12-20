import React from 'react';
import { Play, Pause, TrendingUp } from 'lucide-react';
import { TrackRecommendation } from '../../types/audience';

interface TrackRecommendationItemProps {
  track: TrackRecommendation;
  isPlaying: boolean;
  onPlay: () => void;
}

export const TrackRecommendationItem: React.FC<TrackRecommendationItemProps> = ({
  track,
  isPlaying,
  onPlay
}) => (
  <button
    onClick={onPlay}
    className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors text-left"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <button 
            className={`p-2 rounded-full ${
              isPlaying ? 'bg-purple-500/20' : 'bg-white/10'
            } hover:bg-white/20 transition-colors`}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-purple-400" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </button>
          <div>
            <h4 className="font-medium text-white">{track.title}</h4>
            <p className="text-sm text-white/70">{track.artist}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-white/70">{track.bpm} BPM</div>
        <div className="flex items-center gap-1 text-xs text-green-400">
          <TrendingUp className="w-3 h-3" />
          {Math.round(track.confidence * 100)}% match
        </div>
      </div>
    </div>
    <p className="text-xs text-white/50 mt-2">{track.reason}</p>
  </button>
);