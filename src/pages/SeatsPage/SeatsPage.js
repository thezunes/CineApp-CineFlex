import styled from "styled-components"
 import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate} from "react-router-dom";

export default function SeatsPage(props) {


    
    const path=window.location.pathname;
    const parts = path.split('/');  
    const idSessao = parts[2];
    const [assentosFull, setAssentosFull] = useState([])
    const [infoFilme, setInfoFilme] = useState([])
    const [infoSessao, setInfoSessao] = useState([])
    const [assentos, setAssentos] = useState([]) //ARMAZENA OS ASSENTOS DA ARRAY QUE FOI RECEBIDA PELA API
    const [assentoSelecionadoInfo,setAssentoSelecionadoInfo] = useState([]) //ARRAY QUE ARMAZENA OS ASSENTOS SELECIONADOS
    const [cpf, setCpf] = useState('') //ARMAZENA O CPF DO COMPRADOR
    const [nomeComprador, setNomeComprador] = useState('') //ARMAZENA O NOME DO COMPRADOR
    const [idArray,setIdArray] = useState([]);
    const [idAssento, setIdAssento] = useState([]); //ARMAZENA OS IDS DOS ASSENTOS SELECIONADOS

    const text = "";
 

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


    function assentoSelecionado(numeroAssento, id){

        const disponibilidade = numeroAssento - 1;

        if (assentos[disponibilidade].isAvailable) {
            if (!assentoSelecionadoInfo.includes(numeroAssento)) {
              setAssentoSelecionadoInfo([...assentoSelecionadoInfo, numeroAssento]);
              setIdAssento([...idAssento, id])
            } else {
              const novoAssentoSelecionadoInfo = [...assentoSelecionadoInfo];
              let posicao = novoAssentoSelecionadoInfo.indexOf(numeroAssento);
              novoAssentoSelecionadoInfo.splice(posicao, 1);
              setAssentoSelecionadoInfo(novoAssentoSelecionadoInfo);
            }
          } else {
            alert('Esse assento não está disponível');
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

            const objeto = {ids: idAssento , name: nomeComprador, cpf: cpf}
            const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"

            const promise = axios.post(url, objeto);
            promise.then(() => console.log("Pedido finalizado com sucesso"))
            promise.catch((err) => console.log(err.response.data))

            props.setLugarEscolhido(assentoSelecionadoInfo);
            props.setCpfFinal(cpf)
            props.setNomeFinal(nomeComprador)
            props.setFilmeFinal(infoFilme.title)
            props.setSessaoHoraFinal(assentosFull.name)
            props.setSessaoDataFinal(infoSessao.date)
            assentoSelecionadoInfo.map((as) => setIdArray(...idArray, assentos[as-1].id))
            console.log(objeto)
         }

         
         

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
            {assentos.map((a) => 

                <SeatItem 
                disponivel={a.isAvailable}
                onClick={() => assentoSelecionado(a.name, a.id)}
                data-test="seat"
                state = {!a.isAvailable ? "indisponivel" : (assentoSelecionadoInfo.includes(a.name) ? "selecionado" : "diponivel")}
                
                >{a.name}</SeatItem>

            )}
                        </SeatsContainer>

                        {/* disponivel={a.isAvailable}
                state={!seat.isAvailable ? "indisponível" : (selectedSeats.includes(a.id) ? "selecionado" : "disponível")}
                
                } */}


            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle text={text} text="selecionado" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle text={text} text="disponivel"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle text={text} text="indisponivel" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

 

            <FormContainer>
                Nome do Comprador:
                <input data-test="client-name" value={nomeComprador} onChange={nomeDoComprador} placeholder="Digite seu nome..." required />

                CPF do Comprador:
                <input data-test="client-cpf" value={cpf} onChange={cpfComprador} maxlength="14" placeholder="Digite seu CPF..." required />

                 <Link to="/sucesso ">
                <button data-test="book-seat-btn" onClick={finalizar}>Reservar Assento(s)</button>
                </Link>

            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={infoFilme.posterURL} alt={infoFilme.title} />
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
    border: 1px solid ${props => props.text === "selecionado" ? "#0E7D71;" : props.text === "indisponivel" ? "#F7C52B;" : "#7B8B99;"};         
    background-color: ${props => props.text === "selecionado" ? "#1AAE9E" : props.text === "indisponivel" ? "#FBE192" : "#C3CFD9"};    
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

    background-color: ${props => !props.disponivel ? "#FBE192" : 
    (props.state === "disponivel" ? "#1AAE9E" : (props.state === "selecionado" ? "#1AAE9E" : "#C3CFD9"))};
 
    border: 1px solid ${props => !props.disponivel ? "#F7C52B" :
    (props.state === "disponivel" ? "#F7C52B" : (props.state === "selecionado" ? "#0E7D71" : "#808F9D"))};   

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