import React, { useState, useRef, useEffect } from 'react';
import { X, Download, ExternalLink, Play, Pause } from 'lucide-react';
import type { VideoAsset } from '../../types';

interface VideoPlayerModalProps {
  video: VideoAsset | null;
  onClose: () => void;
  onPushToShopify: (videoId: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onPushToShopify
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
  }, [video]);

  if (!video) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setProgress((cur / dur) * 100);

      const mins = Math.floor(cur / 60);
      const secs = Math.floor(cur % 60);
      setCurrentTimeStr(`${mins}:${secs.toString().padStart(2, '0')}`);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
      setProgress(newProgress);
    }
  };

  return (
    <div className="modal-overlay video-player-overlay" onClick={onClose}>
      <div 
        className="modal-container video-player-modal-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ overflow: 'hidden', paddingRight: '12px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {video.productTitle}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--xora-text-secondary)' }}>
              {video.sku ? `${video.sku} • ` : ''}Angle: {video.angleName} ({video.duration})
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close Video Player">
            <X size={18} />
          </button>
        </div>

        {/* Restrained 9:16 Video Player Container */}
        <div className="video-player-frame" style={{ position: 'relative', backgroundColor: '#000', width: '100%', height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <video 
            ref={videoRef}
            src={video.videoUrl} 
            autoPlay 
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            style={{ width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer' }} 
          />

          {/* Overlay Custom Controls Bar */}
          <div className="video-controls-overlay" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <button 
              onClick={togglePlay}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
            </button>

            {/* Custom Timeline Slider */}
            <input 
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              style={{ flex: 1, accentColor: 'var(--xora-primary)', cursor: 'pointer' }}
            />

            {/* Duration Counter */}
            <span style={{ color: 'white', fontSize: '11px', fontWeight: 600, minWidth: '60px', textAlign: 'right' }}>
              {currentTimeStr} / {video.duration}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--xora-text-muted)' }}>
            {video.resolution}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                const link = document.createElement('a');
                link.href = video.videoUrl;
                link.download = `${video.productTitle.replace(/\s+/g, '_')}_${video.id}.mp4`;
                link.click();
              }}
            >
              <Download size={13} /> Save MP4
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => {
                onPushToShopify(video.id);
                onClose();
              }}
              disabled={video.status === 'pushed_to_shopify'}
            >
              <ExternalLink size={13} />
              {video.status === 'pushed_to_shopify' ? 'Pushed to Shopify' : 'Push to Shopify'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
