import React from "react";
import '../css/Home.css'
import Banner from '../components/Banner/Banner'
import Gamegrid from "./Gamegrid/Gamegrid";
function Home(){
    return(
        <div className="home">
        <Banner />
        <hr className="hrrule" />
        < Gamegrid type='popular'/>
        <hr className="hrrule" />
        < Gamegrid type='rated'/>
        <hr className="hrrule" />
        < Gamegrid type='released'/>
        <hr className="hrrule" />
        < Gamegrid type='torelease'/>





        
        </div>

    )
}
export default Home