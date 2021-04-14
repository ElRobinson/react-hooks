// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import {PokemonForm, PokemonInfoFallback, PokemonDataView, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) { 
  const [state, setState] = useState({
    status: pokemonName ? 'pending': 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state
  
  useEffect(() => {
    if (!pokemonName){
      return
    }
    // loading state
    setState({status:'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status:'resolved', pokemon})        
      },
      error => {
        setState({status:'rejected', error})   
      },     
    )

  },[pokemonName] )

  switch (status){
    case 'idle':
      return 'Submit a pokemon'       
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error      
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      break;
  } 
}

function ErrorFallback({error, resetErrorBoundary}){
  return (
    <div role="alert">
      there was an error: {' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>try again</button>
    </div>
  )
}  

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset(){
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary 
          FallbackComponent={ErrorFallback} 
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
