// Custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

// Prism.js code highlight
import 'prism-themes/themes/prism-a11y-dark.css';

// Global style
import './src/styles/global.scss';

// Handle new content availability
export const onServiceWorkerUpdateReady = () => {
  window.dispatchEvent(new Event('serviceWorkerUpdateReady'));
};
