export interface Video {
  id: string;
  type: "youtube" | "vimeo";
  videoId: string;
  orientation: "horizontal" | "vertical";
}

const videos: Video[] = [
  // 가로 영상
  { id: "h1", type: "youtube", videoId: "6hl8xQUy_4Y", orientation: "horizontal" },
  { id: "h2", type: "youtube", videoId: "bulwR9AzZWY", orientation: "horizontal" },
  { id: "h3", type: "youtube", videoId: "CyalT0OZFYI", orientation: "horizontal" },
  { id: "h4", type: "youtube", videoId: "eLT24tPGGCk", orientation: "horizontal" },
  { id: "h5", type: "youtube", videoId: "IFPheoYUYIA", orientation: "horizontal" },
  { id: "h6", type: "youtube", videoId: "yHlbrJqRPkE", orientation: "horizontal" },
  { id: "h7", type: "youtube", videoId: "Yp82e86kASA", orientation: "horizontal" },

  // 숏폼 영상
  { id: "v1", type: "youtube", videoId: "0PnKkXo_xV0", orientation: "vertical" },
  { id: "v2", type: "youtube", videoId: "3GD9gQIyAoE", orientation: "vertical" },
  { id: "v3", type: "youtube", videoId: "6Xu4Nlu1cN4", orientation: "vertical" },
  { id: "v4", type: "youtube", videoId: "7gZl5cvFGy0", orientation: "vertical" },
  { id: "v5", type: "youtube", videoId: "DZ201QMLcd8", orientation: "vertical" },
  { id: "v6", type: "youtube", videoId: "FDQeBkdkLUA", orientation: "vertical" },
  { id: "v7", type: "youtube", videoId: "gKBFemhyfRA", orientation: "vertical" },
  { id: "v8", type: "youtube", videoId: "irD6hBJXZCk", orientation: "vertical" },
  { id: "v9", type: "youtube", videoId: "J5cMHnR8aZ4", orientation: "vertical" },
  { id: "v10", type: "youtube", videoId: "kloyAEPVsmQ", orientation: "vertical" },
  { id: "v11", type: "youtube", videoId: "KMt6ViRXBI0", orientation: "vertical" },
  { id: "v12", type: "youtube", videoId: "P0dzS-XJ6os", orientation: "vertical" },
  { id: "v13", type: "youtube", videoId: "PD6P1rLz008", orientation: "vertical" },
  { id: "v14", type: "youtube", videoId: "PssWA1O6awo", orientation: "vertical" },
  { id: "v15", type: "youtube", videoId: "ue8EF-RYCS0", orientation: "vertical" },
  { id: "v16", type: "youtube", videoId: "VLFopp6gy-s", orientation: "vertical" },
];

export default videos;
