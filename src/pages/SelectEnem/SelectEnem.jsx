import React, { useState, useRef } from "react";
import './SelectEnem.css';
import { useNavigate } from 'react-router-dom';


  function SelectEnem() {
    const [nameHot,setNameHot]=useState('')
    const [nameCool,setNameCool]=useState('')
    const [slotHot,setSlotHot]=useState()
    const [slotCool,setSlotCool]=useState()
    const [board,setBoard]=useState()
    const [turn,setTurn]=useState()
    const navigate = useNavigate()
    
    
    const onClickStartButton = async() => {
        navigate('/match')
        if(!nameHot){console.log("!nameHot");return}
        if(!nameCool){console.log("!nameCool");return}
        if(slotHot==null){console.log("!slotHot");return}
        if(slotCool=null){console.log("!slotCool");return}
        //if(board==null){console.log("!board");return}
        //if(turn==null){console.log("!turn");return}

        const formData = new FormData()
        formData.append('c_id', nameCool);
        formData.append('c_slot', slotCool);
        formData.append('h_id', nameHot);
        formData.append('h_slot', slotHot);
        formData.append('board', board);
        formData.append('turn', turn);
        navigate('/match')

        //現状はmatchに遷移するが、後に選んだファイルから対戦をできるように実装してください
        // return

        // try {
        //     const response = await fetch('http://localhost:8000/', {
        //     method: 'POST',
        //     body: formData
        //   });
        //     const data = await response.json();
        //     console.log(data);
        //   } catch (error) {
        //     console.error(error);
        //   }
    
        //   console.log("complete uploadFile")
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
            <div>
                <button className="startButton" onClick={onClickStartButton}>対戦を始める</button>
            </div>
            <div className="search">
                <label for="turn">ターン数</label>
                <input
                value={turn}
                id="turn"
                onChange={e=>setTurn(e.target.value)}
                type="number"
                min={1}
                />
            </div>
            <div>
                <button className="backButton" onClick={onClickBackButton}>←戻る</button>
            </div>
        </div>
    );
  }


  export default SelectEnem
