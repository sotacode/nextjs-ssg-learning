import { Card, Container, Grid, Image, Text } from "@nextui-org/react"
import { Layout } from "../../components/layouts"
import NoFavorites from "../../components/ui/NoFavorites"
import { localFavorites } from "../../utils"
import { useState } from "react"
import FavoritePokemons from "../../components/pokemon/FavoritePokemons"


const Favorites = () => {

  const [favoritesIsEmpty, setFavoritesIsEmpty] = useState(localFavorites.isEmpty());


  const [favoritesPokemons, setFavoritesPokemons] = useState(localFavorites.pokemons());

  return (
    <Layout title="Pokemons - Favoritos">
      {favoritesIsEmpty ?
        <NoFavorites />
        :
        (
          <FavoritePokemons pokemons={favoritesPokemons} />
        )
      }

    </Layout>
  )
}


export default Favorites