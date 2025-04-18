import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Gnb = styled.header`
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: fit-content;
    margin: 0 auto;
    a {
      position: relative;
      flex: 1;
      white-space: nowrap;
      text-transform: uppercase;
      text-align: center;
      padding: 10px 6px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      transition: color 0.3s ease-in-out;
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
`;

const Circle = styled(motion.span)`
  display: flex;
  width: 4px;
  height: 4px;
  background-color: red;
  position: absolute;
  bottom: -10px;
  left: 50%;
  border-radius: 50%;
`;

function Header() {
  const popularMatch = useMatch("/");
  const comingSoonMatch = useMatch("/coming-soon");
  const nowPlayingMatch = useMatch("/now-playing");

  return (
    <Gnb>
      <nav>
        <Link to="/">
          Popular
          {popularMatch && (
            <AnimatePresence mode="wait">
              <Circle layoutId="navIndicator" />
            </AnimatePresence>
          )}
        </Link>
        <Link to="/coming-soon">
          Coming Soon
          {comingSoonMatch && (
            <AnimatePresence mode="wait">
              <Circle layoutId="navIndicator" />
            </AnimatePresence>
          )}
        </Link>
        <Link to="/now-playing">
          Now Playing
          {nowPlayingMatch && (
            <AnimatePresence mode="wait">
              <Circle layoutId="navIndicator" />
            </AnimatePresence>
          )}
        </Link>
      </nav>
    </Gnb>
  );
}
export default Header;
