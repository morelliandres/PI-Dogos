import { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { postTemperament, getTemperaments } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import create from "./BreedsC.module.css"





export default function BreedsCreate() {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    
    const temperament = useSelector((state) => state.temperaments)

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        lifeSpan: "",
        temperament: []

    })
    useEffect(() => {
        dispatch(getTemperaments())
    }, [])


    function handleChage(e) {
       
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,

            temperament: [...input.temperament, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
    
        dispatch(postTemperament(input))
        setInput({
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            lifeSpan: "",
            temperament: []
        })
        // navigate("/home")
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    return (
        <div className={create.container} >

            <Link to="/home"><button className={create.button}>HOME</button></Link>
            <h1> CREATE YOUR DOG </h1>
            <form onSubmit={handleSubmit} >
                <div className={create.form}>
                    <label>Name:</label>
                    <input
                    
                        type="text"
                        value={input.name}
                        name="name"
                        placeholder="Campo Obligatorio"
                        onChange={handleChage} />
                </div>
                <div className={create.form}>
                    <label >Height Min:</label>
                    <input type="number"
                        value={input.heightMin}
                        name="heightMin"
                        placeholder="Campo Obligatorio"
                        onChange={handleChage} />
                </div>
                <div className={create.number}>
                    <label>Height Max:</label>
                    <input type="number"
                        value={input.heightMax}
                        name="heightMax"
                        placeholder="Campo Obligatorio"
                        onChange={handleChage} />
                </div>
                <div className={create.number}>
                    <label>Weight Min:</label>
                    <input type="number"
                        value={input.weightMin}
                        name="weightMin"
                        placeholder="Campo Obligatorio"
                        onChange={handleChage} />
                </div>
                <div className={create.number}>
                    <label>Weight Max:</label>
                    <input type="number"
                        value={input.weightMax}
                        name="weightMax"
                        placeholder="Campo Obligatorio"
                        onChange={handleChage} />
                </div>
                <div className={create.number}>
                    <label>LifeSpan:</label>
                    <input type="number"
                        value={input.lifeSpan}
                        name="lifeSpan"
                        onChange={handleChage} />
                </div>
                <div className={create.number}>
                    <select onChange={(e) => handleSelect(e)}>
                        <option value="all">temperament</option>
                        {temperament?.map(el =>
                            <option value={el.name}>{el.name}</option>)}
                    </select>
                </div>
                {input.temperament.map(el =>
                    <div >
                        <p>{el}</p>
                        <input type="button" value="x" className={create.butCreat} onClick={() => handleDelete(el)} />
                    </div>
                )}
                <button className={create.butCreat} type="submit">CREAR</button>
            </form>
        </div>
    )
}
