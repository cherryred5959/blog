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
  Title,
  Section,
  Subtitle
} from 'bloomer';
import Typist from 'react-typist';

import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';

import { getReadTime } from '../utils/read-time';

const BlogIndex = props => {
  const { data, location } = props;
  const { title: siteTitle, siteDomain, keywords } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <SEO title={siteTitle} keywords={keywords || []} />
      <Hero isSize="medium" isColor="dark">
        <HeroBody>
          <Container>
            <Title>{siteDomain}</Title>
            <Subtitle>
              <Typist startDelay={1000}>
                A blog about web technologies and other stuff{' '}
                <span role="img" aria-label="jsx-a11y/accessible-emoji">
                  💻
                </span>
              </Typist>
            </Subtitle>
          </Container>
        </HeroBody>
      </Hero>
      <Section>
        <Container>
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
                  <Card className="is-post">
                    {node.frontmatter.cover && (
                      <CardImage>
                        <Link to={node.fields.slug}>
                          <LazyImage
                            fluid={node.frontmatter.cover.childImageSharp.fluid}
                            alt={title}
                            className="image"
                          />
                        </Link>
                      </CardImage>
                    )}
                    <CardContent>
                      <Title>
                        <Link to={node.fields.slug}>{title}</Link>
                      </Title>
                      <Subtitle>
                        <small>
                          {node.frontmatter.date} –{' '}
                          {getReadTime(node.wordCount.words)}
                        </small>
                      </Subtitle>
                      <Content
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt
                        }}
                      />
                    </CardContent>
                  </Card>
                </Column>
              );
            })}
          </Columns>
        </Container>
      </Section>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          wordCount {
            words
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
