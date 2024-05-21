  import React, { useState, useRef } from "react";
  import './Initial.css';
  import { useNavigate } from 'react-router-dom';
  

  const initialState={
    file:null,
  }

  function Initial() {
    const navigate = useNavigate()

    const inputRef = useRef(null);
    const [formState,setFormState] = useState(initialState)

    const onFileInputChange = async(e) => {
      console.log(e.target.files)
      const file = e.target.files[0]
      await uploadFile(file)
    };
    
    const uploadFile = async(file) => {
      if(!file)return
      console.log("uploadFile")

      const formData = new FormData();
      formData.append('file', file);

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

      console.log(file)
      setFormState(initialState)
      console.log("complete uploadFile")
    }

    const onClickFileButton = () => {
      console.log("onClickButton")
      console.log(inputRef.current)
      inputRef.current.click()
    };

    const onClickLogButton = () => {
      console.log("nandedayo")
      navigate('/log') 
    };
    
    return (
      <div className="initial">
        <h1>Welcome to CHaser</h1>
        <div className="button-box">
          <button className="button-style">対戦を始める</button>
        </div>
        <div className="button-box">
          <button className="button-style" onClick={onClickLogButton}>ログを見る</button>
        </div>
        <div className="button-box">
          <button className="button-style">トーナメントに参加</button>
        </div>
        <div className="button-box">
          <button className="button-style" onClick={onClickFileButton}>ファイルをアップロード</button>
          <input 
            hidden
            ref={inputRef}
            type="file"
            accept=".py"
            onChange={onFileInputChange}/>  
        </div>
      </div>
    );
  }

  export default Initial
