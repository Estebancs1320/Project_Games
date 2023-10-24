import style from './home.module.css'
import CardGame from "../Cards/CardGame";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getVideogamesByName } from "../../Redux/action";
import { Paginacion } from "../Paginacion/Paginacion";
import SearchBar from "../SearchBar/SearchBar";
import Nav from '../Nav/Nav';
import imgCarga from '../../Image/logolanding.png';


const Home = () => {
    
    const dispatch = useDispatch();
    const games = useSelector((state)=>state.videogames)


    useEffect(()=>{
        dispatch(getVideogames())
    }, [dispatch])
    
    //paginacion
    const [pagina, setPagina] = useState(1)
    const [porPagina, setPorPagina] = useState(15)
    const [input, setInput] = useState(1);
    const [imagelogin, setImagelogin] = useState(true);
    const maximo = Math.ceil(games.length / porPagina);
    const allGames=useSelector(state=>state.allGames);

    //input
    const [cards, setCards] = useState([])

    const handleSubmit = (event) => {
        // event.preventDefault()
        console.log("aca", typeof cards);
        dispatch(getVideogamesByName(cards))
        setInput(1)
        setPagina(1)
    }

    //boton
    const handleChange = (event) => {
        event.preventDefault()
        const valor = event.target.value
        setCards(valor)
    }

    useEffect(()=>{
        if(allGames.length>0){
        setImagelogin(false)
    }
    }, [allGames]);


    return(
            <div className={style.contHome}> 
                {/* <Link to={"/form"}>
                    <button>Create new Videogame!</button>
                </Link> */}
                <Nav setPagina={setPagina} setInput={setInput} maximo={maximo}/>
                <SearchBar handleChange={handleChange} handleSubmit={handleSubmit}/>



                {imagelogin? <div className={style.imgCarga}><img className={style.imageCarga} src={imgCarga} alt="landing" /></div> : 
                games.slice((pagina - 1) * porPagina, 
                (pagina - 1) * porPagina + porPagina).map((char)=>(

                <CardGame
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    image={char.image}
                    genres={char.genres}
                    />
                    ))
                }
                <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} input={input} setInput={setInput}/>
            </div>
    )
}


export default Home;