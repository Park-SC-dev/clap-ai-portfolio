"use client";

import { useRef, useEffect, useState } from "react";
import { Video } from "@/data/videos";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
  video: Video;
  index: number;
  onClick: () => void;
}

function getPreviewUrl(video: Video): string {
  if (video.type === "youtube") {
    return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${video.videoId}&modestbranding=1&playsinline=1`;
  }
  return `https://player.vimeo.com/video/${video.videoId}?autoplay=1&muted=1&loop=1&background=1`;
}

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAppeared, setHasAppeared] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasAppeared(true);
        }
      },
      { rootMargin: "200px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isVertical = video.orientation === "vertical";
  const thumbnail = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${hasAppeared ? styles.visible : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <div
        className={styles.videoWrapper}
        style={{ paddingTop: isVertical ? "177.78%" : "56.25%" }}
      >
        {hasAppeared && (
          <>
            <img src={thumbnail} alt="" className={styles.thumbnail} />
            {inView && (
              <iframe
                src={getPreviewUrl(video)}
                className={styles.iframe}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                title={video.videoId}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
