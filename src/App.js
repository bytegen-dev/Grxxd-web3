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
  return (
    <div className={`app ${showMenu ? "show-menu": ""}`}>
      {/* components first */}
      <NavBar changePage={changePage} activePage={activePage} toggleMenu={toggleMenu} />
      <Menu changePage={changePage} activePage={activePage} toggleMenu={toggleMenu}/>

      <Home active={activePage === "home"} />
      <Wallet active={activePage === "wallet"} />
    </div>
  );
}

export default App;
