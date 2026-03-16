import { useNavigate } from "react-router-dom";

function MovieCard({movie}){

const navigate = useNavigate();

return(

<div
className="movie-card"
onClick={()=>navigate(`/movie/${movie.id}`)}
>

<img src={movie.image} />

<h4>{movie.title}</h4>

<p>⭐ {movie.rating}</p>

</div>

)

}

export default MovieCard;