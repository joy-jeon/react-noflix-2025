import { useQuery } from "@tanstack/react-query";
import { getComingSoon } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../api";

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 40px 0 30px;
  color: white;
  font-size: 22px;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: fit-content;
  gap: 10px;
  margin: 0 auto;
`;
const Card = styled(motion.div)`
  position: relative;
  aspect-ratio: 2/3;
  max-height: 300px;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bg});
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;

  strong {
    padding: 10px 8px;
    font-size: 14px;
    color: white;
  }
`;

function ComingSoon() {
  const { data, isLoading } = useQuery(["coming-soon"], getComingSoon);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Title>Coming Soon</Title>
      <Cards>
        {data.results.map((movie) => (
          <Card key={movie.id} $bg={makeImagePath(movie.backdrop_path)}>
            <strong>{movie.title}</strong>
          </Card>
        ))}
      </Cards>
    </div>
  );
}

export default ComingSoon;
