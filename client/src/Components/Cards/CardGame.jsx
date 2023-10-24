import React, { useState } from 'react'
import style from './Card.module.css'
import { Link } from 'react-router-dom'


const CardsGame = ({id, image, name, genres}) => {

    const [showName, setShowName] = useState(false);


    return(
        <div className={style.Card}
        onMouseEnter={() => setShowName(true)}
        onMouseLeave={() => setShowName(false)}
        >
                <Link to={`/game/${id}`}>
                <img className={style.imageCard} src={image} alt={name}/>
                </Link>
                <h3>{name}</h3>
                {
                    (showName && <div className={style.nameOverlay}>{genres?.length>1?genres.join(', '):genres}</div>)
                }
            </div>
    )
        }

export default CardsGame;