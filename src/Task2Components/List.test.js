import React from 'react'
import { fireEvent, render, waitFor, cleanup } from '@testing-library/react'
import List from './List'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
jest.mock('axios')
afterEach(cleanup)
jest.setTimeout(30000)
test('it should display some loading text', async () => {
  const homeData = {
    id: 1,
    name: 'ankit',
    prefs: {
      backgroundImage: 'abc',
      backgroundColor: 'def'
    }
  }
  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (!url.includes('lists') && !url.includes('cards')) {
      return Promise.resolve({
        data: homeData
      })
    }
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const value = await waitFor(() => getByTestId('loading-list'), {
    timeout: 5000
  })
  expect(value).toHaveTextContent('..loading')
})
test('should load and display the data', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )

  expect(await waitFor(() => getByTestId('listName').textContent)).toEqual(
    'ToDo'
  )
  expect(await waitFor(() => getByTestId('card-Name').textContent)).toEqual(
    'ankit'
  )
})
test('should be able to delete the the list when delete btn is pressed', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const spy = jest.spyOn(axios, 'put').mockImplementation(() => {
    return Promise.resolve({})
  })

  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const btn = await waitFor(() => getByTestId('delete'))
  fireEvent.click(btn)
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
})
test('should be able to delete the the card when delete btn is pressed', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const spy = jest.spyOn(axios, 'delete').mockImplementation(() => {
    return Promise.resolve({})
  })

  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const btn = await waitFor(() => getByTestId('delete-card'))
  fireEvent.click(btn)
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
})
test('should be able to create the the card when create btn is pressed', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const spy = jest.spyOn(axios, 'post').mockImplementation(() => {
    return Promise.resolve({})
  })

  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const btn = await waitFor(() => getByTestId('create-btn'))

  const inputText = await waitFor(() => getByTestId('addCard'))
  fireEvent.change(inputText, { target: { value: 'ankit' } })
  fireEvent.click(btn)
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
})
test('no card is present int the list', async () => {
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
        data: [{ idList: 2, name: 'ankit' }]
      })
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )

  expect(await waitFor(() => getByTestId('noCard').textContent)).toEqual('')
})

test('should be able to create new list', async () => {
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
        data: [{ idList: 2, name: 'ankit' }]
      })
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const spy = jest.spyOn(axios, 'post').mockImplementation(() => {
    return Promise.resolve({})
  })
  const inputText = await waitFor(() => getByTestId('newList'))
  fireEvent.change(inputText, { target: { value: 'Todo' } })
  const btn = await waitFor(() => getByTestId('createList'))
  fireEvent.click(btn)
  expect(spy).toHaveBeenCalledTimes(1)
})
test('should be able to change the name of existing card', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const spy = jest.spyOn(axios, 'put').mockImplementation(() => {
    return Promise.resolve({})
  })
  const inputText = await waitFor(() => getByTestId('changeName'))
  fireEvent.change(inputText, { target: { value: 'bathla' } })

  const btn = await waitFor(() => getByTestId('edit-name'))
  fireEvent.click(btn)
  expect(spy).toHaveBeenCalledTimes(1)
})
test('should be able to open editModal to edit the name of card', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const spy = jest.spyOn(axios, 'put').mockImplementation(() => {
    return Promise.resolve({})
  })
  const btn = await waitFor(() => getByTestId('edit'))
  fireEvent.click(btn)
  const inputText = await waitFor(() => getByTestId('changeName'))
  fireEvent.change(inputText, { target: { value: 'ankit' } })
  const btnSubmit = await waitFor(() => getByTestId('edit-name'))
  fireEvent.click(btnSubmit)
  expect(spy).toHaveBeenCalledTimes(1)
})
test('should not  be able to create the the card when create btn is pressed if the input is empty or undefined', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const spy = jest.spyOn(axios, 'post').mockImplementation(() => {
    return Promise.resolve({})
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )
  const btn = await waitFor(() => getByTestId('create-btn'))
  const inputText = await waitFor(() => getByTestId('addCard'))
  fireEvent.change(inputText, { target: { value: '' } })
  fireEvent.click(btn)
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(0))
})
test('should be able to change the board name if the board name is clicked', async () => {
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
    } else {
      return Promise.resolve({
        data: board
      })
    }
  })
  const spy = jest.spyOn(axios, 'put').mockImplementation(() => {
    return Promise.resolve({})
  })
  const setData = jest.fn()
  const { getByTestId } = render(
    <BrowserRouter>
      <List setData={setData} />
    </BrowserRouter>
  )

  const div = await waitFor(() => getByTestId('onClickNewBoardName'))
  fireEvent.click(div)
  const inputText = await waitFor(() => getByTestId('onChangeNewBoardName'))
  fireEvent.change(inputText, { target: { value: 'bathla' } })
  const btn = await waitFor(() => getByTestId('onClickSaveNewName'))
  fireEvent.click(btn)

  expect(spy).toHaveBeenCalledTimes(1)
})
