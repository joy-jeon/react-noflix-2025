import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api";

function NowPlaying() {
  const { data, isLoading } = useQuery(["now-playing"], getNowPlaying);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>NowPlaying</h1>
      <div>
        {data.results.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
}

export default NowPlaying;
