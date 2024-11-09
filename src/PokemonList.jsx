import React, { useState } from 'react';
import useFetchPokemon from './useFetchPokemon';

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useFetchPokemon(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(currentPage - 1) * 20}`
  );

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="pokemon-list-container">
      <ul>
        {data?.results?.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
      {data?.results?.length > 0 && currentPage * 20 < data.count && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Cargar más
        </button>
      )}
    </div>
  );
};

export default PokemonList;