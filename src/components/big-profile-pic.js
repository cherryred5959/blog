import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import LazyImage from 'gatsby-image';
import { useSpring, animated } from 'react-spring';

const BigProfilePic = props => {
  const animProps = useSpring({
    immediate: !props.animated,
    from: { marginRight: '-100vw' },
    to: { marginRight: '0vh' }
  });

  return (
    <StaticQuery
      query={profilePicQuery}
      render={data => {
        const { author } = data.site.siteMetadata;
        const profilePic = data.file.childImageSharp;
        return (
          <animated.div style={animProps}>
            <LazyImage
              fluid={profilePic.fluid}
              alt={author}
              imgStyle={{
                borderRadius: `50%`,
                boxShadow: `0px 10px 30px -5px rgba(0, 0, 0, 0.3)`
              }}
              style={{
                maxWidth: profilePic.fluid.presentationWidth,
                maxHeight:
                  profilePic.fluid.presentationWidth /
                  profilePic.fluid.aspectRatio,
                margin: `auto 0 auto auto`,
                overflow: `visible`
              }}
            />
          </animated.div>
        );
      }}
    />
  );
};

const profilePicQuery = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
    file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp
          presentationWidth
        }
      }
    }
  }
`;

BigProfilePic.defaultProps = { animated: true };

BigProfilePic.propTypes = { animated: PropTypes.string };

export default BigProfilePic;
