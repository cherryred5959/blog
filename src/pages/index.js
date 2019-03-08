import React from 'react';
import { Link, graphql } from 'gatsby';
import styles from '../styles/pages/index.module.scss';

import Bio from '../components/bio/bio';
import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  _getReadTime = wordCount => {
    const mins = (wordCount / 265).toFixed(0);

    if (mins <= 1) {
      return `1 min read`;
    } else {
      return `${mins} mins read`;
    }
  };

  render() {
    const { data } = this.props;
    const { title: siteTitle, keywords } = data.site.siteMetadata;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} keywords={keywords || []} />
        <div className={styles.index}>
          <Bio />
          <div className={styles.postsList}>
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              return (
                <div key={node.fields.slug}>
                  <h3
                    className={styles.postTitle}
                    style={{
                      marginBottom: rhythm(1 / 4),
                      fontSize: rhythm(1)
                    }}
                  >
                    <Link to={node.fields.slug}>{title}</Link>
                  </h3>
                  <small>
                    {node.frontmatter.date} –{' '}
                    {this._getReadTime(node.wordCount.words)}
                  </small>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
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
          }
        }
      }
    }
  }
`;
