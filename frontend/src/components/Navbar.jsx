import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {

return(
<nav className="navbar">

<h2 className="logo">🎬 CineVerse</h2>

<div className="links">
<Link to="/">Home</Link>
<Link to="/watchlist">My List</Link>
</div>

<SearchBar/>

</nav>
)
}

export default Navbar;