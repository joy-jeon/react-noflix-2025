import { useQuery } from "@tanstack/react-query";
import { getComingSoon } from "../api";

function ComingSoon() {
  const { data, isLoading } = useQuery(["coming-soon"], getComingSoon);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Coming Soon</h1>
      <div>
        {data.results.map((movie) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
}

export default ComingSoon;
