import { useQuery } from "@tanstack/react-query";
import { getComingSoon } from "../api";
import Layout from "../Components/Layout";

function ComingSoon() {
  const { data, isLoading } = useQuery(["coming-soon"], getComingSoon);
  if (isLoading) return <div>Loading...</div>;
  return <Layout data={data} basePath="/coming-soon" title="Coming Soon" />;
}
export default ComingSoon;
