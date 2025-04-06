import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import { makeImagePath } from "../api";

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 40px 0 30px;
  color: white;
  font-size: 22px;
`;

const Cards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: fit-content;
  gap: 14px;
  margin: 0 auto;
  cursor: pointer;
`;

const Card = styled(motion.div)`
  position: relative;
  aspect-ratio: 2/3;
  max-height: 300px;
  background-size: cover;
  background-position: center;
  background-image: ${({ $bg }) =>
    `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${$bg})`};
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  transform-origin: center;

  strong {
    padding: 10px 8px;
    font-size: 14px;
    color: white;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  max-height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: black;
  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: white;
  padding: 20px;
  font-size: 36px;
`;

const BigOverview = styled.p`
  padding: 20px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const Badge = styled.div`
  display: flex;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  gap: 6px;
  justify-content: space-between;
  margin-block-end: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 20px;
  &:last-child {
    margin-bottom: 20px;
  }
  span {
    font-weight: 700;
  }
`;

const Close = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  color: white;
  padding: 0;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const cardVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

function Layout({ data, basePath, title }) {
  const navigate = useNavigate();
  const match = useMatch(`${basePath}/:movieId`);
  const { scrollY } = useScroll();
  const onCardClick = (movieId) => navigate(`${basePath}/${movieId}`);
  const onOverlayClick = () => navigate(basePath);

  const clickedMovie =
    match?.params.movieId &&
    data?.results.find((m) => String(m.id) === match.params.movieId);

  return (
    <>
      <Title>{title}</Title>
      <Cards>
        {data.results.map((movie) => (
          <Card
            key={movie.id}
            $bg={makeImagePath(movie.backdrop_path)}
            variants={cardVariants}
            initial="normal"
            whileHover="hover"
            onClick={() => onCardClick(movie.id)}
            layoutId={movie.id + ""}
          >
            <strong>{movie.title}</strong>
          </Card>
        ))}
      </Cards>

      <AnimatePresence>
        {match && clickedMovie && (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={match.params.movieId}
            >
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    clickedMovie.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
              <BigTitle>{clickedMovie.title}</BigTitle>
              <BigOverview>{clickedMovie.overview}</BigOverview>
              <Badge>
                average <span>{clickedMovie.vote_average}</span>
              </Badge>
              <Badge>
                release_date <span>{clickedMovie.release_date}</span>
              </Badge>
              <Badge>
                popularity <span>{clickedMovie.popularity}</span>
              </Badge>
              <Close onClick={onOverlayClick}>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                  />
                </svg>
              </Close>
            </BigMovie>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Layout;
