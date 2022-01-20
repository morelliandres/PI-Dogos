import React from "react";
import p from "./Paginado.module.css"



export default function paginado({ dogsPerPage, allBreeds, paginado }) {
    const pageNumber = []
    for (let i = 0; i < Math.ceil(allBreeds / dogsPerPage); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <div className={p.pageBox} >
            <ul className={p.btnPageBox}>
                {pageNumber && pageNumber.map(number => (
                    <li className={p.btn}>
                        <a className={p.numberPage} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>

        </div>
    )
}