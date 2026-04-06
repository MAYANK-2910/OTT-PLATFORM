import { useState } from "react";

function SearchBar(){

const [search,setSearch] = useState("");

return(

<input
className="search"
placeholder="Search movies..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

)

}

export default SearchBar;