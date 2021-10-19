
import { useEffect, useState } from 'react'
import Questao from '../components/Questao'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'
import Botao from '../components/Botao'
import Questionario from '../components/Questionario'
import questoes from './api/bancoDeQuestoes'
import { useRouter  } from 'next/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [ questao,setQuestao] = useState<QuestaoModel>()
  const [ idsDasQuestoes,setIdsDasQuestoes] = useState<number[]>([])
  const [ respostasCertas,setRespostasCertas] = useState<number>(0)

    async function carregarIdsDasQuestoes() {
        const resp = await fetch(`${BASE_URL}/questionario`)
        const idsDasQuestoes = await resp.json()
        setIdsDasQuestoes(idsDasQuestoes)
    }

    async function carregarQuestoes(idQuestao : number) {
      const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
      const json = await resp.json()
      const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
      setQuestao(novaQuestao)
  }

    useEffect(()=>{
      carregarIdsDasQuestoes()
    },[ ])

    useEffect(()=>{
      idsDasQuestoes.length > 0 && carregarQuestoes(idsDasQuestoes[0])
    },[idsDasQuestoes ])

    function questaoRespondida(questaoRespondida : QuestaoModel){
            setQuestao(questaoRespondida)
            const acertou = questaoRespondida.acertou
            setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
    }

    function idProximaPergunta(){
      if(questao){
          const proximoIndice =  idsDasQuestoes.indexOf(questao.id) + 1
          return idsDasQuestoes[proximoIndice]
      }
    }

    function irPraProximoPasso(){
      const proximoId = idProximaPergunta()
      //se o proximo id for valido ou seja for diferente de nulo >
      proximoId ? irPraProximaQuestao(proximoId) : finalizar()
    }

    function irPraProximaQuestao(proximoId : number){
        carregarQuestoes(proximoId)
    }

    function finalizar(){
        router.push({
          pathname: "/resultado",
          query:{
            total: idsDasQuestoes.length,
            certas : respostasCertas
          }
        })
    }

  return questao ? (
        <Questionario 
                questao = {questao}
                ultima={idProximaPergunta() === undefined}
                questaoRespondida = {questaoRespondida}
                irPraProximoPasso = {irPraProximoPasso}
        />
  ) : false
}
