import React, { useState, useEffect } from 'react';
import { Spring } from 'react-spring/renderprops';
import { Button, Icon } from 'bloomer';

const ScrollToTop = props => {
  const [scrollTop, setScrollTop] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const _handlePageScroll = () => {
    setScrollTop(window.scrollY);
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 1000);
    }
  };

  useEffect(() => {
    setScrollTop(window.scrollY);
    setIsVisible(window.scrollY > 0);
    window.addEventListener('scroll', _handlePageScroll);
    return () => {
      window.removeEventListener('scroll', _handlePageScroll);
    };
  }, []);

  const _scrollToTop = () =>
    window.scroll({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });

  return (
    isVisible && (
      <Spring
        from={{ bottom: -400 }}
        to={{ bottom: 24 }}
        reset={scrollTop <= 0}
        reverse={scrollTop <= 0}
        delay={100}
      >
        {props => (
          <Button
            isSize="large"
            isColor="dark"
            onClick={_scrollToTop}
            style={{
              borderRadius: '50%',
              position: 'fixed',
              right: 24,
              zIndex: 99,
              boxShadow:
                '0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12)',
              bottom: props.bottom
            }}
          >
            <Icon className="fas fa-angle-double-up fa-lg" />
          </Button>
        )}
      </Spring>
    )
  );
};

export default ScrollToTop;
