import React from 'react'
import { Link } from 'gatsby'

export default class Error404 extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Page not found &#x1F631;</h1>
        <p>
          The page you were trying to visit does not exist. If you feel like
          this page should exist, please contact me. You can find my contact
          details in the <Link to="/about">About page</Link>.
        </p>
        <p>
          Otherwise you can take a look at my{` `}
          <Link to="/">latest blog posts</Link>.
        </p>
      </React.Fragment>
    )
  }
}
