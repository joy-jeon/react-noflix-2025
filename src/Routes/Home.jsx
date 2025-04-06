import { useQuery } from "@tanstack/react-query";
import { getPopular } from "../api";
import Layout from "../Components/Layout";

function Home() {
  const { data, isLoading } = useQuery(["popular"], getPopular);
  if (isLoading) return <div>Loading...</div>;
  return <Layout data={data} basePath="" title="Popular" />;
}
export default Home;
