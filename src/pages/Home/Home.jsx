import EditScript from "../EditScript/EditScript";
import SelectEnem from "../SelectEnem/SelectEnem";
import Match from "../Match/Match";
import {useParams} from 'react-router-dom';
import React, { useState,useRef} from "react";
import './Home.css'


const Home = () =>{
const {userId} = useParams()
const [isMatchVisible, setMatchVisible] = useState(false);
const [matchData,setMatchData] = useState([])
const containerRef = useRef(null);

const handleMatchVisible = (state) =>{
    setMatchVisible(state)
}

const handleMatchData = (data) =>{
    setMatchData(data)
}

const scrollToBottom = () => {
    console.log('here')
    if (containerRef.current) {
        setTimeout(() => {
            console.log('reach hare')
            if (containerRef.current) {
              containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
          }, 200);
    }
  };

  return (
        <div className="home-style">
            <div className="match-container" ref={containerRef}>
                <div className="match-container-style">
                    <SelectEnem userId={userId} onSetMatch={handleMatchVisible} onSetData={handleMatchData} scrollToBottom={scrollToBottom}/>
                    {isMatchVisible && <Match data={matchData}/>}
                </div>
            </div>
            <div className="edit-container">
                <EditScript userId={userId} />
            </div>
        </div>
  );
}

export default Home;