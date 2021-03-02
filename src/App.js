import React, { useEffect, useState } from 'react'
import './Task2.css'
import HomeCard from './Task2Components/HomeCard'
import NavBar from './Task2Components/NavBar'
import Modal from './Task2Components/Modal'
import axios from 'axios'
import List from './Task2Components/List'
import Main from './Components/Main'
import { Redirect, Route, Switch, HashRouter } from 'react-router-dom'

function App() {
  const [homeData, setHomeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalState, setModalState] = useState(false)
  const [boardName, setBoardName] = useState(null)
  const [searchValue, setSearchValue] = useState()
  const [search, setSearch] = useState()
  useEffect(async () => {
    const response = await axios.get(
      'https://api.trello.com/1/members/me/boards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb'
    )
    if (response && response.data) {
      setHomeData(response.data)
      console.log(response.data)
    }
    setLoading(false)
  }, [])
  const openModal = () => {
    setModalState(!modalState)
  }
  const onHandleChange = (e) => {
    setBoardName(e.target.value)
  }
  const addItem = async () => {
    await axios.post(
      `https://api.trello.com/1/boards/?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb&name=${boardName}`
    )
  }
  const multipleFunc = async () => {
    openModal()
    addItem()
    const response = await axios.get(
      'https://api.trello.com/1/members/me/boards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb'
    )
    setHomeData(response.data)
    setLoading(false)
    window.location.reload()
  }
  const onSearchChange = (e) => {
    setSearchValue(e.target.value)
  }
  const searchState = (value) => {
    setSearch(value)
  }
  const setData = (data) => {
    setHomeData(data)
  }

  return (
    <HashRouter>
      <div className="app">
        <NavBar
          openModal={openModal}
          onSearchChange={onSearchChange}
          searchState={searchState}
          data-testid="navBar"
        ></NavBar>

        <Modal
          modalState={modalState}
          openModal={openModal}
          onHandleChange={onHandleChange}
          addItem={addItem}
          multipleFunc={multipleFunc}
        ></Modal>
        <Switch>
          <Route path="/todo" component={Main}></Route>
          <Route
            path="/boards"
            component={() => (
              <HomeCard
                homeData={homeData}
                loading={loading}
                openModal={openModal}
                searchValue={searchValue}
                search={search}
              ></HomeCard>
            )}
          ></Route>
          <Route
            path="/list/:id"
            component={() => <List setData={setData}></List>}
          ></Route>
          <Redirect to="/boards"></Redirect>
        </Switch>
      </div>
    </HashRouter>
  )
}
export default App
