/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Main from './Main'
import { create } from 'react-test-renderer'
import { render, fireEvent, getByTestId, g } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
test('initial state', () => {
  const component = create(<Main />)
  const instance = component.getInstance()
  expect(instance.state.item).toEqual('')
  expect(instance.state.items).toEqual([])
  expect(instance.state.total).toEqual(0)
  expect(instance.state.id).toEqual(0)
})
test('clear All', () => {
  const component = create(<Main />)
  const instance = component.getInstance()
  instance.clearAll()
  expect(instance.state.item).toEqual('')
})
test('handle change', async () => {
  const container = render(<Main />).container
  const inputText = getByTestId(container, 'inputText')
  fireEvent.change(inputText, { target: { value: 'ankit' } })
  const button = getByTestId(container, 'submitBtn')
  fireEvent.click(button)
  const toDoCount = await getByTestId(container, 'count').textContent
  expect(toDoCount).toBe(' 1')
})
test('remove item from list', async () => {
  const container = render(<Main />).container
  const inputText = getByTestId(container, 'inputText')
  fireEvent.change(inputText, { target: { value: 'ankit' } })
  const button = getByTestId(container, 'submitBtn')
  fireEvent.click(button)
  const remove = getByTestId(container, 'removeBtn')
  fireEvent.click(remove)
  const toDoCount = await getByTestId(container, 'count').textContent
  expect(toDoCount).toEqual(' 0')
})
test('should not add empty text to list', async () => {
  const container = render(<Main />).container
  const inputText = getByTestId(container, 'inputText')
  fireEvent.change(inputText, { target: { value: '' } })
  const button = getByTestId(container, 'submitBtn')
  fireEvent.click(button)
  const toDoCount = await getByTestId(container, 'count').textContent
  expect(toDoCount).toBe(' 0')
})
