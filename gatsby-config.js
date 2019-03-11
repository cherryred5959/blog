module.exports = {
  siteMetadata: {
    title: `Dennis Morello`,
    author: `Dennis Morello`,
    description: `A dev blog by Dennis Morello.`,
    siteUrl: `https://morello.dev`,
    language: `en`,
    disqusShortname: `morello-dev`,
    social: {
      twitter: `dennismorello`,
      instagram: `morello.dev`,
      facebook: `morello.dev`
    },
    keywords: [
      `dennis`,
      `morello`,
      `blog`,
      `gatsby`,
      `javascript`,
      `js`,
      `react`,
      `reactjs`,
      `html`,
      `html5`,
      `css`,
      `css3`
    ]
  },
  pathPrefix: `/`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
        ignore: [`**/\.*`] // ignore files starting with a dot
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          `gatsby-remark-embed-video`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-external-links`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_ID
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                author
                description
                language
                site_url: siteUrl
                categories: keywords
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
                  author: site.siteMetadata.author,
                  categories: Array.from(
                    new Set([
                      ...(site.siteMetadata.categories || []),
                      ...(edge.node.frontmatter.tags || [])
                    ])
                  ),
                  url: site.siteMetadata.site_url + edge.node.fields.slug,
                  guid: site.siteMetadata.site_url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        description
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml'
          }
        ]
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dev Blog by Dennis Morello`,
        short_name: `Dev Blog`,
        start_url: `/`,
        background_color: `#f907fc`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `content/assets/dev-blog-logo.png`,
        include_favicon: true
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
};
