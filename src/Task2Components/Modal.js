import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import modalImage from './modalImage.jpeg'

function Modal(props) {
  return (
    <div
      className={`modalShowing-${props.modalState}`}
      style={{ opacity: '.9' }}
    >
      <div
        className="modal-content"
        style={{
          backgroundImage: `url(${modalImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="header">
          <label className="label">
            <strong
              data-testid="BoardName"
              style={{ color: '#fff', fontWeight: '800', fontSize: '1.5em' }}
            >
              Add a Board title :
            </strong>
          </label>
          <span className="close-icon" onClick={props.openModal}>
            &times;
          </span>
        </div>
        <div className="footer">
          <input
            type="text"
            className="boardName"
            onChange={props.onHandleChange}
            placeholder="Board Name..."
            data-testid="inputBoardName"
          ></input>
        </div>
        <div>
          <NavLink to="/boards">
            <button
              className="btn"
              onClick={props.multipleFunc}
              data-testid="createBoard"
            >
              Create
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
Modal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  multipleFunc: PropTypes.func
}

export default Modal
