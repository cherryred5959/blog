import React from 'react';
import { Link, graphql } from 'gatsby';
import LazyImage from 'gatsby-image';
import {
  Card,
  CardContent,
  CardImage,
  Column,
  Columns,
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
import Animated from '../components/animated';

const BlogIndex = props => {
  const { data, location } = props;
  const { title: siteTitle, siteDomain, keywords } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO title={siteTitle} keywords={keywords || []} />
      <Hero isColor="dark" className="is-fullheight-with-navbar">
        <HeroBody>
          <Container>
            <Fade left>
              <Title>{siteDomain}</Title>
              <Subtitle>
                <Typist startDelay={1000}>
                  A blog about web technologies and other stuff{' '}
                  <span role="img" aria-label="jsx-a11y/accessible-emoji">
                    💻
                  </span>
                </Typist>
              </Subtitle>
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
              <Columns isMultiline>
                {posts.map(({ node }) => {
                  const title = node.frontmatter.title || node.fields.slug;
                  return (
                    <Column
                      isSize={{
                        fullhd: 4,
                        desktop: 4,
                        tablet: 6
                      }}
                      key={node.fields.slug}
                    >
                      <Animated className="animated-card">
                        <Link to={node.fields.slug}>
                          <Card className="is-post">
                            {node.frontmatter.cover && (
                              <CardImage>
                                <LazyImage
                                  fluid={
                                    node.frontmatter.cover.childImageSharp.fluid
                                  }
                                  alt={title}
                                  className="image"
                                />
                              </CardImage>
                            )}
                            <CardContent>
                              <Title>{title}</Title>
                              <Subtitle>
                                <small>
                                  {`${node.frontmatter.date} – ${
                                    node.timeToRead
                                  } min`}
                                </small>
                              </Subtitle>
                              <Content
                                dangerouslySetInnerHTML={{
                                  __html:
                                    node.frontmatter.description || node.excerpt
                                }}
                              />
                            </CardContent>
                          </Card>
                        </Link>
                      </Animated>
                    </Column>
                  );
                })}
              </Columns>
            </Fade>
          </Container>
        </HeroBody>
      </Hero>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteDomain
        keywords
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            cover {
              childImageSharp {
                fluid(maxHeight: 180, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
