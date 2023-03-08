import { Layout } from "../../../components/layouts"
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { pokeApi } from "../../../api";
import { PokemonListResponse, PokemonResponse, SmallPokemon } from "../../../interfaces";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import { localFavorites } from "../../../utils";
import { useState } from "react";
import confetti from 'canvas-confetti'



interface Props {
    pokemon: any;
}


const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existPokemon(pokemon.id))

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites)

        if (!isInFavorites) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 1,
                    y: 0
                }
            })
        }
    }

    return (
        <Layout title="Pokemon">
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} alt={pokemon.name} width="100%" height={200} />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Text h1 transform="capitalize">{pokemon.name}</Text>
                            <Button
                                color="gradient"
                                ghost={!isInFavorites}
                                onClick={onToggleFavorite}
                            >
                                {isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction="row" display="flex" gap={0} justify="space-around">
                                <Image alt={pokemon.name} src={pokemon.sprites.front_default} width={100} height={100} />
                                <Image alt={pokemon.name} src={pokemon.sprites.back_default} width={100} height={100} />
                                <Image alt={pokemon.name} src={pokemon.sprites.front_shiny} width={100} height={100} />
                                <Image alt={pokemon.name} src={pokemon.sprites.back_shiny} width={100} height={100} />
                            </Container>
                        </Card.Body>
                    </Card>

                </Grid>
            </Grid.Container>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemons151: SmallPokemon[] = data.results;

    return {
        paths: pokemons151.map((pokemon) => {
            return {
                params: { name: pokemon.name }
            }
        }),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }

    const { data } = await pokeApi.get<PokemonResponse>(`/pokemon/${name}`)


    return {
        props: {
            pokemon: data
        }
    }
}

export default PokemonByNamePage;