import type { Video } from "@/data/videos";

interface NotionPage {
  id: string;
  properties: {
    url: { title: Array<{ plain_text: string }> };
    orientation: { select: { name: string } | null };
    "체크박스"?: { checkbox: boolean };
  };
}

function extractVideoId(input: string): string {
  const trimmed = input.trim();
  // 전체 링크인 경우
  const patterns = [
    /youtube\.com\/watch\?v=([^&\s]+)/,
    /youtube\.com\/shorts\/([^?\s]+)/,
    /youtu\.be\/([^?\s]+)/,
    /youtube\.com\/embed\/([^?\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  // ID만 넣은 경우 그대로 반환
  return trimmed;
}

export async function fetchVideos(): Promise<Video[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    const { default: videos } = await import("@/data/videos");
    return videos;
  }

  const res = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sorts: [{ property: "순서", direction: "ascending" }],
      }),
    }
  );

  if (!res.ok) {
    console.error("Notion API error:", await res.text());
    const { default: videos } = await import("@/data/videos");
    return videos;
  }

  const data = await res.json();

  return (data.results as NotionPage[]).map((page) => {
    const raw = page.properties.url?.title?.[0]?.plain_text ?? "";
    const videoId = extractVideoId(raw);
    const orientation: "horizontal" | "vertical" =
      page.properties.orientation?.select?.name === "vertical"
        ? "vertical"
        : "horizontal";
    const autoplay = page.properties["체크박스"]?.checkbox ?? false;

    return {
      id: page.id,
      type: "youtube" as const,
      videoId,
      orientation,
      autoplay,
    };
  });
}
