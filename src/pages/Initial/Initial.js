  import React, { useState, useRef } from "react";
  import './Initial.css';
  import { useNavigate,useParams} from 'react-router-dom';
  

  const initialState={
    file:null,
  }

  function Initial() {
    const navigate = useNavigate()
    const {userId} = useParams()

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

    const onClickGameButton = () => {
      navigate(`/select/${userId}`)
    }

    const onClickFileButton = () => {
      console.log("onClickButton")
      console.log(inputRef.current)
      inputRef.current.click()
    };

    const onClickEditScriptButton = () =>{
      navigate(`/edit/${userId}`)
    }

    const onClickLogButton = () => {
      navigate('/log') 
    };
    
    return (
      <div className="initial">
        <h1>Welcome to CHaser</h1>
        <div className="button-box">
          <button className="button-style" onClick={onClickGameButton}>対戦を始める</button>
        </div>
        <div className="button-box">
        <button className="button-style" onClick={onClickEditScriptButton}>ファイルを編集</button>
        </div>
      </div>
    );
  }

  export default Initial
