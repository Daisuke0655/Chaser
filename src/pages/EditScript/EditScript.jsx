import React, { useState, useRef} from 'react';
import postUserData from '../../components/postUserData'
import { Editor } from '@monaco-editor/react';
import { MdFileUpload   } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import './EditScript.css'

const EditScript = () => {

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileName,setFileName] = useState('')
  const [isPopUpVisible,setPopUpVisible] = useState(false)
  const navigate = useNavigate()

  function handleEditorDidMount(editor,monaco){
    editorRef.current = editor
  }

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible)
  }

  const handleFileChange = (event) =>{
    const file = event.target.files[0]
    if(file){
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) =>{
        const content = e.target.result
        if(editorRef.current){
          editorRef.current.setValue(content)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleUploadClick = () =>{
    fileInputRef.current.click()
  }

  const sendFile = async (content,num) =>{
    const jsonData = {
      UserID: 'Sample',
      slot: num,
      program: content,
      language: 'python'
    }
    try {
      const response = await fetch('https://hpaiddjrprewsmr3kjbbvk5sfe0jmuyd.lambda-url.ap-northeast-1.on.aws/', {
      method: 'POST',
      body: JSON.stringify(jsonData),
      mode: 'cors'
    });
    if (response.ok) {
      console.log('File uploaded successfully');
      navigate('/initial')
    } else {
      console.error('File upload failed');
    }
    } catch (error) {
      console.error(error);
    }
    console.log("end")


  }

  const handleDownload = (num) =>{
    if(editorRef.current){
      togglePopUp()
      const content = editorRef.current.getValue();
      console.log(content)
      sendFile(content,num)
    }
  }


  return (
    <>
        <Editor
      height="90vh"
      defaultLanguage='python'
      defaultValue='# some commnet'
      onMount={handleEditorDidMount}
    />
    <input  
      type='file' 
      onChange={handleFileChange} 
      className='import-button'
      ref={fileInputRef}
      accept=".py"
      style={{display:'none'}}
    ></input>
    <span className='import-button' onClick={handleUploadClick}><FaFileImport size={20} color='white'></FaFileImport></span>
    <span className='upload-button' onClick={togglePopUp}><MdFileUpload  size={25} color='white'/></span>
    {isPopUpVisible &&(
      <div className='popUp'>
        <p>保存するスロットを選択して下さい</p>
        <div className='program_container'>
          <div className="program_items">
            <button className="program_buttons_hot" onClick={()=>handleDownload(0)}>スロット１</button></div>
          <div className="program_items">
            <button className="program_buttons_hot" onClick={()=>handleDownload(1)}>スロット２</button></div>
          <div className="program_items">
            <button className="program_buttons_hot" onClick={()=>handleDownload(2)}>スロット３</button></div>
        </div>
        
      </div>
    )}
    </>

  );
}

export default EditScript;
