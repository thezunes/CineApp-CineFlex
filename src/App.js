import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";

 const filmeSelecionado = [];
 
export default function App() {



    return (
        <BrowserRouter>

           <NavContainer>CINEFLEX</NavContainer>

            <Routes> 
            
                <Route path="/" element={<HomePage filmeSelecionado = {filmeSelecionado}/>}/>
            <Route path="/seatspage" element={<SeatsPage/> }/>
            <Route path="/sessions/:idFilme" element={<SessionsPage/> }/>
            <Route path="/final" element={<SuccessPage/> }/>

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
  


