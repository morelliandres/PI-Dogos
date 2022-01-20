import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, getTemperaments, filterTemperament, orderByName, filterCreated, orderPesado } from "../actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import home from "./Home.module.css"
export default function Home() {
    const dispatch = useDispatch()
    const error = useSelector((state) => state.error)
    const allBreeds = useSelector((state) => state.breeds)
    const temperaments = useSelector((state) => state.temperaments)
    const [orden, setOrden] = useState("")
    const [currentPage, setCurrentPage] = useState(1)  
    const [dogsPerPage, setDogsPerPage] = useState(8) 
    const indexOfLastDog = currentPage * dogsPerPage    
    const indexOfFirstDog = indexOfLastDog - dogsPerPage 
    const filterBreeds = useSelector((state) => state.filterBreed) 
    const currentDogs = filterBreeds.length ? filterBreeds.slice(indexOfFirstDog, indexOfLastDog) 
                         : allBreeds.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getBreeds());
        dispatch(getTemperaments())

    
    }, [])



    function handleFilterTemperament(e) {
        dispatch(filterTemperament(e.target.value))
        setCurrentPage (1)
        setOrden(`Ordenado ${e.target.value}`)} 
    

    function handleSort(e) {

        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSor(e) {

        e.preventDefault();
        dispatch(orderPesado(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleCreated(e) {
        dispatch(filterCreated(e.target.value))



    }



    return (
        
        <div className={home.Container}>
            <Link  to="/">back</Link>
            <Link className={home.btnCreate} to="/dogs">crear dog</Link>
            <h1>The Doguis</h1>

            <div>
                <select className={home.btn} onChange={handleSort}> 
                    <option >Orden por Nombre</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                <select className={home.btn} onChange={e => handleFilterTemperament(e)}>
                    <option value="all">temperament</option>
                    {temperaments?.map(el =>
                        <option value={el.name}>{el.name}</option>)}


                </select>
                <select className={home.btn} onChange={handleCreated}>
                    <option value="all"> Todos </option>
                    <option value="api"> from API </option>
                    <option value="db"> Create </option>
                </select>
                <select className={home.btn} onChange={handleSor}>
                    <option value="lighter">  Peso </option>
                    <option value="weight"> heavier</option>
                    <option value="lighter">  Lighter </option>
                </select>
                <Paginado dogsPerPage={dogsPerPage}
                    allBreeds={filterBreeds.length || allBreeds.length}
                    paginado={paginado} />

                <SearchBar />

                <div className={home.cards}>
                    {error ? error : 
                    currentDogs?.map(el => {
                        if (el) {
                            return (

                                <Link to={`/details/` + el.id}>
                                    <Cards name={el.name} image={el.image?.url ? el.image.url 
                                        : "https://1.bp.blogspot.com/-nNy9Zz2Eq48/W6euxYQhOvI/AAAAAAAAHHk/ReSeCYobS8wDZByljkLTwrZ5ddjt1ncTgCLcBGAs/s1600/perritoelegante2.jpg"} 
                                        temperament={el.temperament || el.Temperaments} weight={el.weight.metric ? el.weight.metric : el.weight} lifeSpan={el.lifeSpan} />
                                </Link>

                            );
                        }

                    })}
                </div>
            </div>
        </div>
    )
}
