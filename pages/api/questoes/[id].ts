import questoes from "../bancoDeQuestoes"
export default (req, res) => {
    const idSelecionada =  +req.query.id
   
    const unicaQuestao = questoes.filter(questoes => questoes.id === idSelecionada)

    //verificando se a questão existe
    if(unicaQuestao.length === 1){
          //pegando esse elemento
          const questaoSelecionada = unicaQuestao[0].embaralharRespostas()
          //dando um estatos 200 pq voce conseguiu achar a questao
          res.status(200).json(questaoSelecionada.paraObjeto())
    }else{
      // nao é 404 pq o 404 é pagina nao encontrada
      //204  = sem conteudo
      res.status(204).send()
    } 

  }
   