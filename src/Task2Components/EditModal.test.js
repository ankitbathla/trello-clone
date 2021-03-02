import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import EditModal from './EditModal'
test('should Modal appear to add new card name', async () => {
  const activeEditModal = jest.fn()
  const onHandleChange = jest.fn()
  const onsubmit = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <EditModal
        activeModal={true}
        activeEditModal={activeEditModal}
        onsubmit={onsubmit}
        onHandleChange={onHandleChange}
        cardNewId={'1'}
      ></EditModal>
    </BrowserRouter>
  )
  expect(getByTestId('cardName').textContent).toEqual('New CardName:')
})
