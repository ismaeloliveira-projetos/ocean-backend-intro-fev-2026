import express from 'express'

const app = express()

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
  res.send(personagens)
})
app.get('/personagens/:id', (req, res) => {
  const id= req.params.id

  const personagem = lista[id - 1]

  res.send(personagem)
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
