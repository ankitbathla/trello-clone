import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Footer extends Component {
  render() {
    return (
      <div className="footerTodo">
        <span>
          <span className="pendingTasks"></span>{' '}
          {this.props.total !== 0 ? (
            <p data-testid="pending">pending tasks</p>
          ) : (
            <p data-testid="no-pending">no pending tasks</p>
          )}
        </span>
        <button
          className="footer-button"
          onClick={this.props.clearAll}
          data-testid="clearAll"
        >
          Clear All
        </button>
      </div>
    )
  }
}
Footer.propTypes = {
  total: PropTypes.number.isRequired,
  clearAll: PropTypes.func
}
export default Footer
