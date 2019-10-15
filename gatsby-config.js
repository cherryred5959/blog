module.exports = {
  siteMetadata: {
    title: `Dennis Morello`,
    author: `Dennis Morello`,
    email: `dennismorello@gmail.com`,
    description: `A dev blog by Dennis Morello.`,
    siteUrl: `https://morello.dev`,
    siteDomain: `morello.dev`,
    language: `en`,
    disqusShortname: `morello-dev`,
    social: {
      instagram: `dennismrl`,
      linkedin: `dennismorello`,
      twitter: `dennismorello`,
      github: `dennismorello`
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
              maxWidth: 1400,
              linkImagesToOriginal: false,
              withWebp: {
                quality: 80
              },
              wrapperStyle: fluidResult =>
                `flex:${Math.round(fluidResult.aspectRatio, 2)};`
            }
          },
          `gatsby-remark-embed-video`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-external-links`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-a11y-emoji`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              noInlineHighlight: true
            }
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`
            }
          }
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
                email
                description
                language
                siteUrl
                keywords
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
                      ...(site.siteMetadata.keywords || []),
                      ...(edge.node.frontmatter.tags || [])
                    ])
                  ),
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                  filter: { frontmatter: { draft: { ne: true } } }
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
            output: '/rss.xml',
            title: 'Dennis Morello'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Quicksand:300,400,500,700`],
        display: `swap`
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dev Blog by Dennis Morello`,
        short_name: `Dev Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#363636`,
        display: `minimal-ui`,
        icon: `content/assets/logo-1024.png`,
        include_favicon: true,
        crossOrigin: `use-credentials`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`
  ]
};
