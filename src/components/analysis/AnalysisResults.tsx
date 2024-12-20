import React from 'react';
import { Activity, Brain, LineChart } from 'lucide-react';
import { Card } from '../ui/Card';
import { AnalysisInsights } from '../../utils/analysis/insightsGenerator';
import { AudioFeatures } from '../../utils/analysis/featureExtraction';
import { AudioMetrics } from '../../types/audio';

interface AnalysisResultsProps {
  features: AudioFeatures;
  metrics: AudioMetrics;
  insights: AnalysisInsights;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  features,
  metrics,
  insights
}) => (
  <div className="space-y-6">
    {/* Overall Score */}
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Analysis Score
        </h3>
        <span className="text-2xl font-bold text-white">
          {insights.overallScore}%
        </span>
      </div>
      <p className="text-white/70">{insights.summary}</p>
    </Card>

    {/* Key Features */}
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Audio Features</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-white/70">RMS Level</span>
          <p className="text-xl font-semibold text-white">{features.rms.toFixed(2)}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-white/70">Pitch</span>
          <p className="text-xl font-semibold text-white">{Math.round(features.pitch)} Hz</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-white/70">Spectral Centroid</span>
          <p className="text-xl font-semibold text-white">
            {Math.round(features.spectralCentroid)} Hz
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-white/70">Silence</span>
          <p className="text-xl font-semibold text-white">
            {features.silencePercentage.toFixed(1)}%
          </p>
        </div>
      </div>
    </Card>

    {/* Recommendations */}
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Recommendations</h3>
      </div>
      <div className="space-y-2">
        {insights.recommendations.map((recommendation, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-3">
            <p className="text-white">{recommendation}</p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);