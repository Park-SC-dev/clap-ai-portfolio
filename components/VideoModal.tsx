"use client";

import { useEffect, useCallback } from "react";
import { Video } from "@/data/videos";
import styles from "./VideoModal.module.css";

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

function getYoutubeUrl(video: Video): string {
  if (video.orientation === "vertical") {
    return `https://www.youtube.com/shorts/${video.videoId}`;
  }
  return `https://www.youtube.com/watch?v=${video.videoId}`;
}

function getModalEmbedUrl(video: Video): string {
  if (video.type === "youtube") {
    return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  }
  return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const isVertical = video.orientation === "vertical";

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.content} ${isVertical ? styles.vertical : styles.horizontal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.videoWrapper}>
          <iframe
            src={getModalEmbedUrl(video)}
            className={styles.iframe}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title={video.videoId}
          />
        </div>
        <div className={styles.actions}>
          <a
            href={getYoutubeUrl(video)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.youtubeLink}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.ytIcon}>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube에서 보기
          </a>
          <button className={styles.closeBtn} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
