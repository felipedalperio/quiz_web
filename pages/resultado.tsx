
import Estatistitica from "../components/Estatistica"
import styles from '../styles/Resultado.module.css'
import Botao from "../components/Botao"
import {useRouter} from "next/router"


export default function resultado(){
 
    const router =  useRouter()

    const total = +router.query.total
    const certas = +router.query.certas
    const percentual = Math.round((certas / total) * 100)

        return (
         <div  className={styles.resultado}>
             <h1> Resultado Final</h1>
             <div style={{display:"flex"}}>
                    <Estatistitica texto ="Perguntas" valor ={total} />
                    <Estatistitica texto ="Certas" valor ={certas} corFundo="#9CD2A4"/>
                    <Estatistitica texto ="Percentual" valor ={`${percentual}%`}  corFundo="#DE6A33" />
             </div> 

             <Botao href="/" texto="Tentar novamente" />
             
         </div>
     )
}