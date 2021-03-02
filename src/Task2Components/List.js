import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import EditModal from './EditModal'
import PropTypes from 'prop-types'
function List(props) {
  const [listData, setListData] = useState()
  const [cardData, setCardData] = useState([])
  const { id } = useParams()
  const [inputText, setInputText] = useState('')
  const [activeModal, setActiveModal] = useState(false)
  const [cardNewId, setCardId] = useState()
  const [name, setName] = useState()
  const [newList, setNewList] = useState()
  const [onChangeId, setONChangeId] = useState()
  const [board, setBoard] = useState()
  const [newBoardName, setNewBoardName] = useState(false)
  const [BoardName, setBoardName] = useState()

  const onHandleChange = (e) => {
    setName(e.target.value)
  }
  useEffect(() => {
    console.log('inside useEffect', 'list')
    const data = async () => {
      const response = await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb
        `)
      const card = await axios.get(
        `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
      )

      const board = await axios.get(
        `https://api.trello.com/1/boards/${id}?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
      )
      if (board && board.data) {
        console.log(board.data, 'board')
        setBoard(board.data)
      }
      if (response) {
        setListData(response.data)
        console.log(response.data, 'list')
      }
      if (card) {
        setCardData(card.data)
        console.log(card.data, 'card')
      }
    }
    data()
  }, [])

  const deleteCard = async (idItem) => {
    await axios.delete(
      `https://api.trello.com/1/cards/${idItem}?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )

    const card = await axios.get(
      `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )
    setCardData(card.data)
  }
  const createCard = async (idItem) => {
    if (inputText !== undefined && inputText !== '' && idItem === onChangeId) {
      await axios.post(
        `https://api.trello.com/1/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb&idList=${idItem}&name=${inputText}`
      )
      const card = await axios.get(
        `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
      )
      setCardData(card.data)
      document.getElementById(`card-${idItem}`).value = ''
    }
  }
  const multipleFunction = async (cardId, name) => {
    activeEditModal()
    setCardId(cardId)
  }

  const handleChange = (e, ItemId) => {
    e.preventDefault()
    setInputText(e.target.value)
    setONChangeId(ItemId)
  }
  const activeEditModal = () => {
    setActiveModal(!activeModal)
  }
  const onsubmit = async () => {
    await axios.put(
      `https://api.trello.com/1/cards/${cardNewId}?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb&name=${name}`
    )

    const card = await axios.get(
      `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )
    setCardData(card.data)

    activeEditModal()
    console.log(document.getElementById('changeCardName').defaultValue)
  }
  const creatingNewList = (e) => {
    setNewList(e.target.value)
  }
  const addNewList = async () => {
    await axios.post(
      `https://api.trello.com/1/lists?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb&name=${newList}&idBoard=${id}`
    )
    const response = await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb
    `)
    const card = await axios.get(
      `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )
    setListData(response.data)
    setCardData(card.data)
    document.getElementById('createList').value = ''
  }
  const setIdToDelete = async (listId) => {
    await axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb&value=true`
    )
    const response = await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb
        `)
    const card = await axios.get(
      `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )

    setListData(response.data)

    setCardData(card.data)
  }
  const changeBoardName = () => {
    setNewBoardName(!newBoardName)
  }
  const changeName = (e) => {
    setBoardName(e.target.value)
  }
  const change = async () => {
    axios.put(
      `https://api.trello.com/1/boards/${id}?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb&name=${BoardName}`
    )
    const response = await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb
    `)
    const card = await axios.get(
      `https://api.trello.com/1/boards/${id}/cards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )

    const board = await axios.get(
      `https://api.trello.com/1/boards/${id}?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb`
    )
    const responseAll = await axios.get(
      'https://api.trello.com/1/members/me/boards?key=d99233bea37b0025a58fa72dc607d4ff&token=e8c437e0e01d12dfdf3abcb5bf7fe9b8f62094009251fc654ff71d1607517edb'
    )

    setBoard(board.data)

    setListData(response.data)

    setCardData(card.data)
    props.setData(responseAll.data)
  }
  return (
    <div className="aaa">
      {board && board.prefs ? (
        <div
          className="board-heading"
          style={{
            backgroundImage: 'url(' + board.prefs.backgroundImage + ')',
            backgroundColor: board.prefs.backgroundColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: 'calc(100vh - 2em)'
          }}
        >
          <div
            onClick={changeBoardName}
            id="board-name"
            data-testid="onClickNewBoardName"
            className={`add-new-board-${newBoardName}`}
          >
            {board.name}
          </div>
          <div className={`add-new-board-input-${newBoardName}`}>
            <input
              type="text"
              placeholder="new Board name..."
              className="search-input-new-board-name"
              data-testid="onChangeNewBoardName"
              id="newBoardNameValue"
              onChange={changeName}
            ></input>
            <button
              type="button"
              onClick={change}
              className="save-new-board-name"
              data-testid="onClickSaveNewName"
            >
              Save..
            </button>
            <span
              className="fa fa-times cross-icon"
              data-testid="closeSearch"
              onClick={changeBoardName}
            ></span>
          </div>

          <div className="lists-container">
            <EditModal
              activeModal={activeModal}
              activeEditModal={activeEditModal}
              cardNewId={cardNewId}
              onsubmit={onsubmit}
              onHandleChange={onHandleChange}
            ></EditModal>
            {listData ? (
              listData.map((item) => {
                return (
                  <div className="list" key={item.id}>
                    <div className="header">
                      <h3 className="list-title" data-testid="listName">
                        {item.name}
                      </h3>
                      <span
                        className="fa fa-times times-btn"
                        data-testid="delete"
                        onClick={() => setIdToDelete(item.id)}
                      ></span>
                    </div>

                    <ul className="list-items">
                      {cardData.map((card) => {
                        if (card.idList === item.id) {
                          return (
                            <li
                              className="inner-cards"
                              key={card.id}
                              data-testid="card-Name"
                              id={`name-${card.id}`}
                            >
                              {card.name}
                              <div className="edit-delete">
                                <span
                                  className="fa fa-trash trash-icon"
                                  data-testid="delete-card"
                                  onClick={() => deleteCard(card.id)}
                                ></span>
                                <span
                                  className="fa fa-pencil"
                                  data-testid="edit"
                                  onClick={() =>
                                    multipleFunction(card.id, card.name)
                                  }
                                ></span>
                              </div>
                            </li>
                          )
                        } else {
                          return <div data-testid="noCard">{''}</div>
                        }
                      })}
                    </ul>
                    <input
                      type="text"
                      placeholder="  type Card Name...."
                      className="create-card"
                      data-testid="addCard"
                      id={`card-${item.id}`}
                      onChange={(e) => handleChange(e, item.id)}
                    ></input>
                    <button
                      className="add-card-btn "
                      data-testid="create-btn"
                      onClick={() => createCard(item.id)}
                    >
                      Add a Card
                    </button>
                  </div>
                )
              })
            ) : (
              <div data-testid="loading-list">..loading</div>
            )}

            <div className="create-list">
              <input
                type="text"
                className="create-list-input"
                placeholder="   type list name "
                data-testid="newList"
                id="createList"
                onChange={creatingNewList}
              ></input>
              <button>
                <div
                  className="create-list-btn"
                  onClick={addNewList}
                  data-testid="createList"
                >
                  Create New List{' '}
                  <span className="fa fa-plus plus-color"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
List.propTypes = {
  setData: PropTypes.func.isRequired
}
export default List
