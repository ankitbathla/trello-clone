import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import Footer from './Footer'
import '../App.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      items: [],
      item: '',
      total: 0,
      isEmpty: true
    }
  }

  handleChange = (e) => {
    this.setState({
      item: e.target.value
    })
  }

  onSubmit = () => {
    let updatedItem = this.state.items
    let temp = this.state.total
    let tempId = this.state.id
    let empty
    if (this.state.item !== '') {
      temp++
      tempId = Date.now()
      updatedItem = [...this.state.items, { id: tempId, item: this.state.item }]
    }

    this.setState({
      id: tempId,
      items: updatedItem,
      item: '',
      total: temp,
      isEmpty: empty
    })
  }

  clearAll = () => {
    this.setState({
      id: 0,
      items: [],
      total: 0
    })
  }

  remove = (id) => {
    const updatedItem = this.state.items.filter((item) => item.id !== id)

    this.setState({
      items: updatedItem,
      total: this.state.total - 1
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="to-Do-App">
          Todo App <span data-testid="count"> {this.state.total}</span>
        </div>
        <TodoInput
          item={this.state.item}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
        ></TodoInput>
        <TodoList values={this.state.items} remove={this.remove}></TodoList>
        <Footer clearAll={this.clearAll} total={this.state.total}></Footer>
      </div>
    )
  }
}
export default Main
