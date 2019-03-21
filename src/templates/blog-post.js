import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import LazyImage from 'gatsby-image';
import {
  Container,
  Content,
  Progress,
  Section,
  Subtitle,
  Title
} from 'bloomer';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const BlogPostTemplate = props => {
  const post = props.data.markdownRemark;
  const cover = post.frontmatter.cover;
  const {
    title: siteTitle,
    author,
    siteUrl,
    keywords,
    disqusShortname
  } = props.data.site.siteMetadata;
  const postUrl = `${siteUrl}${post.fields.slug}`;
  const { previous, next } = props.pageContext;
  const siteKeywords = Array.from(
    new Set([...(keywords || []), ...(post.frontmatter.tags || [])])
  );
  const articleMeta = [
    {
      name: 'article:published_time',
      content: post.frontmatter.published_time
    },
    {
      name: 'article:author',
      content: author
    },
    {
      name: 'og:site_name',
      content: siteTitle
    },
    {
      name: 'og:image',
      content: cover && `${siteUrl}${cover.childImageSharp.fluid.originalImg}`
    },
    {
      name: 'twitter:image',
      content: cover && `${siteUrl}${cover.childImageSharp.fluid.originalImg}`
    },
    ...siteKeywords.map(k => ({
      name: 'article:tag',
      content: k
    }))
  ];

  const [scrollTop, setScrollTop] = useState();
  const [scrollMax, setScrollMax] = useState();

  const _handlePageScroll = () => {
    setScrollTop(window.scrollY);
  };

  const _handleWindowResize = () => {
    setScrollMax(document.body.clientHeight - window.innerHeight);
  };

  useEffect(() => {
    setScrollTop(window.scrollY);
    window.addEventListener('scroll', _handlePageScroll);
    return () => {
      window.removeEventListener('scroll', _handlePageScroll);
    };
  }, []);

  useEffect(() => {
    setScrollMax(document.body.clientHeight - window.innerHeight);
    window.addEventListener('resize', _handleWindowResize);
    return () => {
      window.removeEventListener('resize', _handleWindowResize);
    };
  }, []);

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        type="article"
        url={postUrl}
        meta={articleMeta}
        keywords={siteKeywords}
      />
      <Progress
        isColor="success"
        isHidden={scrollTop <= 0}
        value={scrollTop}
        max={scrollMax}
        style={{
          borderRadius: 0,
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          height: '0.25rem',
          zIndex: 1
        }}
      />
      <Section>
        <Container>
          <div>
            <Title>{post.frontmatter.title}</Title>
            <Subtitle>
              <small>{`${post.frontmatter.date} – ${
                post.timeToRead
              } min`}</small>
            </Subtitle>
            {cover && (
              <LazyImage
                fluid={cover.childImageSharp.fluid}
                alt={post.frontmatter.title}
                style={{
                  maxWidth: cover.childImageSharp.fluid.presentationWidth,
                  margin: '0.5rem auto 2rem auto'
                }}
              />
            )}
            <Content dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>

          <hr />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>

          <hr />

          <DiscussionEmbed
            shortname={disqusShortname}
            config={{
              url: postUrl,
              identifier: post.id,
              title: post.frontmatter.title
            }}
          />
        </Container>
      </Section>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        keywords
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      timeToRead
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        published_time: date(formatString: "YYYY-MM-DD")
        description
        tags
        cover {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
              presentationWidth
              originalImg
            }
          }
        }
      }
    }
  }
`;
