import React from "react";
import {Link} from "react-router-dom"
import LandingCSS from "./LandingPage.module.css"

export default function LandingPage(){
    return(

        <div className = {LandingCSS.IniContainer}>
            <div>
             <h1>Hello fellow dog lover.</h1><br/>
             <span>Take a sit and begin your search, or add new dogs to our database. </span><br/>
             </div>
        <h1 > Enjoy!!! </h1>
            <Link to ="/home">
        <button className={LandingCSS.btnIni}> Lets start!</button>
        </Link>
        <div className='dogIni'>
             <img  src='https://www.animatedimages.org/data/media/202/animated-dog-image-0712.gif' alt="" />
          </div>
        </div>
        
    )
}