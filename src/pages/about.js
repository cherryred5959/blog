import React from 'react';
import { graphql } from 'gatsby';
import {
  Columns,
  Column,
  Container,
  Hero,
  HeroBody,
  Title,
  Section,
  Subtitle
} from 'bloomer';
import Typist from 'react-typist';
import { useSpring, animated } from 'react-spring';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BigProfilePic from '../components/big-profile-pic';

const About = props => {
  const { data, location } = props;
  const { title: siteTitle, keywords } = data.site.siteMetadata;

  const animProps = useSpring({
    from: { marginLeft: '-100vw' },
    to: { marginLeft: '0vw' }
  });

  return (
    <Layout location={location}>
      <SEO title="About" keywords={keywords || []} />
      <Hero isColor="dark" className="is-fullheight-with-navbar">
        <HeroBody>
          <Container>
            <animated.div style={animProps}>
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
            </animated.div>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container>
          <Title>
            <span role="img" aria-label="jsx-a11y/accessible-emoji">
              👋🏻
            </span>
          </Title>
          <p>Bla bla bla...</p>
        </Container>
      </Section>
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
      }
    }
  }
`;
