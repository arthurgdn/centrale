import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import './MovieList.css'
import './Button.css'
//Renvoie la liste des films 
const MovieList = ()=>{

    const [error, setError] = useState(null);
    const [page,setPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayedMovies,setDisplayedMovies] = useState([])
    const [movies, setMovies] = useState([]);
    const [search,setSearch] = useState('')
    
    useEffect(()=>{
        fetchMovies()
        
    },[])

    useEffect(()=>{
      setDisplayedMovies(movies.filter((movie)=>movie.name.toLowerCase().includes(search.toLowerCase())))
    },[search,movies])
    const fetchMovies = async () => {
      try {
        //on recuperera ici la liste de films
        const response = await fetch("https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/list_f");
        const responseJson = await response.json();
        setIsLoaded(true);
        setError(false);
        console.log(responseJson)
        setMovies(responseJson);
        
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(true);
        console.log(error)
      }
    };
    
    
      if (error) {
        return <div>Erreur: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Chargement...</div>;
      } else {
        return (
          <div className="page-container">
            <input className="movie-search" type="text" placeholder="Recherchez un film par son titre" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <div className="movie-list-container">
              {displayedMovies.slice((page-1)*9,page*9).map((movie) => (
                <div className="movie-container" key={movie.uuid}>
                  <Link className="list-link"  to={{pathname:'/movie/'+movie.uuid,state:{movie}}}>{movie.name}</Link>
                  <p>{movie.date}</p>
                  <div className="movie-genres">
                    {movie.tag && movie.tag.map((genre)=> (
                      <p className="movie-genre" key={genre}>{genre}</p>
                    ))}
                  </div>
                  </div>
              ))}
            </div>
              <div className="pagination">
                {page!==1 && (<button className="previous-button pagination-button" onClick={()=>setPage(page-1)}>Page précédente</button>)}
                {(page!==Math.ceil(displayedMovies.length/9) &&displayedMovies.length>9) &&(<button className="next-button pagination-button" onClick={()=>setPage(page+1)}>Page suivante</button>)}
              </div>
            </div>
        );
      }
    
  
    
}

export default MovieList




/*
import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import './MovieList.css'
import './Button.css'
import FilmPage from "./FilmPage/FilmPage";
//Renvoie la liste des films 
const MovieList = ()=>{

    const [error, setError] = useState(null);
    const [page,setPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false);
    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
        fetchMovies()
        
    },[])
    const fetchMovies = async () => {
      try {
        //on recuperera ici la liste de films
        // const response = await fetch("https://b6b8xoxbi0.execute-api.eu-west-1.amazonaws.com/dev/list_f");
        // const responseJson = await response.json();
        // setIsLoaded(true);
        // setError(false);
        // console.log(responseJson)
        // setMovies(responseJson);
        setMovies([
          {uuid:1,name:"Film 1 ",tag:['action','thriller','dramatique']},
          {uuid:2,name:"Film 2",tag:['comédie','société']},
          {uuid:3,name:"Film 3 ",tag:['action','thriller','dramatique']},
          {uuid:4,name:"Film 4 ",tag:['action','thriller','dramatique']},
          {uuid:5,name:"Film 5 ",tag:['action','thriller','dramatique']},
          {uuid:6,name:"Film 6 ",tag:['action','thriller','dramatique']},
          {uuid:7,name:"Film 7 ",tag:['action','thriller','dramatique']},
          {uuid:8,name:"Film 8 ",tag:['action','thriller','dramatique']},
          {uuid:9,name:"Film 9 ",tag:['action','thriller','dramatique']},
          {uuid:10,name:"Film 10 ",tag:['action','thriller','dramatique']},
          {uuid:11,name:"Film 11 ",tag:['action','thriller','dramatique']},
          {uuid:12,name:"Film 12 ",tag:['action','thriller','dramatique']},
          {uuid:13,name:"Film 13 ",tag:['action','thriller','dramatique']},
          {uuid:14,name:"Film 14 ",tag:['action','thriller','dramatique']},
          {uuid:15,name:"Film 15 ",tag:['action','thriller','dramatique']},
          {uuid:16,name:"Film 16 ",tag:['action','thriller','dramatique']},
          {uuid:17,name:"Film 17 ",tag:['action','thriller','dramatique']},
          {uuid:18,name:"Film 18 ",tag:['action','thriller','dramatique']},
          {uuid:19,name:"Film 19 ",tag:['action','thriller','dramatique']},
          {uuid:20,name:"Film 20 ",tag:['action','thriller','dramatique']},
          {uuid:21,name:"Film 21 ",tag:['action','thriller','dramatique']},
          {uuid:22,name:"Film 22 ",tag:['action','thriller','dramatique']},
          {uuid:23,name:"Film 23 ",tag:['action','thriller','dramatique']}])
          
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(true);
        setError(error);
      }
    };
  
    
      if (error) {
        return <div>Erreur: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Chargement...</div>;
      } else {
        return (
          <Router>     
            <div className="page-container">
              <div className="movie-list-container">
                {movies.slice((page-1)*9,page*9).map((movie) => (
                  <div className="movie-container" key={movie.uuid}>
                    <Link className="list-link" to={'/movie/'+movie.uuid}>{movie.name}</Link>
                    <Route path={"/movie/" + movie.uuid} > <FilmPage movie_id = {movie.uuid} /> </Route>
                    <div className="movie-genres">
                      {movie.tag.map((genre)=> (
                        <p className="movie-genre">{genre}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
                <div className="pagination">
                  {page!==1 && (<button className="previous-button pagination-button" onClick={()=>setPage(page-1)}>Page précédente</button>)}
                  {(page!==Math.ceil(movies.length/9) &&movies.length>9) &&(<button className="next-button pagination-button" onClick={()=>setPage(page+1)}>Page suivante</button>)}
                </div>
              </div>
            </Router>
        );
      }
    
  
    
}

export default MovieList
*/