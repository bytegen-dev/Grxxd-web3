import React from 'react'

const Wallet = ({active}) => {
  return (
    <div className={`wallet page ii ${active ? "active" : ""}`}>
        <div className='content'>
            Wallet
        </div>
    </div>
  )
}

export default Wallet