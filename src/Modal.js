import React from 'react'
import { createPortal } from 'react-dom';


const MODAL_STYLES = {
    position: 'fixed',
    top: '5%',
    left: '5%',
    backgroundColor: 'rgb(34,34,34',
    transforn: 'translate(-50%, -50%',
    zIndex: 100,
    height: '90%',
    width: '90%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 100
}

const Modal = ({ children, onClose }) => {
    return (
        <div style={OVERLAY_STYLES}>
            {createPortal(
                <div style={MODAL_STYLES}>
                    <button className='btn bg-danger fs-4' style={{ marginLeft: '90%', marginTop: '-35px' }} onClick={onClose}> X </button>
                    {children}

                </div>,

                document.getElementById('cart-root')
            )}
        </div>

    )
}

export default Modal