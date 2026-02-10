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

export function getAll() {
  return lista
}

export function getById(id) {
  return lista.find(p => p.id === id) || null
}

export function validatePersonagemData(data) {
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

export function createPersonagem({ nome, imagem }) {
  const newId = lista.length ? Math.max(...lista.map(p => p.id)) + 1 : 1
  const personagem = { id: newId, nome: nome.trim(), imagem: imagem || '' }
  lista.push(personagem)
  return personagem
}

export function updatePersonagem(id, { nome, imagem }) {
  const index = lista.findIndex(p => p.id === id)
  if (index === -1) return null
  lista[index] = { ...lista[index], nome: nome.trim(), imagem: imagem || '' }
  return lista[index]
}

export function deletePersonagem(id) {
  const index = lista.findIndex(p => p.id === id)
  if (index === -1) return false
  lista.splice(index, 1)
  return true
}
