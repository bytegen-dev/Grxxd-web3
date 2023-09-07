import React from 'react'
import { FaDollarSign } from 'react-icons/fa'

const Home = ({active, walletState, connectWallet, disconnectWallet}) => {
  return (
    <div className={`home page i ${active ? "active" : ""}`}>
        <div className='content'>
            {walletState.connected ? <>
                <section className='hero'>
                    <h2>Wallet <span>Connected!</span></h2>
                </section>
                <section className='connect-wallet'>
                    <button onClick={disconnectWallet}> Disconnect Wallet </button>
                </section>
            </> : <>
                <section className='hero'>
                    <h2>Connect your <span>MetaMask</span> wallet</h2>
                </section>
                <section className='connect-wallet'>
                    <button onClick={connectWallet}> Connect Wallet <FaDollarSign size={23} /> </button>
                </section>
            </>}
            <section className='sub'>
                <i>your data is safe with us</i> 🐱‍👤. <i>review our code on</i> <a href='https://github.com/tertiux/Grxxd-web3.git' target="_blank" rel="noreferrer">Github</a>
            </section>
        </div>
    </div>
  )
}

export default Home