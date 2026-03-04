"use client";

import { useState } from "react";
import { Video } from "@/data/videos";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import styles from "./VideoGrid.module.css";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const horizontalVideos = videos.filter((v) => v.orientation === "horizontal");
  const verticalVideos = videos.filter((v) => v.orientation === "vertical");

  return (
    <>
      <section id="work" className={styles.section}>
        <h2 className={styles.sectionTitle}>WORK</h2>
        <div className={styles.grid}>
          {horizontalVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>SHORTS</h2>
        <div className={styles.shortsGrid}>
          {verticalVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      </section>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
