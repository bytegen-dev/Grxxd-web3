import React from 'react'

const Home = ({active}) => {
  return (
    <div className={`home page i ${active ? "active" : ""}`}>
        <div className='content'>
            Home
        </div>
    </div>
  )
}

export default Home