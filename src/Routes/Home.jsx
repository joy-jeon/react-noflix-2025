import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../api";

function Home() {
  const { data, isLoading } = useQuery(["popular"], getPopular);
  console.log(data);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.results.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
export default Home;
