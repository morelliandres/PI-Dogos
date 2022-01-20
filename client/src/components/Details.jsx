import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBreedsDetail, removeBreedsDetails } from "../actions";
import { useEffect } from "react";
import detalles from "./Details.module.css"

export default function Details(props) {

    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {

        dispatch(getBreedsDetail(id)) 
        return () => {                      
            dispatch(removeBreedsDetails())
        }                                 
    }, [])
    const myBreed = useSelector((state) => state.breedsDetails)

    return (
        <div className={detalles.detContainer}>
            <div>
                <Link to='/home'>
                    <button className='btnDet'>Back</button>
                </Link>
            </div>
            {myBreed.length > 0 ?
                <div>
                    <img src={myBreed[0].image?.url ? myBreed[0].image.url : "https://1.bp.blogspot.com/-nNy9Zz2Eq48/W6euxYQhOvI/AAAAAAAAHHk/ReSeCYobS8wDZByljkLTwrZ5ddjt1ncTgCLcBGAs/s1600/perritoelegante2.jpg"} className={detalles.imgDet} width="400" height="300" />
                    <div><h1 className={detalles.textItem}>Breed Name: {myBreed[0].name}</h1></div>
                    <div><h4 className={detalles.textItem}>Temperament: {myBreed[0].temperament ? myBreed[0].temperament : myBreed[0]?.Temperaments?.map(e => e.name).join(",")}</h4></div>
                    <div><h2 className={detalles.textItem}>LifeSpan: {myBreed[0].lifeSpan}</h2></div>
                    <div><h2 className={detalles.textItem}>Weight: {myBreed[0].weight.metric ? myBreed[0].weight.metric : myBreed[0].weight} kg</h2></div>
                    <div><h2 className={detalles.textItem}>Height: {myBreed[0].height.metric ? myBreed[0].height.metric : myBreed[0].height} cm</h2></div>
                </div> :

                <p>Cargando...</p>
            }
        </div>
    )
}