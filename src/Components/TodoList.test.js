import React from 'react'
import { render, fireEvent, getAllByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TodoList from './TodoList'

test('when button is clicked item should be updated with value', async () => {
  const remove = jest.fn()
  const container = render(
    <TodoList
      values={[
        { id: 1, name: 'ankit' },
        { id: 2, name: 'bathla' }
      ]}
      remove={remove}
    ></TodoList>
  ).container
  const removeBtn = await getAllByTestId(container, 'removeBtn')[0]
  fireEvent.click(removeBtn)
  expect(remove).toHaveBeenCalledTimes(1)
})
