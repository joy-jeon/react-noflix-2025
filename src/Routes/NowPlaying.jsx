import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api";
import Layout from "../Components/Layout";

function NowPlaying() {
  const { data, isLoading } = useQuery(["now-playing"], getNowPlaying);
  if (isLoading) return <div>Loading...</div>;
  return <Layout data={data} basePath="/now-playing" title="Now Playing" />;
}
export default NowPlaying;
