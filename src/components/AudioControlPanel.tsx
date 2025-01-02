interface AudioControlPanelProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  isAutoDJMode: boolean; // Add this line
  onStartRecording: () => void;
  onStopRecording: () => void;
  onAnalyzeAudio: () => void;
  onSearchTrack: () => void;
  onToggleAutoDJ: () => void;
  onEnergyVote: (type: "up" | "down") => void;
}