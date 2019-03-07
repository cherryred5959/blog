import React from 'react';
import { Link, graphql } from 'gatsby';
import styles from '../styles/templates/blog-post.module.scss';

import Bio from '../components/bio/bio';
import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const {
      title: siteTitle,
      author,
      siteUrl,
      keywords
    } = this.props.data.site.siteMetadata;
    const { previous, next } = this.props.pageContext;
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
      ...siteKeywords.map(k => ({
        name: 'article:tag',
        content: k
      }))
    ];

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          type="article"
          url={`${siteUrl}${post.fields.slug}`}
          meta={articleMeta}
          keywords={siteKeywords}
        />
        <div className={styles.post}>
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-0.8)
            }}
          >
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <hr
          style={{
            marginBottom: rhythm(1)
          }}
        />
        <Bio />

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
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        keywords
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
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
      }
    }
  }
`;
