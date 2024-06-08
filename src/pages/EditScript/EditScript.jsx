import React, { useState, useRef} from 'react';
import postUserData from '../../components/postUserData'
import { Editor } from '@monaco-editor/react';
import { MdFileUpload   } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";

import './EditScript.css'

const EditScript = () => {

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileName,setFileName] = useState('')

  function handleEditorDidMount(editor,monaco){
    editorRef.current = editor
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

  const sendFile = async (content,fileName) =>{
    const file = new Blob([content],{type: 'text/plain'})
    const formData = new FormData()
    formData.append('file', file, fileName)

    try {
      const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('File upload failed');
    }
    } catch (error) {
      console.error(error);
    }
    console.log("end")


  }

  const handleDownload = () =>{
    if(editorRef.current){
      const content = editorRef.current.getValue();
      sendFile(content,'sample.js')
    }
  }


  return (
    <>
        <Editor
      height="90vh"
      defaultLanguage='javascript'
      defaultValue='// some commnet'
      onMount={handleEditorDidMount}
    />
    <input  
      type='file' 
      onChange={handleFileChange} 
      className='import-button'
      ref={fileInputRef}
      style={{display:'none'}}
    ></input>
    <span className='import-button' onClick={handleUploadClick}><FaFileImport size={20} color='white'></FaFileImport></span>
    <span className='upload-button' onClick={handleDownload}><MdFileUpload  size={25} color='white'/></span>
    </>

  );
}

export default EditScript;
