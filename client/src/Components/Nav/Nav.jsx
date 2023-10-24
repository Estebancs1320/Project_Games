import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { orderAlfabeticamente, orderRating, filterByGenres, getGenres, filterByOrigen } from "../../Redux/action";
import style from './nav.module.css'
import zgames from '../../Image/zgames.png'
import { Link } from 'react-router-dom';

const Nav = ({setPagina, setInput, maximo}) => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres)
    const allGames = useSelector((state) => state.allGames)

    // const [imagelogin, setImagelogin] = useState(true);

    const handleOrder = (event) => {
        dispatch(orderAlfabeticamente(event.target.value))
        setPagina(1)
        setInput(1)
    }
    const handleRating = (event) => {
            dispatch(orderRating(event.target.value))
            setPagina(1)
            setInput(1) 
        
    }
    const handleGenres = (event) => {
        dispatch(filterByGenres(event.target.value))
        setPagina(1)
        setInput(1)
    }

    const handleHome = (event) => {
        if (maximo<=1) {
            location.reload();
        }
        setInput(1)
        setPagina(1)
    };

    const handleOrigen = (event) => {
        dispatch(filterByOrigen(event.target.value))
        setInput(1)
        setPagina(1)
    };

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])


    return(
        <div> 
                <img onClick={handleHome} className={style.zgames} src={zgames} alt="zgames" />
        <div className={style.contNav}>
            <nav className={style.ordenAlfab}>
                <select onChange={handleOrder}>
                    <option>Ordenar alfabeticamente</option>
                    <option value="nombreAscendente">Nombre(ascendente)</option>
                    <option value="nombreDescendiente">Nombre(descendente)</option>
                </select>
            </nav>
            <nav className={style.ordenRating}>
                <select onChange={handleRating}>
                    <option>Ordenar por rating</option>
                    <option value="ratingMayor">Mayor Rating</option>
                    <option value="ratingMenor">Menor Rating</option>
                </select>  
            </nav>
            <nav className={style.filterGenres}>
                <select onChange={handleGenres}>
                    <option key="default">Filter by genres</option>
                        {
                            genres?.map((genre) => {
                            return (
                                <option value={genre.genres} key={genre.id}>{genre.genres}</option>
                            )
                        })}
                </select>
            </nav>
            <nav className={style.filterOrigen}>
                <select onChange={handleOrigen}>
                    <option key="default">Filter by origen</option>
                    <option value="api">API</option>
                    <option value="bd">BASE DE DATOS</option>
                </select>
            </nav>
        </div>
        </div>
    )
}


export default Nav;