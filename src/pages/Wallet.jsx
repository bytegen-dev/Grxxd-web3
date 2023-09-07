import React from 'react'
import { FaCopy } from 'react-icons/fa'

const Wallet = ({active, walletState}) => {
    const formattedAddressFirst = walletState.details.address.slice(0, 7)
    const formattedAddressLast = walletState.details.address.slice(-3, -1)
    const formattedAddress = formattedAddressFirst + "..." + formattedAddressLast

    function copyToClipboardWithConfirmation(value) {
        const confirmCopy = window.confirm(`Do you want to copy this Wallet Address to the clipboard?\n\n${value}`);
        
        if (confirmCopy) {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(value)
            console.log('Wallet address copied to clipboard:', value);
            alert('Wallet address copied to clipboard successfully!');
          } else {
            const textarea = document.createElement('textarea');
            textarea.value = value;
            
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
              document.execCommand('copy');
              console.log('Wallet address copied to clipboard (fallback):', value);
              alert('Wallet address copied to clipboard successfully (fallback)!');
            } catch (err) {
              console.error('Failed to copy text to clipboard (fallback):', err);
              alert('Failed to copy text to clipboard (fallback).');
            } finally {
              document.body.removeChild(textarea);
            }
          }
        } else {
          alert('User closed Dialog');
        }
    }
            
  return (
    <div className={`wallet page ii ${active ? "active" : ""}`}>
        <div className='content'>
            <section className='wallet-info'>
                <h2>Wallet Info</h2>
                <div className='bubble-holder'>
                    <div className='bubble'></div>
                </div>
                <div className='address'>
                    <span>{formattedAddress}</span><button onClick={()=>{
                        copyToClipboardWithConfirmation(walletState.details.address)
                    }}><FaCopy /></button>
                </div>
                <div className='container'>
                    <div className='info'>
                        <div className='type'>
                            Balance
                        </div>
                        <div className='span'>
                            ~
                        </div>
                        <div className='value'>
                            <span>{walletState.details.balance ? walletState.details.balance : "..."}</span>
                            <button>ETH</button>
                        </div>
                    </div>
                    <div className='info'>
                        <div className='type'>
                            Network
                        </div>
                        <div className='span'>
                            ~
                        </div>
                        <div className='value'>
                            <p>{walletState.details.network ? walletState.details.network: "..."}</p>
                        </div>
                    </div>
                    <div className='info'>
                        <div className='type'>
                            Provider
                        </div>
                        <div className='span'>
                            ~
                        </div>
                        <div className='value b'>
                            <p>{walletState.details.provider ? walletState.details.provider : "..."}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Wallet