// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'

import {PokemonForm, PokemonInfoFallback, PokemonDataView, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null);  
  const [error, setError] = useState(null);   
  
  useEffect(() => {
    if (!pokemonName){
      return
    }
    // loading state
    setPokemon(null);
    fetchPokemon(pokemonName).then(
      pokemon => setPokemon(pokemon),
      error => setError(error),     
    )

  },[pokemonName] )

  if (error) {
    return (
      <div role="alert">
        there was an error: {' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if(!pokemonName){
    return 'Submit a pokemon'
  } else if (!pokemon){
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
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
