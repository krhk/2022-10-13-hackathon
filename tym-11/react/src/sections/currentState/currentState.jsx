import "./currentState.scss";
import { useEffect } from 'react'

function CurrentState(){

    useEffect(() =>{
        setTimeout(() => {
            let m = document.querySelector(".leaflet-container");  
            console.log(m);  
            let c = document.querySelector("#map");
            console.log(c);  

            c.appendChild(m);
        }, 1000)


        
    })

    return (
        
        <section id="aktualni-stav" className="current-state container">
        <h1>Sledujte aktuální stav našich silnic</h1>
        <p>Zobrazte informace o úseku najetím myši</p>

        <div id="map">

        </div>

        {/* <iframe src="map.html" frameborder="0"></iframe> */}

        {/* <div id="canvas"></div> */}

        

        <div id="road-info">
            <h2>Informace o úseku</h2>
            <p>aktuální stav: </p>
            <p>třída: </p>
            <p>povrch: </p>
            <p>datum poslední opravy: </p>
            <p>plánovaná oprava: </p> 
        </div>
    </section>
    )
}

export default CurrentState;