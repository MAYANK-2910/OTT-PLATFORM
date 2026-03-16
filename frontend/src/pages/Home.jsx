import { movies } from "../data/movies";
import MovieRow from "../components/MovieRow";

function Home(){

const trending = movies.filter(m=>m.rating > 8)

return(

<div className="home">

<MovieRow title="Trending" movies={trending}/>
<MovieRow title="All Movies" movies={movies}/>

</div>

)

}

export default Home;