import React from 'react'
import { FaExternalLinkAlt, FaTimes } from 'react-icons/fa'

const Menu = ({toggleMenu, changePage, openGithub, activePage, walletState}) => {
  return (
    <div className='menu-big'>
        <div className='content'>
            <button className='close' onClick={()=>{
                toggleMenu(false)
            }}>
                <FaTimes />
            </button>
            <div className='links-holder'>
                <button onClick={()=>{
                    changePage("home")
                    toggleMenu(false)
                }} className={`${activePage==="home"?"active":""} btn`}> Home </button>
                {walletState.connected && <button onClick={()=>{
                    changePage("wallet")
                    toggleMenu(false)
                }} className={`${activePage==="wallet"?"active":""} btn`}> Wallet </button>}
                <button onClick={()=>{
                    openGithub()
                    toggleMenu(false)
                }}> Github <FaExternalLinkAlt /> </button>
            </div>
        </div>
    </div>
  )
}

export default Menu