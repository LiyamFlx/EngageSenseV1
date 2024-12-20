import { AudioMetrics } from '../../types/audio';

export const drawHeatmap = (
  ctx: CanvasRenderingContext2D,
  history: AudioMetrics[],
  width: number,
  height: number
) => {
  const metrics = ['physical', 'emotional', 'mental', 'spiritual'] as const;
  const cellWidth = width / history.length;
  const cellHeight = height / metrics.length;

  ctx.clearRect(0, 0, width, height);

  // Draw heatmap cells
  history.forEach((data, timeIndex) => {
    metrics.forEach((metric, metricIndex) => {
      const value = data[metric];
      const x = timeIndex * cellWidth;
      const y = metricIndex * cellHeight;

      // Create gradient color based on value
      const hue = ((1 - value / 100) * 240).toString(10);
      ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.8)`;
      ctx.fillRect(x, y, cellWidth, cellHeight);

      // Add cell border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeRect(x, y, cellWidth, cellHeight);
    });
  });

  // Add labels
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '12px Inter';
  metrics.forEach((metric, i) => {
    const label = metric.charAt(0).toUpperCase() + metric.slice(1);
    ctx.fillText(label, 5, i * cellHeight + 20);
  });
};