import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'


 const filmeSelecionado = [];
 
export default function App() {

    const [lugarEscolhido, setLugarEscolhido] = useState([]);
    const [cpfFinal, setCpfFinal] = useState("");
    const [nomeFinal, setNomeFinal] = useState("");
    const [filmeFinal, setFilmeFinal] = useState("");
    const [sessaoHoraFinal, setSessaoHoraFinal] = useState("");
    const [sessaoDataFinal, setSessaoDataFinal] = useState("");





    console.log(lugarEscolhido)

    return (
        <BrowserRouter>

           <NavContainer>CINEFLEX</NavContainer>

            <Routes> 
            
            <Route path="/" element={<HomePage filmeSelecionado = {filmeSelecionado}/>}/>
            <Route path="/seatspage/:idSessao2" element={<SeatsPage 
            lugarEscolhido = {lugarEscolhido} 
            setLugarEscolhido={setLugarEscolhido}
            
            nomeFinal = {nomeFinal} 
            setNomeFinal = {setNomeFinal} 
            cpfFinal = {cpfFinal} 
            setCpfFinal = {setCpfFinal}
            filmeFinal = {filmeFinal} 
            setFilmeFinal = {setFilmeFinal}
            setSessaoHoraFinal = {setSessaoHoraFinal}
            setSessaoDataFinal = {setSessaoDataFinal}
            /> }/>

            <Route path="/sessions/:idFilme" element={<SessionsPage setLugarEscolhido={setLugarEscolhido} /> }/>
            <Route path="/final" element={<SuccessPage lugarEscolhido={lugarEscolhido} 
             nomeFinal = {nomeFinal}
             cpfFinal = {cpfFinal} 
             filmeFinal = {filmeFinal} 
             setSessaoHoraFinal = {setSessaoHoraFinal}
             setSessaoDataFinal = {setSessaoDataFinal}
             sessaoHoraFinal = {sessaoHoraFinal}
             sessaoDataFinal = {sessaoDataFinal}
             setFilmeFinal = {setFilmeFinal}
            /> }/>
            
            
            </Routes>
            
              
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
  



