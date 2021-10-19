import RespostaModel from "../model/resposta";
import style from '../styles/Resposta.module.css'

interface RespostaProps{
    valor: RespostaModel
    indice: number
    letra: string
    corFundoLetra: string
    respostaFornecida: (indice : number) => void
}

export default function Resposta(props: RespostaProps){
        const resposta = props.valor
        //verificando se a resposta foi revelada:
        const respostaRevelada = resposta.revelada ? style.respostaRevelada : ''
        return(
            <div className={style.resposta} 
                        onClick={( ) => props.respostaFornecida(props.indice)}>
                    <div className={`${respostaRevelada} ${style.conteudoResposta }`}>
                       
                                <div className={style.frente}>
                                <div className={style.letra} style={{backgroundColor: props.corFundoLetra}}>
                                        {props.letra}
                                </div>
                                <div className={style.valor}>
                                        {resposta.valor}
                                </div>
                                </div> 
                     
                                <div className={style.verso}>
                                        {resposta.certa ? (
                                                <div className={style.certa}>
                                                <div>A resposta certa é ...</div>
                                                <div className={style.valor}>{resposta.valor}</div>
                                                </div>
                                        ) :(
                                                <div className={style.errada}>
                                                <div>A resposta informada está errada...</div>
                                                <div className={style.valor}>{resposta.valor}</div>
                                                </div>
                                        )}
        
                                </div>
                     
                         
                        
                    </div>
                    
            </div>
        )
}