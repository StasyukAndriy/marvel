import { useHttp } from "../components/hooks/http.hook";
const  useMarvelService = ()=> {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const  _apiKey = 'apikey=819ee378801c4aadd6729d3195b30ff9';
   const  _baseOffset = 210;
   const {loading, request, error, clearError} = useHttp();
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(item=>_transformCharacter(item, false));
    }
   
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0], false);
    }
    const getAllComics = async (offset) =>{
        const res = await request(`${_apiBase}/comics?limit=9&offset=${offset}&${_apiKey}`);
        return  res.data.results.map(item=>_transformCharacter(item, true))
    }
    const getComic = async (id) =>{
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return  _transformCharacter(res.data.results[0], true)
    }
   const  _transformCharacter = (char, comics=false) => {
     
       const charNeeded = !comics ? {
        name: char.name,
        comics: char.comics.items,
        wiki: char.urls[1].url,
       } : {title: char.title,  price: char.prices[0].price, pageCount: char.pageCount} 
           
        return {
            ...charNeeded,
            id: char.id,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character' ,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
           
        }
    }
    return{loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}

export default useMarvelService;