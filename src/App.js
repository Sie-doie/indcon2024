import NavbarComp from "./Components/Navbar/NavbarComp";
// importing aos
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import PreEvents from "./Components/PreEvents";
import Footer from "./Components/Footer";
import ScrollTopBtn from "./Components/Others/ScrollTopBtn";
import About from "./Components/About";
import { Route, Routes } from "react-router-dom";
import NavbarCarousel from './Components/Navbar/NavbarCarousel';
import Team from "./Components/Team";
import Gallery from "./Components/Gallery";
import Admin from "./Components/Admin";
import FooterCountDown from "./Components/Footer/FooterCountDown";
import "./App.css"
import ContextProvider from "./assests/Contextprovider";
import { useState } from "react";
import { images_url } from "./assests/DataBase";


function App() {
  useEffect(() => {
    AOS.init();
  }, [])

  function NavbarCountDown() {
    return (
      <div style={{background:"url('../../../public/navbar images/countdownBackround.jpg');"}} className="d-flex justify-content-center align-items-center NavbarCountDown pt-3">
        <FooterCountDown />
      </div>
    )
  }


  const NavFooterComp = () => {
    
    const [indconlogo,setIndconlogo] = useState(null)
    useEffect(() => {
      localStorage.getItem('theme') == 'dark' && document.querySelector('html').classList.add('dark-theme')
      localStorage.getItem('theme') == 'dark' ? setIndconlogo(images_url+'navbar images/indcon logo dark.png') : setIndconlogo(images_url+'navbar images/indcon logo.png')
    },[])
    return (
      <ContextProvider.Provider value={{indconlogo,setIndconlogo}}>
        <NavbarComp />
        <div className="ps-md-5 pe-md-5" style={{ backgroundColor: 'var(--brand-light-col)',position:'relative' }}>
          <Routes>
            <Route path="/" element={<NavbarCarousel />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<PreEvents />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* <Route path="/paytm" element={<PaytmPay />} /> */}
            <Route path="*" element={<NavbarCarousel />} />
          </Routes>
        </div>
        <Footer />
      </ContextProvider.Provider>
    )
  }

  return (
    <div className="AppClass">
      {document.readyState === 'interactive' &&
        <>
          <Routes>
            <Route path="/*" element={<NavFooterComp />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
          <ScrollTopBtn />
        </>}

    </div>
  );
}

export default App;