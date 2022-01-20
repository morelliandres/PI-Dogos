import React from "react";
import card from "./card.module.css"
export default function Cards({ name, image, temperament, weight, lifeSpan }) {

    console.log(temperament, "aqui")

    return (
        <div className={card.card}>
            <div className={card.imgContainer}>
    {image && <img className={card.img} src={image} alt="img not found" width="200px" height="250px" />}
            </div>
            <div>
                <section>
                    <h2>Name:{name}</h2>
                    <h4>Peso: {weight} kg</h4>
                    <h5>Años: {lifeSpan}</h5>
                    
                    <h6>Temperamentos: {Array.isArray(temperament) ? temperament.map(t => <div>
                        {t.name}
                    </div>) : temperament}</h6>
                </section>
            </div>
        </div>
    );
}