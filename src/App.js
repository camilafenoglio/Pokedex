import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchPokemon = async () => {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await res.json();
            const pokemonWithDetails = await Promise.all(
                data.results.map(async (pokemon) => {
                    const pokemonData = await fetch(pokemon.url);
                    const pokemonDetails = await pokemonData.json();
                    return {
                        ...pokemon,
                        image: pokemonDetails.sprites.front_default,
                        types: pokemonDetails.types.map(type => type.type.name),
                        height: pokemonDetails.height,
                    };
                })
            );
            setLoading(false);
            setPokemonList(pokemonWithDetails);
            setFilteredPokemon(pokemonWithDetails);
        };

        fetchPokemon();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(term)
        );
        setFilteredPokemon(filtered);
    };

    return (
        <div className="App">
            <Header />
            <main className="main-content">
                <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
                <div className="pokemon-list">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        filteredPokemon.length > 0 ?
                            filteredPokemon.map((pokemon, index) => (
                                <PokemonCard key={index} pokemon={pokemon} />
                            )) :
                            <p>No encontramos ningún Pokémon.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
