import style from './form.module.css/';
import { useDispatch, useSelector, } from 'react-redux';
import { getGenres, postGames, } from '../../Redux/action';
import { useEffect, useState } from 'react';
import { validation } from './validation.js';
import zgames from '../../Image/zgames.png'
import { Link } from 'react-router-dom';


const Form = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state)=>state.genres);


    useEffect(() => {
        dispatch(getGenres())
        console.log(genres);
    }, [dispatch])

    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        platforms: "",
        date: "",
        rating: "",
        genres: [], 
    });

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        description: "",
        platforms: "",
        date: "",
        rating: "",
        genres: "", 
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name==="genres"){
            setInput({
                ...input,
                genres: [...input.genres, value]});
        } 
        else if(name==="rating"){
            setInput((prevInput) => ({
                ...prevInput,
                [name]: Number(value),
              }));
        }
        else {
            setInput((prevInput) => ({
              ...prevInput,
              [name]: value,
            }));
            
        }

        validation(event.target, setErrors);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !input.name ||
            !input.image ||
            !input.description ||
            !input.platforms ||
            !input.date ||
            !input.rating ||
            !input.genres
        ) {
            alert("Please complete all required fields.");
            return;
        }

        if (!errors.name && !errors.image && !errors.description && !errors.platforms && !errors.date && !errors.rating &&
             !errors.rating && !errors.genres) {
                console.log("input",input);
            dispatch(postGames(input))
        } else {
        alert("errors were found")
    }}



    return(
        <div className={style.contForm}>

            <Link to="/home">
                <img className={style.zgames} src={zgames} alt="zgames" />
            </Link>

            <h1 className={style.TitForm}>Create your VideoGame</h1>
            
            <form className={style.Formform} onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input name="name" type='text' value={input.name} onChange={handleChange} />
                    {errors.name?(<p>{errors.name}</p>): ""}
                </div>
                    
                <div>
                    <label>Image:</label>
                    <input name="image" type='text' value={input.image} onChange={handleChange} />
                    {errors.image?(<p>{errors.image}</p>): ""}
                </div>

                <div>
                    <label className={style.labelDesc}>Description:</label>
                    <textarea 
                        className={style.campDescription}
                    name="description" type='text' value={input.description} onChange={handleChange} />
                    {errors.description?(<p>{errors.description}</p>): ""} 
                </div>
                    
                <div>
                    <label>Platforms:</label>
                    <input name="platforms" type='text' value={input.platforms} onChange={handleChange} />     
                    {errors.platforms?(<p>{errors.platforms}</p>): ""}
                </div>
                    
                <div>
                    <label>Date:</label>
                    <input className={style.date} name="date" type='date' value={input.date} onChange={handleChange} />
                    {errors.date?(<p>{errors.date}</p>): ""}
                </div>
                    
                <div>
                    <label>Rating:</label>
                    <input name="rating" type='text' value={input.rating} onChange={handleChange} />
                    {errors.rating?(<p>{errors.rating}</p>): ""}
                </div>
                    
                <div>
                    <label>Genres:</label>
                    <select name="genres" value={input.genres} onChange={handleChange}>
                        <option disabled selected>genero</option>
                        <option value="Action">Action</option>
                        {
                        genres?.map((genre) => {
                            return (
                                <option value={genre.genres} key={genre.id}>{genre.genres}</option>
                            )})}
                    </select>
                    {errors.genres?(<p>{errors.genres}</p>): ""}
                </div>       

                <div>
                    <button type='submit'>Create</button>
                    
                </div>
            </form>
        </div>
    )
}

export default Form;