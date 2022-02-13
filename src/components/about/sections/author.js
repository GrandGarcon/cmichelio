import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import { calculatePostsPerWeek, formatDate } from '../utils'

function AboutSection(props) {
  const totalPosts = get(props, `totalMarkdownRemark.totalCount`)
  const oldestPostDate = new Date(
    get(props, `oldestMarkdownRemark.edges.0.node.frontmatter.date`)
  )
  const postsPerWeek = calculatePostsPerWeek(totalPosts, oldestPostDate)

  const { siteMetadata } = props

  return (
    <ul>
      <li>
        I currently work with  the company {` `}
        <span className="font-semibold italic">
          for ⚒️ the future of the web3 based DeFI ecosystem.
        </span>
        . checkout here{` `}
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          learneos.dev
        </a>
        .
      </li>
      <li>
        I write tech tutorials and articles about the intersection of society , web3 and  progressive adaption  {` `}
        <span className="font-semibold">{formatDate(oldestPostDate)}</span>. I
        wrote <span className="font-semibold">{totalPosts}</span> posts since
        then. That's an average of{` `}
        <span className="font-semibold">{postsPerWeek}</span>
        {` `}
        posts per week.
      </li>
      <li>
        My writings can also be found on{` `}
        <a
          href={`//medium.com/@${siteMetadata.medium}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
        {` `},{` `}
        <a
          href={`//hive.blog/@${siteMetadata.steem}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Steem
        </a>
        , or{` `}
        <a
          href={`//twitter.com/${siteMetadata.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        .
      </li>
    </ul>
  )
}

AboutSection.propTypes = {
  totalMarkdownRemark: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
  }).isRequired,
  oldestMarkdownRemark: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            data: PropTypes.string,
          }),
        }),
      })
    ).isRequired,
  }).isRequired,
  siteMetadata: PropTypes.shape({
    twitter: PropTypes.string.isRequired,
    steem: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    linkedIn: PropTypes.string.isRequired,
  }).isRequired,
}

export default function AboutSectionContainer(props) {
  return (
    <StaticQuery
      query={graphql`
        query AboutSectionQuery {
          ...PostStatisticFragment
        }
      `}
      render={data => <AboutSection {...props} {...data} />}
    />
  )
}

export const PostStatisticFragment = graphql`
  fragment PostStatisticFragment on Query {
    totalMarkdownRemark: allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      totalCount
    }
    oldestMarkdownRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: 1
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`
