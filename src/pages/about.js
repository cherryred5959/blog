import React from 'react';
import { graphql } from 'gatsby';
import {
  Columns,
  Column,
  Container,
  Content,
  Hero,
  HeroBody,
  HeroFooter,
  Title,
  Subtitle
} from 'bloomer';
import Typist from 'react-typist';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';

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
        <HeroFooter>
          <Container hasTextAlign="centered">
            <Bounce bottom delay={500}>
              <Title style={{ marginBottom: '3rem' }}>
                <span role="img" aria-label="jsx-a11y/accessible-emoji">
                  👇🏻
                </span>
              </Title>
            </Bounce>
          </Container>
        </HeroFooter>
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
