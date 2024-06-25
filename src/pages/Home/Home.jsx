import EditScript from "../EditScript/EditScript";
import SelectEnem from "../SelectEnem/SelectEnem";
import Match from "../Match/Match";
import {useParams} from 'react-router-dom';
import React, { useState} from "react";
import './Home.css'


const Home = () =>{
const {userId} = useParams()
const [isMatchVisible, setMatchVisible] = useState(false);
const [matchData,setMatchData] = useState([])

const handleMatchVisible = (state) =>{
    setMatchVisible(state)
}

const handleMatchData = (data) =>{
    setMatchData(data)
}

  return (
        <div className="home-style">
            <div className="match-container-style">
            <SelectEnem userId={userId} onSetMatch={handleMatchVisible} onSetData={handleMatchData}/>
            {isMatchVisible && <Match data={matchData}/>}
            </div>
            <EditScript userId={userId} />
        </div>
  );
}

export default Home;