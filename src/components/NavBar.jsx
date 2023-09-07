import React from 'react'
import {FaExternalLinkAlt } from 'react-icons/fa'
import {GoKebabHorizontal} from 'react-icons/go'

const NavBar = ({changePage, activePage, toggleMenu, openGithub, walletState}) => {
  return (
    <div className='nav-bar'>
        <div className='content'>
            <div className={walletState.connected ? 'logo connected' : 'logo'} onClick={()=>{
                    changePage("home")
            }}></div>
            <div className='links-holder'>
                <button onClick={()=>{
                    changePage("home")
                }} className={`${activePage==="home"?"active":""} btn`}> Home </button>
                {walletState.connected && <button onClick={()=>{
                    changePage("wallet")
                }} className={`${activePage==="wallet"?"active":""} btn`}> Wallet </button>}
                <button onClick={()=>{
                    openGithub()
                }} className="github-btn"> Github <FaExternalLinkAlt /> </button>
            </div>
            <div className='status-btn'>
                <button className={walletState.connected ? "" : 'empty'}>
                    {walletState.state}
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