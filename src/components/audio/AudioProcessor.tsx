import React, { useEffect } from 'react';
import { useDebounceCallback } from '../../hooks/useDebounceCallback';
import { useThrottleCallback } from '../../hooks/useThrottleCallback';
import { useAudioWorker } from '../../hooks/useAudioWorker';
import { AudioData } from '../../types/audio';

interface AudioProcessorProps {
  audioData: AudioData | null;
  onAnalysisComplete: (results: any) => void;
}

export const AudioProcessor: React.FC<AudioProcessorProps> = ({
  audioData,
  onAnalysisComplete
}) => {
  const { processAudio } = useAudioWorker();

  // Debounce feature analysis (less time-critical)
  const debouncedFeatureAnalysis = useDebounceCallback(async (data: AudioData) => {
    const features = await processAudio(data, 'ANALYZE_FEATURES');
    return features;
  }, 500);

  // Throttle beat detection (needs to be responsive but not overwhelming)
  const throttledBeatDetection = useThrottleCallback(async (data: AudioData) => {
    const beats = await processAudio(data, 'DETECT_BEATS');
    return beats;
  }, 100);

  // Throttle spectrum analysis (visual feedback needs to be smooth)
  const throttledSpectrumAnalysis = useThrottleCallback(async (data: AudioData) => {
    const spectrum = await processAudio(data, 'ANALYZE_SPECTRUM');
    return spectrum;
  }, 50);

  useEffect(() => {
    if (!audioData) return;

    const processAllAnalyses = async () => {
      try {
        const [features, beats, spectrum] = await Promise.all([
          debouncedFeatureAnalysis(audioData),
          throttledBeatDetection(audioData),
          throttledSpectrumAnalysis(audioData)
        ]);

        onAnalysisComplete({ features, beats, spectrum });
      } catch (error) {
        console.error('Analysis failed:', error);
      }
    };

    processAllAnalyses();
  }, [audioData, debouncedFeatureAnalysis, throttledBeatDetection, throttledSpectrumAnalysis, onAnalysisComplete]);

  return null; // This is a logic-only component
};