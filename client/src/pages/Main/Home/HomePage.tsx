/* eslint-disable react-hooks/exhaustive-deps */
import { HomePageContainer } from './styled-components/home-page';
import { animated, useSpring } from '@react-spring/web';

export default function HomePage() {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <HomePageContainer>
      <header>
        <animated.h1 style={props}>Empieza a comparar precios con Pain Day Play</animated.h1>
      </header>
    </HomePageContainer>
  );
}
