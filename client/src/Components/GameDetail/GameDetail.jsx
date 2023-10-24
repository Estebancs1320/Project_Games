import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogamesById } from '../../Redux/action';
import zgames from '../../Image/zgames.png'
import style from './gameDetail.module.css'
import { Link } from 'react-router-dom';

const GameDetail = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const game = useSelector((state) => state.searchId); 

  useEffect(() => {
    dispatch(getVideogamesById(id)); 
  }, [dispatch, id]);

  const stripHTML = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className={style.contDetail}>
      <Link to="/home">
        <img className={style.zgames} src={zgames} alt="zgames" />
      </Link>
      <h1 className={style.nameDetail}>{game.name}</h1>
      <h1 className={style.nameDetail2}>{game.name}</h1>
      <img className={style.detailImage} src={game.image} alt={game.name} />
      <h3 className={style.description}>Description: {stripHTML(game.description)}</h3>
      <div className={style.contStuff}>
        <h3>Platforms: {game.platforms}</h3>
        <h3>Released: {game.released}</h3>
        <h3>Rating: {game.rating}</h3>
      </div>
    </div>
  );
};

export default GameDetail;