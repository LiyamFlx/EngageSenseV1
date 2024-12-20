import React from 'react';
import { Music } from 'lucide-react';
import { Card } from '../ui/Card';
import { TrackRecommendationItem } from './TrackRecommendationItem';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import type { TrackRecommendation } from '../../types/audience';

interface TrackRecommendationPanelProps {
  recommendations: TrackRecommendation[];
  onSelectTrack: (track: TrackRecommendation) => void;
}

export const TrackRecommendationPanel: React.FC<TrackRecommendationPanelProps> = ({
  recommendations,
  onSelectTrack
}) => {
  const { play, currentTrackId, isPlaying } = useAudioPlayer();

  const handlePlay = (track: TrackRecommendation) => {
    if (track.previewUrl) {
      play(track.previewUrl, track.id);
      onSelectTrack(track);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Music className="w-5 h-5" />
          Recommended Tracks
        </h3>
      </div>

      <div className="space-y-3">
        {recommendations.slice(0, 5).map((track) => (
          <TrackRecommendationItem
            key={track.id}
            track={track}
            isPlaying={isPlaying && currentTrackId === track.id}
            onPlay={() => handlePlay(track)}
          />
        ))}
      </div>
    </Card>
  );
};