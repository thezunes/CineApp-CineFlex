import styled from "styled-components"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";



export default function HomePage(props) {

    const {idFilme} = useParams()
    const [listaFilmes, setListaFilmes] = useState([]);

    function teste() {
        console.log("teste")
    }


    useEffect(() => { 
        const promise = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
        promise.then((res) => { 
        setListaFilmes(res.data)
        res.data = props.filmeSelecionado
        console.log(props.filmeSelecionado)
         })
        }, [])
   
    
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                { listaFilmes.map((img) => 
                <Link to={`/sessions/${img.id}`} >
                
                <MovieContainer>
                    <img onClick={teste} src={img.posterURL} alt={img.title} key={img.id} />

                </MovieContainer>

                </Link>
                )}
            </ListContainer>

        </PageContainer>
    )
}


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`