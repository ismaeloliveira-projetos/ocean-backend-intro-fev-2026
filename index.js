import express from 'express'

const app = express()


app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/oi', (req, res) => {
  res.send('olá, mundoo!!')
})


const lista = [
  { id: 1, nome: 'Rick Sanchez', imagem: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
  { id: 2, nome: 'Morty Smith', imagem: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
  { id: 3, nome: 'Summer Smith', imagem: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
  { id: 4, nome: 'Beth Smith', imagem: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg' },
  { id: 5, nome: 'Jerry Smith', imagem: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg' }
]


app.get('/lista', (req, res) => {
  res.json(lista)
})


app.get('/personagens/:id', (req, res) => {
  const id = Number(req.params.id)

  const personagem = lista[id - 1]

  if (!personagem) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  res.json(personagem)
})


app.post('/personagens', (req, res) => {
  const { nome } = req.body

  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' })
  }

  lista.push(nome)

  res.status(201).json({
    mensagem: 'Personagem criado com sucesso',
    personagem: nome
  })
})

app.put('/personagens/:id', (req, res) => {
  const id = req.params.id
  const nomeAtualizado = req.body.nome
  
  if (!lista[id - 1]) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  lista[id - 1] = nomeAtualizado

  res.json({
    mensagem: 'Personagem atualizado com sucesso',
    personagem: nomeAtualizado
  })
})

app.delete('/personagens/:id', (req, res) => {
  const id = req.params.id

  lista.splice(id - 1, 1)

  res.json({ mensagem: 'Personagem deletado com sucesso' })
} )

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
