import React from 'react';
import { graphql } from 'gatsby';
import {
  Columns,
  Column,
  Container,
  Content,
  Hero,
  HeroBody,
  Title,
  Subtitle
} from 'bloomer';
import Typist from 'react-typist';
import Fade from 'react-reveal/Fade';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BigProfilePic from '../components/big-profile-pic';

const About = props => {
  const { data, location } = props;
  const { title: siteTitle, keywords } = data.site.siteMetadata;

  return (
    <Layout location={location}>
      <SEO title="About" keywords={keywords || []} />
      <Hero isColor="dark" className="is-fullheight-with-navbar">
        <HeroBody>
          <Container>
            <Fade left>
              <Columns>
                <Column style={{ margin: `auto 0` }}>
                  <Title>{siteTitle}</Title>
                  <Subtitle>
                    <Typist startDelay={1000}>
                      A front-end engineer from Milan{' '}
                      <span role="img" aria-label="jsx-a11y/accessible-emoji">
                        🇮🇹
                      </span>
                    </Typist>
                  </Subtitle>
                </Column>
                <Column style={{ margin: `auto 0` }} isHidden="mobile">
                  <BigProfilePic />
                </Column>
              </Columns>
            </Fade>
          </Container>
        </HeroBody>
      </Hero>
      <Hero isFullHeight>
        <HeroBody>
          <Container>
            <Fade left>
              <React.Fragment>
                <Title>
                  <span role="img" aria-label="jsx-a11y/accessible-emoji">
                    👋🏻
                  </span>
                </Title>
                <Content>
                  <p>
                    I am an Italian front-end engineer. Geek by nature, I have
                    always been interested in technology, music and photography.
                  </p>
                  <p>Bla bla bla...</p>
                </Content>
              </React.Fragment>
            </Fade>
          </Container>
        </HeroBody>
      </Hero>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        keywords
        author
      }
    }
  }
`;
