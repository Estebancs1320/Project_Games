import { GET_VIDEOGAMES,
         GET_BY_ID,
         GET_BY_NAME,
         GET_GENRES,
         ORDEN_ALFABETICAMENTE,
         ORDEN_RATING,
         FILTER_BY_GENRES,
         FILTER_BY_ORIGEN,
         POST_GAMES,
        } from './action-types';

const initialState = {
    allGames: [],
    videogames : [],
    searchId: [],
    genres: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEOGAMES:
            return{
                ...state,
                allGames: action.payload,
                videogames: action.payload,

            }

        case POST_GAMES:
            return{
                ...state,
                allGames: [...state.allGames, action.payload],
            }
        case GET_BY_ID: 
            return{
                ...state,
                searchId: action.payload
            }
        case GET_BY_NAME: 
            return{
                ...state,
                videogames: action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload
            }
        case ORDEN_ALFABETICAMENTE:
            const copia=[...state.videogames];
            return{
                ...state,
                videogames: action.payload==="nombreAscendente"
                ?copia.sort((a,b)=>a.name.toLowerCase().charCodeAt(0)-b.name.toLowerCase().charCodeAt(0))
                :copia.sort((a,b)=>b.name.toLowerCase().charCodeAt(0)-a.name.toLowerCase().charCodeAt(0))
            }


            case ORDEN_RATING:
                const copiaRating=[...state.videogames];
                return {
                  ...state,
                  videogames: action.payload==="ratingMayor"
                    ? copiaRating.sort((a, b) => b.rating - a.rating) // Ordenar de mayor a menor rating
                    : copiaRating.sort((a, b) => a.rating - b.rating), // Ordenar de menor a mayor rating
                };


        case FILTER_BY_GENRES:
            let copiaGenre = state.allGames;
            let filtrados = copiaGenre.filter((e) =>
            {if (e.genres) {
                
                return e.genres.includes(action.payload)
                

            }
            }
            );
            return {
              ...state,
              videogames: filtrados,
            };

        case FILTER_BY_ORIGEN:
            let copiafilt = state.allGames;
            let filter
            if (action.payload==="api") {
                filter=copiafilt.filter((e)=>{
                    return typeof e.id !== "string"

                })
            }
            else{
                filter=copiafilt.filter((e)=>{
                    return typeof e.id !== "number"

                })
            }
            return{
                ...state,
                videogames: filter,
                
            }

        default:
            return{...state}
    }
};

export default reducer;