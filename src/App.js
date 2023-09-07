import "../src/index.scss"
import { useState } from "react";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [showMenu, setShowMenu] = useState(false)
  const changePage = (page)=>{
    if(page){
      setActivePage(page)
    } else{
      console.log("Didn't find page")
    }
  }
  const toggleMenu = (value)=>{
    if(value){
      setShowMenu(value)
    } else{
      setShowMenu(false)
    }
  }
  const [walletState, setWalletState] = useState({
    state: "Disconnected",
    connected: false,
    details: {
      address: "0x8126171fgDuax6F1Ebr7J3",
      balance: "0.049",
      blockChain: "btc",
      network: "bitcoin main",
      provider: "metamask",
    },
  })

  const connectWallet = () =>{
    setWalletState(()=>{
      return ({
        state: "Connecting",
        connected: false,
        details: {
          address: "...",
          balance: "...",
          blockChain: "...",
          network: "...",
          provider: "....",
        },
      }) 
    })
    
    setTimeout(()=>{
      setWalletState(()=>{
        return ({
          state: "Connected",
          connected: true,
          details: {
            address: "0x8126171fgDuax6F1Ebr7J3",
            balance: "0.049",
            blockChain: "btc",
            network: "bitcoin main",
            provider: "metamask",
          },
        }) 
      })

      setActivePage("wallet")
    }, 1500)
  }
  
  const disconnectWallet = ()=>{
    setWalletState((prev)=>{
      return ({
        ...prev,
        state: "Disconnecting",
      }) 
    })
    
    setTimeout(()=>{
      setWalletState(()=>{
        return ({
          state: "Disconnected",
          connected: false,
          details: {
            address: "...",
            balance: "...",
            blockChain: "...",
            network: ".....",
            provider: "......",
          },
        }) 
      })
    }, 1500)
    
  }

  const openGithub = ()=>{
    window.location.href = "https://github.com/tertiux"
  }

  return (
    <div className={`app ${showMenu ? "show-menu": ""} ${(walletState.state === "Connecting"||walletState.state === "Disconnecting")?"opacitate":""}`}>
      {/* components first */}
      <NavBar changePage={changePage} activePage={activePage} toggleMenu={toggleMenu} walletState={walletState} openGithub={openGithub} />
      <Menu changePage={changePage} activePage={activePage} toggleMenu={toggleMenu} openGithub={openGithub} walletState={walletState} />

      {/* pages next */}
      <Home connectWallet={connectWallet} disconnectWallet={disconnectWallet} walletState={walletState} active={activePage === "home"} />
      <Wallet connectWallet={connectWallet} disconnectWallet={disconnectWallet} walletState={walletState} active={activePage === "wallet"} />
    </div>
  );
}

export default App;
