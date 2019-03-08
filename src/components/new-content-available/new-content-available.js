import React, { useState, useEffect } from 'react';
import Alert from '../alert/alert';

const NewContentAvailable = () => {
  const [isNewContentAvailable, setIsNewContentAvailable] = useState(false);

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
      message="New content available, refresh the page 🎉"
      onAlertClicked={_onAlertClicked}
    />
  );
};

export default NewContentAvailable;
