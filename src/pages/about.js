import React from 'react';
import { graphql } from 'gatsby';
import { Container, Hero, HeroBody, Title, Section, Subtitle } from 'bloomer';
import Typist from 'react-typist';

import Layout from '../components/layout';
import SEO from '../components/seo';

const About = props => {
  const { data, location } = props;
  const { title: siteTitle, keywords } = data.site.siteMetadata;

  return (
    <Layout location={location}>
      <SEO title={siteTitle} keywords={keywords || []} />
      <Hero isSize="medium" isColor="dark">
        <HeroBody>
          <Container>
            <Title>{siteTitle}</Title>
            <Subtitle>
              <Typist startDelay={1000}>
                A front-end engineer from Milan{' '}
                <span role="img" aria-label="jsx-a11y/accessible-emoji">
                  🇮🇹
                </span>
              </Typist>
            </Subtitle>
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
