import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';

interface CrowdSentimentIndicatorProps {
  sentiment: number; // 0-100
  trend: 'rising' | 'falling' | 'stable';
}

export const CrowdSentimentIndicator: React.FC<CrowdSentimentIndicatorProps> = ({
  sentiment,
  trend
}) => {
  const getEmoji = () => {
    if (sentiment >= 70) return Smile;
    if (sentiment >= 40) return Meh;
    return Frown;
  };

  const getColor = () => {
    if (sentiment >= 70) return 'bg-green-500';
    if (sentiment >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const Icon = getEmoji();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Crowd Sentiment</h3>
        <span className="text-2xl font-bold text-white">{sentiment}%</span>
      </div>

      <div className="relative">
        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
          <motion.div
            className={`h-2 rounded-full ${getColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${sentiment}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: trend === 'rising' ? [0, 5, 0] : trend === 'falling' ? [0, -5, 0] : 0
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={`w-12 h-12 ${
              sentiment >= 70 ? 'text-green-400' :
              sentiment >= 40 ? 'text-yellow-400' : 'text-red-400'
            }`} />
          </motion.div>
        </div>
      </div>
    </Card>
  );
};