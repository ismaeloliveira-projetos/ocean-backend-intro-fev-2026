import express from 'express'
import personagensRoutes from './routes/personagens.js'
import { getAll } from './models/personagemModel.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/oi', (req, res) => {
  res.send('olá, mundoo!!')
})

app.get('/lista', (req, res) => {
  res.json(getAll())
})

app.use('/personagens', personagensRoutes)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
