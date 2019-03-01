import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import gatsbyLogo from '../../content/assets/gatsby-logo.svg';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer
          style={{
            marginTop: rhythm(2.5),
            paddingTop: rhythm(1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>
            Built with{' '}
            <a
              href="https://www.gatsbyjs.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                boxShadow: 'none'
              }}
            >
              <img
                src={gatsbyLogo}
                alt="Gatsby Logo"
                style={{
                  height: rhythm(3 / 4),
                  margin: 0,
                  verticalAlign: 'sub'
                }}
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
