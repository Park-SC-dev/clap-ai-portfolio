import { fetchVideos } from "@/lib/notion";
import VideoGrid from "@/components/VideoGrid";
import Contact from "@/components/Contact";

export const revalidate = 3600;

export default async function Home() {
  const videos = await fetchVideos();

  return (
    <main>
      <VideoGrid videos={videos} />
      <Contact />
    </main>
  );
}
