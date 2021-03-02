import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoList extends Component {
  render() {
    const abc = this.props.values.map((item) => {
      return (
        <li key={item.id}>
          {item.item}
          <button
            type="button"
            onClick={() => this.props.remove(item.id)}
            data-testid="removeBtn"
          >
            <span className=" iconI fa  fa-times lg"></span>
          </button>
        </li>
      )
    })
    return <ul className="todoList">{abc}</ul>
  }
}
TodoList.propTypes = {
  values: PropTypes.array.isRequired,
  remove: PropTypes.func
}
export default TodoList
