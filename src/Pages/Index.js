import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Button,
  Modal
} from '@mui/material';

import PokemonCard from '../Components/PokemonCard';

function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetchAllPokemon() {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL_BACKEND}/pokemon?limit=100`);
        const data = await response.json();
        setAllPokemon(data.results);
        setFilteredPokemon(data.results);
      } catch (error) {
        console.error('Error fetching all Pokemon:', error);
      }
    }

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    async function fetchFilteredPokemon() {
      const filtered = await Promise.all(
        allPokemon.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          return data;
        })
      );

      let filteredByType = [...filtered];

      if (filterType) {
        filteredByType = filteredByType.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name === filterType)
        );
      }

      if (filterName) {
        filteredByType = filteredByType.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(filterName.toLowerCase())
        );
      }

      setFilteredPokemon(filteredByType);
    }

    fetchFilteredPokemon();
  }, [filterType, filterName, allPokemon]);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = async () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#263238', marginBottom: '30px' }}>
        <Toolbar>
          <Typography variant="h5">Pokedex</Typography>
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ marginLeft: 'auto', marginRight: '20px', borderColor: 'white' }}
          />
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            variant="outlined"
            size="small"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="fire">Fire</MenuItem>
            <MenuItem value="water">Water</MenuItem>
            <MenuItem value="grass">Grass</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="ice">Ice</MenuItem>
            <MenuItem value="fighting">Fighting</MenuItem>
            <MenuItem value="poison">Poison</MenuItem>
            <MenuItem value="ground">Ground</MenuItem>
            <MenuItem value="flying">Flying</MenuItem>
            <MenuItem value="physic">Physic</MenuItem>
            <MenuItem value="bug">Bug</MenuItem>
            <MenuItem value="rock">Rock</MenuItem>
            <MenuItem value="ghost">Ghost</MenuItem>
            <MenuItem value="dragon">Dragon</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="steel">Steel</MenuItem>
            <MenuItem value="fairy">Fairy</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={3}>
          {filteredPokemon.map((pokemon, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} onClick={handleOpen}>

              <PokemonCard
                name={pokemon.name}
                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                height={pokemon.height}
                weight={pokemon.weight}
                />

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {pokemon?.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      height={pokemon.height},
                      weight={pokemon.weight}
                    </Typography>
                  </Box>
                </Modal>

            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
