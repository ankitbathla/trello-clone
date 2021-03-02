import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Modal from './Modal'

test('should Modal appear to add new board', () => {
  const openModal = jest.fn()
  const onHandleChange = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <Modal
        openModal={openModal}
        onHandleChange={onHandleChange}
        modalState={true}
      ></Modal>
    </BrowserRouter>
  )
  expect(getByTestId('BoardName').textContent).toEqual('Add a Board title :')
})
