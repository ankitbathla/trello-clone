import React from 'react'
import { render, getByTestId, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from './Footer'

test('when button is clicked item should be updated with value', async () => {
  const clearAll = jest.fn()
  const container = render(<Footer total={1} remove={clearAll}></Footer>)
    .container
  const btn = await getByTestId(container, 'clearAll')
  const para = await getByTestId(container, 'pending').textContent

  fireEvent.click(btn)
  expect(clearAll).toHaveBeenCalledTimes(0)
  expect(para).toEqual('pending tasks')
})
