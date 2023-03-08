

const toggleFavorite = ( id: number) => {
    if (typeof window !== "undefined") {
    
        let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
        
        if(favorites.includes(id)){
            favorites = favorites.filter( pokeId => pokeId!== id)
        }else{
            favorites.push(id)
        }
    
        localStorage.setItem("favorites", JSON.stringify(favorites));
    
    }

}

const existPokemon = (id: number): boolean => {
    if (typeof window !== "undefined") {

        const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
    
        return favorites.includes( id );

    }else{
        return false
    }


}

const isEmpty = (): boolean => {
    console.log(typeof window)
    if (typeof window !== "undefined") {

        const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
    
        return favorites.length === 0;
    
    }else{
        return true
    }

}

const pokemons = (): any[] => {
    if (typeof window !== "undefined") {
        const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );
        return favorites;
    }else{
        return []
    }
}

export default {
    isEmpty,
    existPokemon,
    toggleFavorite,
    pokemons
}