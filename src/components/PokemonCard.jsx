import React from 'react';

function PokemonCard({ pokemon }) {
    return (
        <div className="card">
            <h3>{pokemon.name}</h3>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className="card-info">
                <p>Height: {pokemon.height / 10} m</p>
                <p>Type: {pokemon.types.join(', ')}</p>
            </div>
        </div>
    );
}

export default PokemonCard;
