import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, waitFor, cleanup } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import App from './App'
import axios from 'axios'
afterEach(cleanup)
const renderWithRouter = (component) => {
  const history = createMemoryHistory()
  return {
    ...render(<Router history={history}>{component}</Router>)
  }
}

test('should be able to render the the HomeCard component', async () => {
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
  const { getByTestId } = renderWithRouter(<App />)
  const link = getByTestId('boards')
  fireEvent.click(link)
  const value = await waitFor(() => getByTestId('boardName'))
  expect(value.textContent).toMatch('ankit')
})
test('should be able to add a new board when new board link is clicked', async () => {
  const spy = jest.spyOn(axios, 'post').mockImplementation(() => {
    return Promise.resolve({})
  })

  const spy2 = jest.spyOn(axios, 'get').mockImplementation(() => {
    return Promise.resolve({})
  })
  const { getByTestId } = renderWithRouter(<App />)
  const link = getByTestId('newBoard')
  fireEvent.click(link)
  const inputText = getByTestId('inputBoardName')
  fireEvent.change(inputText, { target: { value: 'ankit' } })
  const btn = getByTestId('createBoard')
  fireEvent.click(btn)
  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy2).toHaveBeenCalledTimes(2)
})
test('should be able to open the list of of board clicked', async () => {
  const homeData = [
    {
      id: 1,
      name: 'ankit',
      prefs: [{ backgroundImage: 'abc' }, { backgroundColor: 'red' }]
    }
  ]
  const board = {
    id: 1,
    name: 'ankit',
    prefs: {
      backgroundImage: 'abc',
      backgroundColor: 'def'
    }
  }

  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (url.includes('lists')) {
      return Promise.resolve({
        data: [{ id: 1, name: 'ToDo' }]
      })
    } else if (url.includes('cards')) {
      return Promise.resolve({
        data: [{ idList: 1, name: 'ankit' }]
      })
    } else if (url.includes('https://api.trello.com/1/members/me/boards?key')) {
      return Promise.resolve({
        data: homeData
      })
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const { getByTestId } = renderWithRouter(<App />)
  const link = await waitFor(() => getByTestId('openList'))
  fireEvent.click(link)
  const value = await waitFor(() => getByTestId('listName'))
  expect(value.textContent).toEqual('ToDo')
})
test('should not be able to render the the HomeCard component', async () => {
  const spy = jest
    .spyOn(axios, 'get')
    .mockImplementation(() => Promise.resolve({}))
  renderWithRouter(<App />)
  expect(spy).toHaveBeenCalledTimes(2)
})
test('should be able to open the search bar and search the required item', async () => {
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
  const { getByTestId } = renderWithRouter(<App />)
  const btn = getByTestId('onSearch')
  fireEvent.click(btn)
  const inputText = getByTestId('searchInput')
  fireEvent.change(inputText, { target: { value: 'ankit' } })
  const value = (await waitFor(() => getByTestId('searchBoardName')))
    .textContent
  expect(value).toEqual('ankit')
})
test('should be able to render all the starred marked boards', async () => {
  const homeData = [
    {
      id: 1,
      name: 'ankit',
      prefs: [{ backgroundImage: 'abc' }, { backgroundColor: 'red' }],
      starred: true
    }
  ]
  jest.spyOn(axios, 'get').mockImplementation(() =>
    Promise.resolve({
      data: homeData
    })
  )
  const { getByTestId } = renderWithRouter(<App />)
  const value = await (await waitFor(() => getByTestId('starredBoard')))
    .textContent
  expect(value).toEqual('ankit')
})
test('should be able to display no card if there is no item which matches search', async () => {
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
  const { getByTestId } = renderWithRouter(<App />)
  const btn = getByTestId('onSearch')
  fireEvent.click(btn)
  const inputText = getByTestId('searchInput')
  fireEvent.change(inputText, { target: { value: 'bathla' } })
  const value = (await waitFor(() => getByTestId('noSearch'))).textContent
  expect(value).toEqual('')
})
test('should be able to change the board name', async () => {
  const homeData = [
    {
      id: 1,
      name: 'ankit',
      prefs: [{ backgroundImage: 'abc' }, { backgroundColor: 'red' }]
    }
  ]
  const board = {
    id: 1,
    name: 'ankit',
    prefs: {
      backgroundImage: 'abc',
      backgroundColor: 'def'
    }
  }

  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (url.includes('lists')) {
      return Promise.resolve({
        data: [{ id: 1, name: 'ToDo' }]
      })
    } else if (url.includes('cards')) {
      return Promise.resolve({
        data: [{ idList: 1, name: 'ankit' }]
      })
    } else if (url.includes('https://api.trello.com/1/members/me/boards?key')) {
      return Promise.resolve({
        data: homeData
      })
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const spy = jest.spyOn(axios, 'put').mockImplementation(() => {
    return Promise.resolve({})
  })
  const { getByTestId } = renderWithRouter(<App />)
  const btn = await waitFor(() => getByTestId('openList'))
  fireEvent.click(btn)
  const changeName = await waitFor(() => getByTestId('onClickNewBoardName'))
  fireEvent.click(changeName)
  const inputText = await waitFor(() => getByTestId('onChangeNewBoardName'))
  fireEvent.change(inputText, { target: { value: 'bathla' } })
  const btn2 = await waitFor(() => getByTestId('onClickSaveNewName'))
  fireEvent.click(btn2)

  expect(spy).toHaveBeenCalledTimes(1)
})
