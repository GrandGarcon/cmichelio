/* eslint-env node */
const url = require(`url`)
const { createProxyMiddleware } = require(`http-proxy-middleware`)

module.exports = {
  siteMetadata: {
    title: `Frontier tech : the ultimate web3 foundry`,
    author: `Dhruv Malik`,
    description: ` blog  about learning the progressive induction of web3 SaaS Landscape across diffrent verticals.`,
    keywords: `web3 Ethereum Blockchain software tech programming Decentralised-Finance`,
    socialImage: `https://FrontierTech.xyz/images/logo.png`,
    siteUrl: `https://FrontierTech.xyz`,
    twitter: `lesDecroissant`,
    github: `Grandgarcon`,
    medium: `shastra.medium.com`,
    steem: ``,
    mirror: `https://mirror.xyz/0x46ed2A88D9F786EA233d0D783847e0a2502dA101/`,
    linkedIn: `dhruvthge8`,
  },
  pathPrefix: `/`,
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: (app) => {
    app.use(
      `/.netlify/functions`,
      createProxyMiddleware({
        target: `http://localhost:9000/`,
        pathRewrite: {
          '/.netlify/functions': ``,
        },
      })
    )
  },
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `images`,
      },
    },
    {
      resolve: `copy-images-structure`,
      options: {
        ignoreFileExtensions: [`psd`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // copies svg images, and all other _linked_ non-image files
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `static`,
              // ignoreFileExtensions: [],
            },
          },
          {
            resolve: `prepare-crosspost`,
            options: {
              ignoreFileExtensions: [],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              // disableBgImageOnAlpha: true,
              backgroundColor: `transparent`,
              linkImagesToOriginal: true,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-122461559-2`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const absoluteUrl = url.resolve(
                  site.siteMetadata.siteUrl,
                  edge.node.fields.slug
                )
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: absoluteUrl,
                  guid: absoluteUrl,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 20,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
            `,
            output: `/feed.xml`,
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`./tailwind.config.js`), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/index.js`),
      },
    },
    `gatsby-plugin-remove-serviceworker`,
  ],
}
