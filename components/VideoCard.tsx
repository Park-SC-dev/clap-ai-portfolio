"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Video } from "@/data/videos";
import styles from "./VideoCard.module.css";

interface VideoCardProps {
  video: Video;
  index: number;
  onClick: () => void;
}

function getPreviewUrl(video: Video): string {
  return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${video.videoId}&modestbranding=1&playsinline=1`;
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
            <Image
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt=""
              fill
              sizes={isVertical ? "(max-width: 768px) 33vw, 200px" : "(max-width: 768px) 100vw, 50vw"}
              className={styles.thumbnail}
            />
            {video.autoplay && inView ? (
              <iframe
                src={getPreviewUrl(video)}
                className={styles.iframe}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                title={video.videoId}
              />
            ) : (
              <div className={styles.playOverlay}>
                <svg className={styles.playIcon} viewBox="0 0 68 48">
                  <path
                    d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                    fill="rgba(255,255,255,0.8)"
                  />
                  <path d="M45 24L27 14v20" fill="#000" />
                </svg>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
