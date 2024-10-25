import { YouTubeEmbed } from "@next/third-parties/google";

const YouTubeVideo = ({ videoId }) => {
  return <YouTubeEmbed videoid={videoId} height={537} width={302} />;
};

export default YouTubeVideo;
