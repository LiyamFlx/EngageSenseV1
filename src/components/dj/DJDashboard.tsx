import React, { useState, useCallback } from 'react';
import { AudioControlPanel } from '../audio/AudioControlPanel';
import { VisualizationPanel } from '../visualizations/VisualizationPanel';
import { TrackRecommendationPanel } from '../recommendations/TrackRecommendationPanel';
import { CrowdSentimentIndicator } from '../engagement/CrowdSentimentIndicator';
import { EngagementHeatmap } from '../engagement/EngagementHeatmap';
import { AnalysisResults } from '../analysis/AnalysisResults';
import { AnalysisProgress } from '../analysis/AnalysisProgress';
import { useAudioProcessor } from '../../hooks/useAudioProcessor';
import { useEngagementVisualization } from '../../hooks/useEngagementVisualization';
import { useTrackRecommendations } from '../../hooks/useTrackRecommendations';
import { useRecordingAnalysis } from '../../hooks/useRecordingAnalysis';
import { Card } from '../ui/Card';

export const DJDashboard: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const {
    audioData,
    isRecording,
    startRecording,
    stopRecording,
    error
  } = useAudioProcessor({
    sensitivity: 50,
    noiseThreshold: 30,
    updateInterval: 100
  });

  const { sentiment, trend, history } = useEngagementVisualization(audioData?.metrics ?? null);
  const recommendations = useTrackRecommendations(audioData?.metrics ?? null, history);
  const { state: analysisState, results: analysisResults, analyzeRecording } = useRecordingAnalysis();

  const handleStartRecording = useCallback(async () => {
    setIsAnalyzing(true);
    await startRecording();
    setIsAnalyzing(false);
  }, [startRecording]);

  const handleStopRecording = useCallback(async () => {
    await stopRecording();
    if (audioData) {
      await analyzeRecording(audioData);
    }
  }, [stopRecording, audioData, analyzeRecording]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {error ? (
        <Card className="p-4 bg-red-500/20">
          <p className="text-white">{error.message}</p>
        </Card>
      ) : (
        <>
          <AudioControlPanel
            isRecording={isRecording}
            isAnalyzing={isAnalyzing}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <VisualizationPanel
                audioData={audioData}
                isRecording={isRecording}
              />
              
              {analysisState.isAnalyzing ? (
                <AnalysisProgress progress={analysisState.progress} />
              ) : analysisResults && (
                <AnalysisResults
                  features={analysisResults.features}
                  metrics={analysisResults.metrics}
                  insights={analysisResults.insights}
                />
              )}

              <EngagementHeatmap history={history} />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              <CrowdSentimentIndicator
                sentiment={sentiment}
                trend={trend}
              />

              <TrackRecommendationPanel
                recommendations={recommendations}
                onSelectTrack={(track) => console.log('Selected track:', track)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};