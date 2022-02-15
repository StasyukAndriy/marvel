import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { useParams } from "react-router-dom";

const Comic = () => {
    const marvelService = useMarvelService();
    const {loading, error} = marvelService;
    const [comic, setComic] = useState({})
    const {comicId} = useParams()
    console.log(comicId)
    const onRequest = ()=>{
     
       
    console.log(comic)
        
        if (!comicId) {
            return;
        }
        marvelService.getComic(comicId)
        .then(res=>{
            console.log(res)
            setComic(res)
            
          
        })
       
       
    }
    const renderComic = (item)=>{
        return (
           
                <div>
                        <img src={item.thumbnail} alt="x-men" className="single-comic__img"/>
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{item.title}</h2>
                            <p className="single-comic__descr">{item.description}</p>
                            <p className="single-comic__descr">{item.pageCount}</p>
                            <p className="single-comic__descr"></p>
                            <div className="single-comic__price">{item.price}$</div>
                        </div>
                        <a href="#" className="single-comic__back">Back to all</a>
                    </div>
            
        )
    }
    useEffect(()=>{
        // setComic(2323)
         console.log(1212121)
        onRequest()
    }, [comicId])
   
    const skeleton = comic || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content =  !(loading || error) ? renderComic(comic) : null
    return (
        
            <div className="single-comic">
               {skeleton}
               {errorMessage}
                {spinner} 
                {content}
               {/* {errorMessage}
               {spinner}
            
               {content} */}
            </div>
        
    )
}

export default Comic;