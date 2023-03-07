import type { GetStaticProps, NextPage } from 'next'
import { Layout } from '../components/layouts'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de pokemons'>

      <Grid.Container gap={ 2 } justify='flex-start'>

        {pokemons.map((pokemon) => {
          return (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          )
        })}

        </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon) => {
    const ulPokemonSplited = pokemon.url.split("/")
    const id = ulPokemonSplited[ulPokemonSplited.length - 2]
    return {
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    }
  })

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
