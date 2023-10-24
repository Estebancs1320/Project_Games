import axios from 'axios';
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

export const getVideogames = () => {
try {
    return async (dispatch) => {
    const { data } = await axios.get("/videogames")
    return dispatch({type: GET_VIDEOGAMES, payload: data})
    }
    } catch (error) {
    console.log("algun error aqui");
        }
       
    }

    export const getVideogamesById = (id) => {
        return async (dispatch) => {
          try {
            const { data } = await axios.get(`/videogames/${id}`);
            if (data) {
              return dispatch({ type: GET_BY_ID, payload: data });
            } else {
              console.log(`No se encontró ningún juego con el ID ${id}`);
            }
          } catch (error) {
            console.log(error);
          }
        };
      };

      export const postGames = (input) => {
          return async (dispatch) => {
          const { data } = await axios.post("/videogames", input)
          console.log("data",data);
          return dispatch({type: POST_GAMES, payload: data})
          }
      }

      export const getVideogamesByName = (name) => {
        return async (dispatch) => {
          try {
            const { data } = await axios.get(`/videogames/name?name=${name}`);
            // Verifica si la respuesta tiene datos antes de despachar la acción
            if (data) {
              return dispatch({ type: GET_BY_NAME, payload: data });
            } else {
              // Si no se encuentra ningún juego con el ID, puedes manejarlo aquí
              console.log(`No se encontró ningún juego con el ID ${id}`);
            }
          } catch (error) {
            console.log(error);
          }
        };
      };      

export const getGenres = () => {
    return async function(dispatch){
        try {
            let {data} = await axios.get('/genres');
            return dispatch({type: GET_GENRES, payload: data})
        } catch (error) {
            console.log(error);
        }
    }
}

export const orderAlfabeticamente = (orden) => {
    return { type: ORDEN_ALFABETICAMENTE, payload: orden };
  };
  
export const orderRating = (orden) => {
    return { type: ORDEN_RATING, payload: orden };
  };

export const filterByGenres = (genre) => {
    return { type: FILTER_BY_GENRES, payload: genre };
  };
  
export const filterByOrigen = (origen) => {
    return {
      type: FILTER_BY_ORIGEN,
      payload: origen,
    };
  };