import React from 'react';
import { useState } from 'react';
import '../Styles/PokemonCard.css'


function PokemonCard({ name, imageUrl }) {


  return (
    <>
      <div className="pokemon-card">
        <img src={imageUrl} alt={name} />
        <p>{name}</p>
      </div>
    </>
  );
}

export default PokemonCard;
