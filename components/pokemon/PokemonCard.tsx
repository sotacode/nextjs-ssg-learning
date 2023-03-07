import { FC } from "react"
import { SmallPokemon } from "../../interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon: {id, img, name} }) => {
    const router = useRouter();
    const onClick = ()=>{
        router.push(`/pokemon/${id}`)
    }
    
    return (
        <Grid xs={6} sm={3} md={2} xl={1}>
            <Card isHoverable isPressable onClick={onClick}>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        alt={name}
                        src={img}
                        width="100%"
                        height={140}
                    />
                    <Card.Footer>
                        <Row justify='space-between'>
                            <Text transform='capitalize' color='white'>{name}</Text>
                            <Text color='white'>#{id}</Text>
                        </Row>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Grid>
    )
}
