import styled from "styled-components"
 import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

export default function SeatsPage(props) {


    const [color, setColor] = useState('');
    const {idSessao2} = useParams()
    const path=window.location.pathname;
    const parts = path.split('/');  
    const idSessao = parts[2];
    const [assentosFull, setAssentosFull] = useState([])
    const [infoFilme, setInfoFilme] = useState([])
    const [infoSessao, setInfoSessao] = useState([])
    const [assentos, setAssentos] = useState([])
    const [assentoSelecionadoInfo,setAssentoSelecionadoInfo] = useState([]) //ARRAY QUE ARMAZENA OS ASSENTOS SELECIONADOS
    const [cpf, setCpf] = useState('') //ARMAZENA O CPF DO COMPRADOR
    const [nomeComprador, setNomeComprador] = useState('') //ARMAZENA O NOME DO COMPRADOR


    const [buttonColor, setButtonColor] = useState('blue');

    const handleClick = () => {
      setButtonColor('#000000')
        ;
    };

    useEffect(() => { 
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)
        promise.then(res => setAssentosFull(res.data))
        promise.then(res => setAssentos(res.data.seats))
        promise.catch(err => alert(`Houve um erro na requisição dos dados. ${err}`))
        }, [])

    useEffect(() => { 
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(url)
        promise.then(res => setInfoFilme(res.data.movie))
        promise.then(res => setInfoSessao(res.data.day))
        promise.catch(err => alert(`Houve um erro na requisição dos dados. ${err}`))
        }, [])


        function assentoSelecionado(numeroAssento){

        if(!assentoSelecionadoInfo.includes(numeroAssento)){
            setAssentoSelecionadoInfo([...assentoSelecionadoInfo, numeroAssento])
        } else {
            let posicao = assentoSelecionadoInfo.indexOf(numeroAssento)
            assentoSelecionadoInfo.splice(posicao, 1);
        }
        }


        function cpfComprador(c) {
            
            let value = c.target.value;
            value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
            c.target.value = value;
            setCpf(value);

          }

        function nomeDoComprador(n) {
            setNomeComprador(n.target.value);
          }

    
        function finalizar(){
            props.setLugarEscolhido(assentoSelecionadoInfo);
            props.setCpfFinal(cpf)
            props.setNomeFinal(nomeComprador)
            props.setFilmeFinal(infoFilme.title)
            props.setSessaoHoraFinal(assentosFull.name)
            props.setSessaoDataFinal(infoSessao.weekday)
            
            console.log(props.lugarEscolhido)
        }
          

 
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
            {assentos.map((a) => 

                <SeatItem color={buttonColor} onClick={handleClick} onClick={ () => assentoSelecionado(a.name)} >{a.name}</SeatItem>

            )}
                        </SeatsContainer>

            

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

 

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" value={nomeComprador} onChange={nomeDoComprador} placeholder="Digite seu nome..." required />

                CPF do Comprador:
                <input data-test="client-cpf" value={cpf} onChange={cpfComprador} maxlength="14" placeholder="Digite seu CPF..." required />

                <Link to={'/final'}> 
                
                <button data-test="book-seat-btn" onClick={finalizar}>Reservar Assento(s)</button>

                </Link>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={infoFilme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{infoFilme.title}</p>
                    <p>{infoSessao.weekday} - {assentosFull.name}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }
    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`