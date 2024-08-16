"use client"
import "./Search.css";

function Search() {

    function searchData(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log("Searching ", event.target.value);
    }
    
    return(  
        <>
            <div className="Search">
                <div className="nav__search">
                    <input 
                        onChange={searchData} 
                        type="text" 
                        placeholder="Search by ID/Address/ ..." 
                    />
                </div>
            </div>
        </>
    )
}

export default Search;
