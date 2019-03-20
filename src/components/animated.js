import React from 'react';
import { useSpring, animated } from 'react-spring';

const calc = (x, y, element) => {
  const rect = element.getBoundingClientRect();
  const left = x - rect.x;
  const top = y - rect.y;
  return [-(top - rect.height / 2) / 20, (left - rect.width / 2) / 20, 1.05];
};

const trans = (x, y, s) =>
  `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Animated = props => {
  const [spring, setSpring] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));

  const _updateSpring = (x, y, element) =>
    setSpring({ xys: calc(x, y, element) });

  const _resetSpring = () => setSpring({ xys: [0, 0, 1] });

  return (
    <animated.div
      className={props.className}
      onMouseMove={({ clientX: x, clientY: y, currentTarget }) =>
        _updateSpring(x, y, currentTarget)
      }
      onMouseLeave={_resetSpring}
      onTouchMove={({ touches, currentTarget }) => {
        _updateSpring(touches[0].clientX, touches[0].clientY, currentTarget);
      }}
      onTouchEnd={_resetSpring}
      style={{ transform: spring.xys.interpolate(trans) }}
    >
      {props.children}
    </animated.div>
  );
};

export default Animated;
