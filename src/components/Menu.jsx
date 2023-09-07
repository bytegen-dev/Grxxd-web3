import React from 'react'
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa'

const Menu = ({toggleMenu, changePage}) => {
  return (
    <div className='menu-big'>
        <div className='content'>
            <button className='close' onClick={()=>{
                toggleMenu(false)
            }}>
                <FaTimes />
            </button>
            <div className='links-holder'>
                <button> Home </button>
                <button> Wallet </button>
                <button> Github <FaExternalLinkAlt /> </button>
            </div>
        </div>
    </div>
  )
}

export default Menu