/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styles from './bio.module.scss';

import { rhythm } from '../../utils/typography';

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <div
            className={styles.bio}
            style={{
              marginBottom: rhythm(2.5)
            }}
          >
            <Image
              className={styles.authorImage}
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2)
              }}
              imgStyle={{
                borderRadius: `50%`
              }}
            />
            <div className={styles.intro}>
              <p>
                A {'<dev />'} blog by{' '}
                <a
                  href={`https://twitter.com/${social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {author}
                </a>
                .
              </p>
              <p>I talk about web technologies and other stuff.</p>
            </div>
          </div>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
