import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import Alert from '../alert/alert';

const NewContentAvailable = () => {
  const [isNewContentAvailable, setIsNewContentAvailable] = useState(false);

  const message = `New content is available, ${
    isMobile ? 'tap' : 'click'
  } here to reload 🎉`;

  function _handleNewContent() {
    setIsNewContentAvailable(true);
  }

  function _onAlertClicked() {
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener('serviceWorkerUpdateReady', _handleNewContent);
    return () => {
      window.removeEventListener('serviceWorkerUpdateReady', _handleNewContent);
    };
  }, []);

  return (
    <Alert
      show={isNewContentAvailable}
      message={message}
      onAlertClicked={_onAlertClicked}
    />
  );
};

export default NewContentAvailable;
