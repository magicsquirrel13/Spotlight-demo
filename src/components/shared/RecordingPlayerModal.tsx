import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, Volume2, Sparkles } from 'lucide-react';
interface RecordingPlayerModalProps {
  url: string;
  leadName: string;
  model?: string;
  onClose: () => void;
}
function formatTime(sec: number): string {
  if (!isFinite(sec) || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
export function RecordingPlayerModal({
  url,
  leadName,
  model,
  onClose
}: RecordingPlayerModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  // Auto-play on open
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoaded = () => {
      setDuration(audio.duration);
      setIsReady(true);
      audio.
      play().
      then(() => setIsPlaying(true)).
      catch(() => setIsPlaying(false));
    };
    const handleTime = () => setCurrentTime(audio.currentTime);
    const handleEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('ended', handleEnd);
      audio.pause();
    };
  }, [url]);
  // Close on Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(duration)) return;
    const next = parseFloat(e.target.value);
    audio.currentTime = next;
    setCurrentTime(next);
  };
  const pct = duration > 0 ? currentTime / duration * 100 : 0;
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}>
        
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[520px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                <Sparkles size={16} className="text-blue-500 fill-blue-500" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Voice Agent Recording
                </div>
                <div className="text-xs text-gray-500">
                  {leadName}
                  {model ? ` · ${model}` : ''}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              aria-label="Close">
              
              <X size={18} />
            </button>
          </div>

          {/* Player */}
          <div className="px-6 py-6">
            <audio ref={audioRef} src={url} preload="metadata" />

            {/* Waveform-like decorative bars */}
            <div className="flex items-end justify-center gap-1 h-16 mb-5">
              {Array.from({
                length: 48
              }).map((_, i) => {
                const seed = (Math.sin(i * 1.7) + 1) / 2;
                const h = 20 + seed * 36;
                const isPast = i / 48 * 100 <= pct;
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-colors ${isPast ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{
                      height: `${h}px`
                    }} />);


              })}
            </div>

            {/* Seek bar */}
            <div className="flex flex-col gap-2">
              <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                  style={{
                    width: `${pct}%`
                  }} />
                
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={!isReady}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
                  aria-label="Seek" />
                
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{isReady ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={togglePlay}
                disabled={!isReady}
                className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white flex items-center justify-center transition-colors shadow-lg shadow-blue-500/30"
                aria-label={isPlaying ? 'Pause' : 'Play'}>
                
                {isPlaying ?
                <Pause size={22} fill="white" /> :

                <Play size={22} fill="white" className="translate-x-0.5" />
                }
              </button>
            </div>

            {/* Helper text */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
              <Volume2 size={12} />
              <span>
                {isReady ?
                'Drag the bar to seek through the conversation' :
                'Loading recording…'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>);

}