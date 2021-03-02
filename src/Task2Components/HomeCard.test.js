import React from 'react'
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import HomeCard from './HomeCard'
afterEach(cleanup)
test('Should be able to render all the boards after loading', () => {
  const homeData = [
    {
      id: 1,
      name: 'ankit',
      prefs: [{ backgroundImage: 'abc' }, { backgroundColor: 'red' }]
    }
  ]

  jest.spyOn(axios, 'get').mockImplementation(() =>
    Promise.resolve({
      data: homeData
    })
  )
  const openModal = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <HomeCard loading={false} openModal={openModal} homeData={homeData} />
    </BrowserRouter>
  )
  expect(getByTestId('boardName').textContent).toEqual('ankit')
})
test('Should be able to toggle the left navBar', async () => {
  const homeData = [
    {
      id: 1,
      name: 'ankit',
      prefs: [{ backgroundImage: 'abc' }, { backgroundColor: 'red' }]
    }
  ]

  jest.spyOn(axios, 'get').mockImplementation(() =>
    Promise.resolve({
      data: homeData
    })
  )
  const openModal = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <HomeCard loading={false} openModal={openModal} homeData={homeData} />
    </BrowserRouter>
  )
  const div = await waitFor(() => getByTestId('list'))
  fireEvent.click(div)
  const value = await (await waitFor(() => getByTestId('get'))).textContent

  expect(value).toEqual('Get Started')
})
