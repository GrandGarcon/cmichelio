import './tailwind.css'
import './layout.css'
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Metaballs from 'react-metaballs-js'
import config from '../../../tailwind'

export default class MainTemplate extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  renderTheContent = data => (
    <React.Fragment>
      <Helmet>
        <meta name="copyright" content="Christoph Michel" />
        <meta name="author" content="Christoph Michel" />
      </Helmet>
      <section>
        <Metaballs
          numMetaballs={20}
          minRadius={13}
          maxRadius={21}
          speed={5.0}
          color={config.colors[`black`]}
          backgroundColor="#00000000"
          className="metaballs"
          style={{
            position: `fixed`,
            top: 0,
            left: 0,
            width: `100%`,
            height: `100%`,
            zIndex: -1,
          }}
        />
        <main>{this.props.children}</main>
      </section>
    </React.Fragment>
  )

  render() {
    return (
      // SocialMediaFragment fragment is defined in NavigationMenu/SocialBar
      <StaticQuery
        query={graphql`
          query MainTemplateQuery {
            ...SocialMediaFragment
          }
        `}
        render={this.renderTheContent}
      />
    )
  }
}
