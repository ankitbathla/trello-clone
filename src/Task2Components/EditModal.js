import React from 'react'
import PropTypes from 'prop-types'
import modalImage from './modalImage.jpeg'

function EditModal(props) {
  return (
    <div
      className={`modalShowing-${props.activeModal}`}
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
              data-testid="cardName"
              style={{ color: '#fff', fontWeight: '800', fontSize: '1.5em' }}
            >
              New CardName:
            </strong>
          </label>
          <span className="close-icon" onClick={props.activeEditModal}>
            &times;
          </span>
        </div>
        <div className="footer">
          <input
            type="text"
            className="boardName"
            data-testid="changeName"
            id="changeCardName"
            onChange={props.onHandleChange}
          ></input>
        </div>
        <div>
          <button
            className="btn"
            data-testid="edit-name"
            onClick={props.onsubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

EditModal.propTypes = {
  activeModal: PropTypes.bool.isRequired,
  activeEditModal: PropTypes.func.isRequired,
  cardNewId: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired,
  onsubmit: PropTypes.func.isRequired
}

export default EditModal
