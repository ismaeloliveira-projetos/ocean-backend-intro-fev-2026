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

function isValidUrl(str) {
  try {
    new URL(str)
    return true
  } catch (err) {
    return false
  }
}

function validatePersonagemData(data) {
  const { nome, imagem } = data || {}

  if (!nome || typeof nome !== 'string' || !nome.trim()) {
    return { valid: false, error: 'Nome é obrigatório' }
  }

  if (imagem !== undefined && imagem !== null && imagem !== '') {
    if (typeof imagem !== 'string' || !isValidUrl(imagem)) {
      return { valid: false, error: 'Imagem deve ser uma URL válida' }
    }
  }

  return { valid: true }
}


app.get('/lista', (req, res) => {
  res.json(lista)
})


app.get('/personagens/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  const personagem = lista.find(p => p.id === id)

  if (!personagem) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  res.json(personagem)
})


app.post('/personagens', (req, res) => {
  const { nome, imagem } = req.body

  const validation = validatePersonagemData({ nome, imagem })
  if (!validation.valid) {
    return res.status(400).json({ erro: validation.error })
  }

  const newId = lista.length ? Math.max(...lista.map(p => p.id)) + 1 : 1
  const personagem = { id: newId, nome: nome.trim(), imagem: imagem || '' }

  lista.push(personagem)

  res.status(201).json({
    mensagem: 'Personagem criado com sucesso',
    personagem
  })
})

app.put('/personagens/:id', (req, res) => {
  const id = Number(req.params.id)
  const { nome, imagem } = req.body

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  const index = lista.findIndex(p => p.id === id)
  if (index === -1) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  const validation = validatePersonagemData({ nome, imagem })
  if (!validation.valid) {
    return res.status(400).json({ erro: validation.error })
  }

  lista[index] = { ...lista[index], nome: nome.trim(), imagem: imagem || '' }

  res.json({
    mensagem: 'Personagem atualizado com sucesso',
    personagem: lista[index]
  })
})

app.delete('/personagens/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  const index = lista.findIndex(p => p.id === id)
  if (index === -1) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  lista.splice(index, 1)

  res.json({ mensagem: 'Personagem deletado com sucesso' })
} )

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
