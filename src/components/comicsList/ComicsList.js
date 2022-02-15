import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../style/button.scss';
const ComicsList = () => {
    const marvelService = useMarvelService()
    const {loading, error} = marvelService;
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(9);
    const [newItemLoading, setNewItemLoading] = useState(false);
    // console.log(marvelService.getAllComics())
    const onRequest = (offset, initial)=>{
        onCharListLoading(initial);
        // console.log(marvelService.getAllComics(offset))
        marvelService.getAllComics(offset)
        .then(res=>onCharListLoaded(res))
    }
    useEffect(()=>{
        onRequest(offset, true)
    }, [])
    const onCharListLoading = (initial) => {

        initial ? setNewItemLoading(false) : setNewItemLoading(true)
    }
    const onCharListLoaded = (newComicsList) => {
       
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        
        setOffset(offset => offset + 9);
        onCharListLoading(true)
    }
//    console.log(comicsList)
    const renderItems = (items)=>{
        const elements =  items.map((item, i)=>{
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
             <li  key={i} className="comics__item">
                 <Link end='true' to={`/comics/${item.id}`}>
                     <img style={imgStyle} src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                     <div className="comics__item-name">{item.title}</div>
                     <div className="comics__item-price">{item.price+'$'}</div>
                 </Link>
             </li>
            )
        })
        return(
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }
    const items = renderItems(comicsList)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    return (
        <div className="comics__list">
               {items}
               {errorMessage}
               {spinner}
            <button onClick={()=>onRequest(offset, false)} disabled={newItemLoading} className="button button__main button__long">
                <div   className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;