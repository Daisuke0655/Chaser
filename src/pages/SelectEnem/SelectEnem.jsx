import React, { useState, useRef } from "react";
import './SelectEnem.css';
import { useNavigate, useParams} from 'react-router-dom';


  function SelectEnem() {
    const [nameHot,setNameHot]=useState('')
    const [nameCool,setNameCool]=useState('')
    const [slotHot,setSlotHot]=useState(0)
    const [slotCool,setSlotCool]=useState(0)
    const [board,setBoard]=useState([
        '000300000300000',
        '0C0000000000000',
        '000300030000300',
        '022200000000003',
        '000003000300030',
        '003000003000000',
        '000000000000220',
        '000300030000000',
        '023000030000032',
        '300000000003000',
        '020200000000000',
        '000000003000300',
        '000300030000300',
        '300000000002220',
        '000003000003000',
        '0000000000000H0',
        '000003000003000'
    ])//0->.,3->I
    const [turn,setTurn]=useState(1)
    const navigate = useNavigate()
    
    
    const onClickStartButton = async() => {
        if(!nameHot){console.log("!nameHot");return}
        if(!nameCool){console.log("!nameCool");return}
        if(slotHot<0){console.log("!slotHot");return}
        if(slotCool<0){console.log("!slotCool");return}
        if(!board){console.log("!board");return}
        if(turn<1){console.log("!turn");return}

        const sendData = {
            "c_id": nameCool,
            "c_slot": slotCool,
            "h_id": nameHot,
            "h_slot": slotHot,
            "board": board,
            "turn": Number(turn)
        };

         try {
            const response = await fetch('http://3.112.173.245/battle', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(sendData),
            mode: 'cors'
          });
            const receiveData = await response.json();
            const boardData = {
                Field: board,
                Turn: turn
            }
            const mergedData = {
                ...receiveData,
                ...boardData
            }
            console.log('mergedData: ')
            console.log(mergedData)
            const encodedData = encodeURIComponent(JSON.stringify(mergedData));
            navigate(`/match/${encodedData}`)
          } catch (error) {
            console.error(error);
          }
    
           console.log("complete start")
    }
    
    const onClickSlotButton = (num,HorC) => {
        if(HorC=="H"){
            setSlotHot(num)
        }else if(HorC=="C"){
            setSlotCool(num)
        }
    }

    const onClickBackButton=()=>{
        console.log("back to the InitialPage");
        navigate('/initial')
    }


    return (
        <div className='selectEnem'>
            <div className="search">    
                <input
                className="search_bar_input"
                value={nameHot}
                placeholder="HOTプレイヤー名を入力"
                onChange={e=>setNameHot(e.target.value)}
                type="text"
                />
            </div>
            <div className="program_Container">
                <div className="program_items">
                    <button className="program_buttons_hot" onClick={()=>onClickSlotButton(0,"H")}>スロット１</button></div>
                <div className="program_items">
                    <button className="program_buttons_hot" onClick={()=>onClickSlotButton(1,"H")}>スロット２</button></div>
                <div className="program_items">
                    <button className="program_buttons_hot" onClick={()=>onClickSlotButton(2,"H")}>スロット３</button></div>
            </div>
            <div>{"選択中 name:"+nameHot+" slot:"+slotHot}</div>

            <div className="search">    
                <input
                className="search_bar_input"
                value={nameCool}
                placeholder="COOLプレイヤー名を入力"
                onChange={e=>setNameCool(e.target.value)}
                type="text"
                />
            </div>
            <div className="program_Container">
                <div className="program_items">
                    <button className="program_buttons_cool" onClick={()=>onClickSlotButton(0,"C")}>スロット１</button></div>
                <div className="program_items">
                    <button className="program_buttons_cool" onClick={()=>onClickSlotButton(1,"C")}>スロット２</button></div>
                <div className="program_items">
                    <button className="program_buttons_cool" onClick={()=>onClickSlotButton(2,"C")}>スロット３</button></div>
            </div>
            <div>{"選択中 name:"+nameCool+" slot:"+slotCool}</div>
            <div className="search">
                <label htmlFor="turn">ターン数</label>
                <input
                value={turn}
                id="turn"
                onChange={e=>setTurn(e.target.value)}
                type="number"
                min={1}
                />
            </div>
            <div>
                <button className="startButton" onClick={onClickStartButton}>対戦を始める</button>
            </div>
            <div>
                <button className="createMapButton" onClick={onClickStartButton}>マップを制作</button>
            </div>
            <div>
                <button className="backButton" onClick={onClickBackButton}>←戻る</button>
            </div>
        </div>
    );
  }


  export default SelectEnem
