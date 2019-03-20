import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import LazyImage from 'gatsby-image';
import {
  Button,
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

const Footer = props => {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => (
        <BloomerFooter>
          <Container>
            <Level>
              <LevelLeft>
                <LevelItem>
                  <Media>
                    <MediaLeft>
                      <LazyImage
                        fixed={data.avatar.childImageSharp.fixed}
                        alt={data.site.siteMetadata.author}
                      />
                    </MediaLeft>
                    <MediaContent>
                      <p>
                        <strong>
                          <Link to={`/`}>
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
              <LevelRight>
                <LevelItem>
                  <Button
                    isInverted
                    isColor="danger"
                    href={`https://instagram.com/${
                      data.site.siteMetadata.social.instagram
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <Icon className="fab fa-instagram fa-lg" alt="Instagram" />
                  </Button>
                </LevelItem>
                <LevelItem>
                  <Button
                    isInverted
                    isColor="link"
                    href={`https://facebook.com/${
                      data.site.siteMetadata.social.facebook
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <Icon className="fab fa-facebook fa-lg" />
                  </Button>
                </LevelItem>
                <LevelItem>
                  <Button
                    isInverted
                    isColor="info"
                    href={`https://twitter.com/${
                      data.site.siteMetadata.social.twitter
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <Icon className="fab fa-twitter fa-lg" />
                  </Button>
                </LevelItem>
                <LevelItem>
                  <Button
                    isInverted
                    isColor="info"
                    href={`https://linkedin.com/in/${
                      data.site.siteMetadata.social.linkedin
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <Icon className="fab fa-linkedin fa-lg" />
                  </Button>
                </LevelItem>
              </LevelRight>
            </Level>
            <Level>
              <LevelItem hasTextAlign="centered">
                <Button
                  href="https://ko-fi.com/O4O2RDTK"
                  target="_blank"
                  rel="noopener noreferrer"
                  isColor="warning"
                >
                  Buy Me a Coffee
                </Button>
              </LevelItem>
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
          facebook
          linkedin
          twitter
        }
      }
    }
  }
`;

export default Footer;
