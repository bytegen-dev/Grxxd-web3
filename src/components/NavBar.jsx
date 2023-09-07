import React from 'react'
import {FaExternalLinkAlt, FaPlus} from 'react-icons/fa'
import {GoKebabHorizontal} from 'react-icons/go'

const NavBar = ({changePage, activePage, toggleMenu}) => {
  return (
    <div className='nav-bar'>
        <div className='content'>
            <div className='logo'></div>
            <div className='links-holder'>
                <button> Home </button>
                <button> Wallet </button>
                <button> Github <FaExternalLinkAlt /> </button>
            </div>
            <div className='status-btn'>
                <button>
                    Connect <FaPlus />
                </button>
                <button className='hamburger' onClick={()=>{
                    toggleMenu(true)
                }}>
                    <GoKebabHorizontal />
                </button>
            </div>
        </div>
    </div>
  )
}

export default NavBar