import React, { useState } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import {
  Button,
  Icon,
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarEnd,
  NavbarItem,
  NavbarMenu,
  NavbarStart
} from 'bloomer';

import codeLogo from '../../../content/assets/code-logo-64.png';

const Header = props => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => setIsActive(!isActive);

  return (
    <StaticQuery
      query={headerQuery}
      render={data => (
        <Navbar className="has-shadow">
          <NavbarBrand>
            <Link to={`/`} className="navbar-item">
              <img src={codeLogo} alt={data.site.siteMetadata.title} />
              <b style={{ marginLeft: '0.5rem' }}>
                {data.site.siteMetadata.siteDomain}
              </b>
            </Link>
            <NavbarBurger isActive={isActive} onClick={toggleIsActive} />
          </NavbarBrand>
          <NavbarMenu isActive={isActive} onClick={toggleIsActive}>
            <NavbarStart>
              {/*<Link to={`/about`} className="navbar-item">
                About Me
      </Link>*/}
            </NavbarStart>
            <NavbarEnd>
              <NavbarItem>
                <Button
                  isInverted
                  isColor="warning"
                  type="application/rss+xml"
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="RSS Feed"
                >
                  <Icon className="fas fa-rss fa-lg" />
                </Button>
              </NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
      )}
    />
  );
};

const headerQuery = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        siteDomain
      }
    }
  }
`;

export default Header;
