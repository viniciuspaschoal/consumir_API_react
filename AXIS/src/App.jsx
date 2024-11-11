import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'Axios'

function App() {

  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [CEP, setCEP] = useState('')

  function alterarCEP(e) {
    setCEP(e.target.value) // Armazena o valor do CEP, não o comprimento
  }

  function verificarCep(e) {
    e.preventDefault() // Evita o comportamento padrão de recarregar a página

    if (CEP.length === 8) { // Verifica se o CEP tem 8 caracteres
      axios.get(`https://brasilapi.com.br/api/cep/v1/${CEP}`)
        .then(function (response) {
          setRua(response.data.street)
          setBairro(response.data.neighborhood)
          setCidade(response.data.city)
          setEstado(response.data.state)
        })
        .catch(function () {
          alert('ERRO! CEP não identificado')
        })
    } else {
      alert('CEP deve conter 8 dígitos')
    }
  }

  return (
    <>
      <form>
        <input type="text" name="cep" placeholder="CEP" value={CEP} onChange={alterarCEP} />
        <input type="text" name="rua" placeholder="RUA" value={rua} onChange={(e) => setRua(e.target.value)} />
        <input type="text" name="bairro" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        <input type="text" name="cidade" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <input type="text" name="estado" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
        <button onClick={verificarCep}>Verificar</button>
      </form>
    </>
  )
}

export default App
