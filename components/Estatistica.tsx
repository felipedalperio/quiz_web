
import styles from '../styles/Estatistitica.module.css'

interface EstatistiticaProps{
    valor: any
    texto: string
    corFundo?: string
    corFonte?:string
}

export default function Estatistitica(props: EstatistiticaProps){
    return (
        <div className={styles.estatistica}>
                <div className={styles.valor} style={{
                    backgroundColor: props.corFundo ?? '#FDD60F',
                    color:props.corFonte ?? '#333'
                }}>
                        {props.valor}
                </div>

                <div className={styles.texto}>
                        {props.texto}
                </div>
        </div>
    )
}