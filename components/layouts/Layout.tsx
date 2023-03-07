import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../ui"

type LayoutProps = {
    children: ReactNode,
    title: string
}

export const Layout: FC<LayoutProps> = ({children, title="Listado de Pokemons"}) => {
    return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="author" content="Nelson Rivera" />
            <meta name="description" content="Información sobre pokemon x"/>
            <meta name="keywords" content="pokemon, sotacode sota nelson"/>
        </Head>

        <Navbar />
        <main style={{
            padding: '5px 20px'
        }}>
            {children}
        </main>
    </>
  )
}
