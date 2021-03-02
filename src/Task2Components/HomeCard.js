import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
function HomeCard(props) {
  const [arrow, setArrow] = useState(true)
  const change = () => {
    setArrow(!arrow)
  }
  return (
    <div className="BoardsPage">
      <div className="left-navBar" style={{ position: 'sticky', top: '0px' }}>
        <div
          className="left-items"
          style={{ margin: '40px 0 0', padding: '0 16px', width: '240px' }}
        >
          <div>
            <ul className="unOrdered-list">
              <li
                className="list-items-left"
                style={{
                  marginBottom: '4px',
                  backgroundColor: '#e4f0f6',
                  color: '#0079bf'
                }}
              >
                <div className="list-item-board">
                  <span className="fa fa-trello trello-left-icon"></span>
                  <div className="left-list-board-name">Boards</div>
                </div>
              </li>
              <div>
                <li style={{ marginBottom: '4px' }}>
                  <div className="list-item-board left-home">Home</div>
                </li>
              </div>
              <li
                style={{ marginBottom: '4px' }}
                onClick={change}
                data-testid="list"
              >
                <div className="left-drop-down">
                  <span className="fa fa-user left-user"></span>
                  <div className="left-text-icon">zopSmart</div>
                  <div className={`display-arrowDown-${arrow}`}>
                    <span
                      className={`fa fa-arrow-down  display-arrowDown-${arrow}`}
                    ></span>
                  </div>
                  <div className={`display-arrowUP-${arrow}`}>
                    <span className={`fa fa-arrow-up`}></span>
                  </div>
                </div>
              </li>
            </ul>
            <ul
              style={{ marginBottom: '12px' }}
              className={`unOrdered-list display-${arrow}`}
            >
              <li style={{ marginBottom: '4px' }}>
                <div className="left-list-elements">
                  <span
                    className="fa fa-check-circle"
                    style={{
                      fontWeight: '400',
                      marginLeft: '1.7em',
                      marginRight: '1.7em'
                    }}
                  ></span>
                  <div className="left-get-started" data-testid="get">
                    Get Started
                  </div>
                </div>
              </li>
              <li style={{ marginBottom: '4px' }}>
                <div className="left-list-elements">
                  <span
                    className="fa fa-trello"
                    style={{
                      fontWeight: '400',
                      marginLeft: '1.7em',
                      marginRight: '1.7em'
                    }}
                  ></span>
                  <div className="left-get-started">Boards</div>
                </div>
              </li>
              <li style={{ marginBottom: '4px' }}>
                <div className="left-list-elements">
                  <span
                    className="fa fa-heart"
                    style={{
                      fontWeight: '400',
                      marginLeft: '1.7em',
                      marginRight: '1.7em'
                    }}
                  ></span>
                  <div className="left-get-started">highLights</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="right">
        <div className={`search-item-${props.search}`}>
          <div className="your-Board">
            <strong>
              <span className="fa fa-search" style={{ padding: '1em' }}></span>{' '}
              Search
            </strong>
          </div>
          <div className="container">
            {props.homeData &&
              props.homeData.map((item) => {
                if (
                  props.searchValue &&
                  props.searchValue !== '' &&
                  (item.name.includes(props.searchValue.toLowerCase()) ||
                    item.name.includes(props.searchValue.toUpperCase()))
                ) {
                  return (
                    <div key={item.id}>
                      <NavLink
                        to={`/list/${item.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className="card"
                          style={{
                            backgroundImage:
                              'url(' + item.prefs.backgroundImage + ')',
                            backgroundColor: item.prefs.backgroundColor,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <div
                            className="cardName"
                            data-testid="searchBoardName"
                            style={{ padding: '.3em' }}
                          >
                            {item.name}
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  )
                } else {
                  return <div data-testid="noSearch">{''}</div>
                }
              })}
          </div>
        </div>
        <div className="your-Board">
          <strong>
            <span className="fa fa-star" style={{ padding: '1em' }}></span>
            Stared Boards
          </strong>
        </div>
        <div className="container">
          {props.homeData &&
            props.homeData.map((item) => {
              if (item.starred === true) {
                return (
                  <div key={item.id}>
                    <NavLink
                      to={`/list/${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="card"
                        style={{
                          backgroundImage:
                            'url(' + item.prefs.backgroundImage + ')',
                          backgroundColor: item.prefs.backgroundColor,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        <div
                          className="cardName"
                          data-testid="starredBoard"
                          style={{ padding: '.3em' }}
                        >
                          {item.name}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                )
              } else {
                return ''
              }
            })}
        </div>

        <div className="your-Board">
          <strong>
            <span
              className="fa fa-trello"
              style={{ color: 'blue', padding: '1em' }}
            ></span>
            Personal Boards
          </strong>
        </div>

        <div className="container">
          {props.homeData &&
            props.homeData.map((item) => {
              return (
                <div key={item.id}>
                  <NavLink
                    to={`/list/${item.id}`}
                    data-testid="openList"
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="card"
                      style={{
                        backgroundImage:
                          'url(' + item.prefs.backgroundImage + ')',
                        backgroundColor: item.prefs.backgroundColor,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div
                        className="cardName"
                        data-testid="boardName"
                        style={{ padding: '.3em' }}
                      >
                        {item.name}
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            })}
          <div className="create" onClick={props.openModal}>
            <div className="cardName">
              Create board <span className="fa fa-plus"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
HomeCard.propTypes = {
  homeData: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  search: PropTypes.bool,
  searchValue: PropTypes.string
}
export default HomeCard
