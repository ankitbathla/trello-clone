import React from 'react'
import TodoInput from './TodoInput'
import { create } from 'react-test-renderer'
import { screen } from '@testing-library/react'
test('when form-button is clicked and input text is not empty', () => {
  const handle = jest.fn()
  const onSubmit = jest.fn()

  const item = 'ankit'

  const app = create(
    <TodoInput
      item={item}
      handleChange={handle}
      onSubmit={onSubmit}
    ></TodoInput>
  )
  const input = app.root.findAllByType('input')[0]
  input.props.onChange()
  const button = app.root.findAllByType('button')[0]
  button.props.onClick()
  screen.debug()
  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(handle).toHaveBeenCalledTimes(1)
})
