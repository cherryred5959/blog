import React from 'react';
import { Link } from 'gatsby';
import styles from './layout.module.scss';

import { rhythm, scale } from '../../utils/typography';
import gatsbyLogo from '../../../content/assets/gatsby-logo.svg';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          className={styles.siteTitle}
          style={{
            ...scale(7 / 8),
            marginBottom: rhythm(1.5)
          }}
        >
          <Link to={`/`}>{title}</Link>
        </h1>
      );
    } else {
      header = (
        <h3 className={styles.siteTitleSmall}>
          <Link to={`/`}>{title}</Link>
        </h3>
      );
    }
    return (
      <div
        className={styles.layout}
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer
          style={{
            marginTop: rhythm(2.5),
            paddingTop: rhythm(1)
          }}
        >
          <span>
            Built with{' '}
            <a
              className={styles.gatsbyLogo}
              href="https://www.gatsbyjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={gatsbyLogo}
                alt="Gatsby Logo"
                style={{
                  height: rhythm(3 / 4)
                }}
              />
            </a>
          </span>
          <span className={styles.kofi}>
            <a
              href="https://ko-fi.com/O4O2RDTK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://az743702.vo.msecnd.net/cdn/kofi5.png?v=0"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>
          </span>
          <span>
            <a
              type="application/rss+xml"
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
            </a>
          </span>
        </footer>
      </div>
    );
  }
}

export default Layout;
