import * as model from '../models/personagemModel.js'

export function list(req, res) {
  res.json(model.getAll())
}

export function getById(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  const personagem = model.getById(id)
  if (!personagem) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  res.json(personagem)
}

export function create(req, res) {
  const { nome, imagem } = req.body

  const validation = model.validatePersonagemData({ nome, imagem })
  if (!validation.valid) {
    return res.status(400).json({ erro: validation.error })
  }

  const personagem = model.createPersonagem({ nome, imagem })

  res.status(201).json({
    mensagem: 'Personagem criado com sucesso',
    personagem
  })
}

export function update(req, res) {
  const id = Number(req.params.id)
  const { nome, imagem } = req.body

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  const existing = model.getById(id)
  if (!existing) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  const validation = model.validatePersonagemData({ nome, imagem })
  if (!validation.valid) {
    return res.status(400).json({ erro: validation.error })
  }

  const personagem = model.updatePersonagem(id, { nome, imagem })

  res.json({
    mensagem: 'Personagem atualizado com sucesso',
    personagem
  })
}

export function remove(req, res) {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' })
  }

  const existing = model.getById(id)
  if (!existing) {
    return res.status(404).json({ erro: 'Personagem não encontrado' })
  }

  model.deletePersonagem(id)

  res.json({ mensagem: 'Personagem deletado com sucesso' })
}
