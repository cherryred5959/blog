import React, { useContext } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import LazyImage from 'gatsby-image';
import {
  Button,
  Columns,
  Column,
  Container,
  Footer as BloomerFooter,
  Icon,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Media,
  MediaContent,
  MediaLeft
} from 'bloomer';

// Theme
import { ThemeContext, getOppositeTheme } from '../contexts/theme';

const Footer = props => {
  const { theme } = useContext(ThemeContext);

  return (
    <StaticQuery
      query={footerQuery}
      render={data => (
        <BloomerFooter className={`is-${theme}`}>
          <Container>
            <Level className="has-text-centered-mobile">
              <LevelLeft>
                <LevelItem>
                  <Media style={{ alignItems: 'center' }}>
                    <MediaLeft style={{ height: 64 }}>
                      <LazyImage
                        fixed={data.avatar.childImageSharp.fixed}
                        alt={data.site.siteMetadata.author}
                      />
                    </MediaLeft>
                    <MediaContent>
                      <p>
                        <strong>
                          <Link
                            to={`/`}
                            className={`has-text-${getOppositeTheme(theme)}`}
                          >
                            {data.site.siteMetadata.siteDomain}
                          </Link>
                        </strong>
                        <br />
                        {data.site.siteMetadata.description}
                      </p>
                    </MediaContent>
                  </Media>
                </LevelItem>
              </LevelLeft>
              <LevelRight className="is-inline-flex-mobile">
                <LevelItem>
                  <Columns isMobile>
                    <Column>
                      <Button
                          isInverted={theme === 'light'}
                          isColor="white"
                          href={`mailto:${
                              data.site.siteMetadata.email
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Email"
                      >
                        <Icon
                            className="fas fa-envelope fa-lg"
                            alt="Email"
                        />
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        isInverted={theme === 'light'}
                        isColor="danger"
                        href={`https://instagram.com/${
                          data.site.siteMetadata.social.instagram
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                      >
                        <Icon
                          className="fab fa-instagram fa-lg"
                          alt="Instagram"
                        />
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        isInverted={theme === 'light'}
                        isColor="info"
                        href={`https://github.com/${
                          data.site.siteMetadata.social.github
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Github"
                      >
                        <Icon className="fab fa-github fa-lg" />
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        isInverted={theme === 'light'}
                        isColor="primary"
                        type="application/rss+xml"
                        href="/rss.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="RSS Feed"
                      >
                        <Icon className="fas fa-rss fa-lg" />
                      </Button>
                    </Column>
                  </Columns>
                </LevelItem>
              </LevelRight>
            </Level>
          </Container>
        </BloomerFooter>
      )}
    />
  );
};

const footerQuery = graphql`
  query FooterQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 64, height: 64) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    site {
      siteMetadata {
        title
        siteDomain
        author
        description
        social {
          instagram
          github
        }
      }
    }
  }
`;

export default Footer;
