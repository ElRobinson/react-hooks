// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'

import {PokemonForm, PokemonInfoFallback, PokemonDataView, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) { 
  const [state, setState] = useState({
    status: 'idle',
    pokemon: null,
    error: null
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
        setState({pokemon, status:'resolved'})        
      },
      error => {
        setState({error, status:'rejected'})   
      },     
    )

  },[pokemonName] )

  switch (status){
    case 'idle':
      return 'Submit a pokemon'       
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      return (
        <div role="alert">
          there was an error: {' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      break;
  }

  
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
