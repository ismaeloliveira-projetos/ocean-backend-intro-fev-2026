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
  'Rick Sanchez',
  'Morty Smith',
  'Summer Smith',
  'Beth Smith',
  'Jerry Smith'
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

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
