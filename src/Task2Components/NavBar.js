import React, { useState } from 'react'
import logo from '../trello.png'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

function NavBar(props) {
  const [searchBar, setSearchBar] = useState(false)
  const click = () => {
    setSearchBar(!searchBar)
    props.searchState(!searchBar)
  }
  const closeSearch = () => {
    setSearchBar(!searchBar)
    props.searchState(!searchBar)
    document.getElementById('searchInput').value = ''
  }
  return (
    <div className="nav">
      <div className="nav-left">
        <NavLink
          to="/boards"
          data-testid="boards"
          style={{ textDecoration: 'none' }}
        >
          <div className="box">
            <div className="icon">
              <div className="text" data-testid="home">
                Home
              </div>
              <strong>
                <i className="fa fa-home home fa-lg"></i>
              </strong>
            </div>
          </div>
        </NavLink>
        <NavLink to="/boards" style={{ textDecoration: 'none' }}>
          <div className="box">
            <div className="icon">
              <div className="text">Boards</div>
              <strong>
                <i className="fa fa-trello trello fa-lg"></i>
              </strong>
            </div>
          </div>
        </NavLink>
        <NavLink to="/boards" style={{ textDecoration: 'none' }}>
          <div className="box">
            <div className={`search-${searchBar}`}>
              <input
                type="text"
                placeholder="search Board..."
                className="search-input"
                onChange={props.onSearchChange}
                id="searchInput"
                data-testid="searchInput"
              ></input>
              <span
                className="fa fa-times cross-icon"
                data-testid="closeSearch"
                onClick={closeSearch}
              ></span>
            </div>
            <div className={`search-icon-${searchBar}`}>
              <div className="icon" onClick={click} data-testid="onSearch">
                <div className="text">Search</div>
                <strong>
                  <i className="fa fa-search search fa-lg"></i>
                </strong>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
      <NavLink to="/home" style={{ textDecoration: 'none' }}>
        <img src={logo} className="logo"></img>
      </NavLink>
      <div className="nav-right">
        <NavLink to="/boards" style={{ textDecoration: 'none' }}>
          <div className="box" onClick={props.openModal} data-testid="newBoard">
            <div className="icon">
              <div className="text">New Board</div>
              <strong>
                <i className="fa fa-plus-square plus fa-lg"></i>
              </strong>
            </div>
          </div>
        </NavLink>
        <div className="box sign-in">
          <div className="icon">
            <div className="text">notif</div>
            <strong>
              <i className="fa fa-bell fa-lg"></i>
            </strong>
          </div>
        </div>
        <div className="box sign-in">
          <div className="icon">
            <div className="text">Signin</div>
            <strong>
              <i className="fa fa-sign-in fa-lg"></i>
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}
NavBar.propTypes = {
  openModal: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func,
  searchState: PropTypes.bool
}
export default NavBar
