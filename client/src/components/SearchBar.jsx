import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedName } from "../actions";
import search from "./Search.module.css"


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState("") 

 function handleInputChange (e){
     
     setName(e.target.value)
 }

 function handleSubmit(e){
     e.preventDefault() 
     dispatch(getBreedName(name));
     setName("");
 }; 

return (
    <div className={search.inputsContainer}>
<input className={search.inputText}
type="text"
placeholder="Search..."
name="input"
onChange={handleInputChange} value={name}/>
<button className={search.srctBtn} type="submit" onClick={ handleSubmit}> Search </button>

    </div>
)




}