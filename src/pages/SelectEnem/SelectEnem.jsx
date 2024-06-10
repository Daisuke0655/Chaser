import React, { useState, useRef } from "react";
import './SelectEnem.css';
import { useNavigate } from 'react-router-dom';

const initialState={
    name:null,
}

  function SelectEnem() {
    const [name,setName]=useState('')
    const navigate = useNavigate()
    const inputRef = useRef(null);
    const [formState,setFormState] = useState(initialState)


    const onClickSearchButton=async()=>{
        const playerName=name;
        console.log(playerName)
        await searchName(playerName)
        console.log("検索")
    }


    const searchName = async(playerName) => {
        if(!playerName)return
        console.log("searchName")
  
        const formData = new FormData();
        formData.append('name', playerName);
  
        try {
          const response = await fetch('http://localhost:8000/', {
          method: 'POST',
          body: formData
        });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }

        console.log(playerName)
        setFormState(initialState)
        console.log("complete uploadFile")
    }


    const onClickBackButton=()=>{
        console.log("back to the InitialPage");
        navigate('/initial')
    }


    return (
        <div className='selectEnem'>
            <h1>対戦相手を検索</h1>
            <div className="search">    
                <input
                className="search_bar_input"
                value={name}
                placeholder="プレイヤー名を入力"
                onChange={e=>setName(e.target.value)}
                type="text"
                />
                <button onClick={onClickSearchButton}>検索</button>
            </div>
            <div className="program_Container">
                <div className="program_items">
                    <button className="program_buttons">その１</button></div>
                <div className="program_items">
                    <button className="program_buttons">その２</button></div>
                <div className="program_items">
                    <button className="program_buttons">その３</button></div>
            </div>
            <div>
                <button className="backButton" onClick={onClickBackButton}>←戻る</button>
            </div>
            
        </div>
    );
  }


  export default SelectEnem
