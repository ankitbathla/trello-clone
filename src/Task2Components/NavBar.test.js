import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './NavBar'
test('should be able to render NavBarComponent', () => {
  const openModal = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <NavBar openModal={openModal} />
    </BrowserRouter>
  )
  expect(getByTestId('home').textContent).toEqual('Home')
})
test('should be able to open the search bar when clicked', () => {
  const openModal = jest.fn()
  const onSearchChange = jest.fn()
  const searchState = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <NavBar
        openModal={openModal}
        onSearchChange={onSearchChange}
        searchState={searchState}
      ></NavBar>
    </BrowserRouter>
  )
  const btn = getByTestId('onSearch')
  fireEvent.click(btn)

  const span = getByTestId('closeSearch')
  fireEvent.click(span)
  expect(searchState).toHaveBeenCalledTimes(2)
})
