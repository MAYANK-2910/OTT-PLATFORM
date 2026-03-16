import MovieCard from "./MovieCard";

function MovieRow({title,movies}){

return(

<div className="row">

<h2>{title}</h2>

<div className="row-movies">

{movies.map(movie=>(
<MovieCard key={movie.id} movie={movie}/>
))}

</div>

</div>

)

}

export default MovieRow;