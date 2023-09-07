import "../src/index.scss"
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import Web3 from "web3";
// import {Web3} from "web3"

function App() {
  //UI stuff and management
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

  //Functions and state
  const [walletState, setWalletState] = useState({
    state: "Disconnected",
    connected: false,
    details: {
      address: "...",
      balance: "...",
      blockChain: "...",
      network: "...",
      provider: "...",
    },
  })

  const [web3, setWeb3] = useState(null)

  useEffect(()=>{
    // Check if MetaMask is installed and accessible
    if (typeof window.ethereum !== 'undefined') {
      // Create a web3 instance using the current provider
      const web3 = new Web3(window.ethereum);
      setWeb3(web3)
      getCurrentWalletConnected()
    } else{
      console.error("Metamask is not installed")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const connectWallet = async () =>{
    setWalletState((prev)=>{
      return ({
        ...prev,
        state: "Connecting",
      }) 
    })

    //Checking if window.ethereum is available
    if (window.ethereum) {
      try {
        // Requesting wallet connection
        const data = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(data)
  
        // Getting the user's address
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const address = accounts[0];
  
        // Getting the wallet balance
        let etherBalance = "..."
        if(web3.eth){
          const balanceWei = await web3.eth.getBalance(address);
          if(balanceWei){
            etherBalance = web3.utils.fromWei(balanceWei, 'ether'); 
          }
        }
  
        // // Getting network info
        let networkType = "..."

        if(web3.eth.net.getNetworkType){
          networkType = await web3.eth.net?.getNetworkType();
        }
  
        // // I'm setting wallet state here
        // //Added setTimeout to give the browser breathing space

        setTimeout(()=>{
          setWalletState((prev)=>{
            return({
              ...prev,
              state: 'Connected',
              connected: true,
              details: {
                address: address?address:"",
                balance: etherBalance?etherBalance:"....",
                blockChain: "eth",
                network: networkType?networkType:"...",
                provider: window.ethereum.isMetaMask ? 'MetaMask' : 'Unknown',
              },
            })
          });

          setActivePage("wallet")
        }, 500)
  
      } catch (error) {
        //Handling errors
        getCurrentWalletConnected()
        console.error('Error connecting wallet:', error);

        setTimeout(()=>{
          setWalletState({
            state: "Disconnected",
            connected: false,
            details: {
              address: "",
              balance: "",
              blockChain: "",
              network: "",
              provider: "",
            },
          })
        }, 1000)
        
      }
    } else {
      console.log('No wallet provider detected');
      setTimeout(()=>{
        setWalletState({
          state: "Disconnected",
          connected: false,
          details: {
            address: "",
            balance: "",
            blockChain: "",
            network: "",
            provider: "",
          },
        })
      }, 1000)
    }
  }

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const address = accounts[0]
          // Getting the wallet balance
        let etherBalance = "..."
        if(web3.eth){
          const balanceWei = await web3.eth.getBalance(address);
          if(balanceWei){
            etherBalance = web3.utils.fromWei(balanceWei, 'ether'); 
          }
        }
  
        // // Getting network info
        let networkType = "..."

        if(web3.eth?.net.getNetworkType){
          networkType = await web3.eth.net?.getNetworkType();
        }
          setTimeout(()=>{
            setWalletState((prev)=>{
              return({
                ...prev,
                state: 'Connected',
                connected: true,
                details: {
                  address: address?address:"",
                  balance: etherBalance?etherBalance: "...",
                  blockChain: 'Eth',
                  network: networkType?networkType:"...",
                  provider: window.ethereum.isMetaMask ? 'MetaMask' : 'Unknown',
                },
              })
            });
          }, 1000)
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
        // connectWallet()
        setTimeout(()=>{
          setWalletState((prev)=>{
            return ({
              ...prev
            })
          })
        }, 1000)
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
      setTimeout(()=>{
        setWalletState({
          state: "Disconnected",
          connected: false,
          details: {
            address: "",
            balance: "",
            blockChain: "",
            network: "",
            provider: "",
          },
        })
      }, 1000)
    }
  };
  
  const disconnectWallet = async ()=>{
    setWalletState((prev)=>{
      return ({
        ...prev,
        state: "Disconnecting",
        connected: true,
      })
    })
    setTimeout(()=>{
      setWalletState({
        state: "Disconnected",
        connected: false,
        details: {
          address: "",
          balance: "",
          blockChain: "",
          network: "",
          provider: "",
        },
      })

      setActivePage("home")
    }, 1000)
  }

  const disconnectWalletX = ()=>{
    const confirm = window.confirm("Watch a youtube video to learn to disconnect your Wallet?")
    if(confirm){
      window.open("https://www.youtube.com/results?search_query=How+to+disconnect+crypto+wallet+from+a+website", "_blank")
    }
  }

  const openGithub = ()=>{
    window.location.href = "https://github.com/tertiux"
  }

  useEffect(() => {
    async function addWalletListener() {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try{
          window.ethereum.on("accountsChanged", (accounts) => {
            // const address = accounts[0]
    
                setTimeout(()=>{
                  setWalletState({
                    state: "Disconnected",
                    connected: false,
                    details: {
                      address: "",
                      balance: "",
                      blockChain: "",
                      network: "",
                      provider: "",
                    },
                  })
                }, 100)
            });
          } catch{
            setActivePage("home")
            setTimeout(()=>{
              setWalletState({
                state: "Disconnected",
                connected: false,
                details: {
                  address: "",
                  balance: "",
                  blockChain: "",
                  network: "",
                  provider: "",
                },
              })
            }, 1000)
        }
      } else {
        /* MetaMask is not installed */
        setActivePage("home")
        setTimeout(()=>{
          setWalletState({
            state: "Disconnected",
            connected: false,
            details: {
              address: "",
              balance: "",
              blockChain: "",
              network: "",
              provider: "",
            },
          })
        }, 1000)
        console.log("Please install MetaMask");
      }
    };

    addWalletListener()

  }, [walletState.details.address]);

  return (
    <div className={`app ${showMenu ? "show-menu": ""} ${walletState.connected ? "connected": ""} ${(walletState.state === "Connecting"||walletState.state === "Disconnecting")?"opacitate":""}`}>
      {/* components first */}
      <NavBar changePage={changePage} activePage={activePage} toggleMenu={toggleMenu} walletState={walletState} openGithub={openGithub} />
      <Menu changePage={changePage} activePage={activePage} toggleMenu={toggleMenu} openGithub={openGithub} walletState={walletState} />

      {/* pages next */}
      <Home connectWallet={connectWallet} disconnectWallet={disconnectWalletX} walletState={walletState} active={activePage === "home"} />
      <Wallet connectWallet={connectWallet} disconnectWallet={disconnectWallet} walletState={walletState} active={activePage === "wallet"} />
    </div>
  );
}

export default App;
