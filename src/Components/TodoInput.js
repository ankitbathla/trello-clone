import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoInput extends Component {
  render() {
    return (
      <div className="inputField" data-testid="form">
        <input
          className="input"
          type="text"
          placeholder="Add your new todo"
          value={this.props.item}
          onChange={this.props.handleChange}
          data-testid="inputText"
        ></input>
        <button
          type="submit"
          className="form-button"
          onClick={this.props.onSubmit}
          data-testid="submitBtn"
        >
          <span className="fa fa-plus"></span>
        </button>
      </div>
    )
  }
}
TodoInput.propTypes = {
  item: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func
}

export default TodoInput
