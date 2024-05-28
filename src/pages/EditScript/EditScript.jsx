import React, { useState, useRef} from 'react';
import postUserData from '../../components/postUserData'
import { Editor } from '@monaco-editor/react';
const Login = () => {
  const [formData,setFormData] = useState({
    name: '',
    password: '',
  })

  const editorRef = useRef(null);
  function handleEditorDidMount(editor,monaco){
    editorRef.current = editor
  }
  function showValue(){
    alert(editorRef.current.getValue())
  }

  const [errors,setErrors] = useState({})


  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(formData)

    const newErrors = {};

    if(!formData.name){
      newErrors.name = '名前を入力してください'
    }
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    }
  
    if(Object.keys(newErrors).length === 0){
      if(postUserData(formData)){
      }
      else{
        setFormData({ name: '', password: ''})
        setErrors({})
        newErrors.name = '名前またはパスワードが違います'
        setErrors(newErrors)
        console.log('error')
      }
    }else{
      setErrors(newErrors)
    }
  }

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value})
    setErrors((prevError) => ({
        ...prevError,[e.target.name]:''
    }))
  }

  return (
    // <div className='container'>
    //   <h1 className='heading'>ログイン画面</h1>
    //   <form className='form' onSubmit={handleSubmit}>
    //     <div className='form-field'>
    //       <label className='label'>名前:</label>
    //       {errors.name && <span className="error">{errors.name}</span>}
    //       <input 
    //         type='text'
    //         name='name'
    //         value={formData.name}
    //         onChange= {handleChange}
    //         className='input'
    //       ></input>
    //     </div>
    //     <div className='form-field'>
    //       <label className='label'>パスワード:</label>
    //       {errors.password && <span className="error">{errors.password}</span>}
    //       <input 
    //         type='password'
    //         name='password'
    //         value={formData.password}
    //         onChange= {handleChange}
    //         className='input'
    //       ></input>
    //     </div>
    //     <button type='submit' className='button'>
    //       ログイン
    //     </button>
    //   </form>
    // </div>
    <>
        <Editor
      height="90vh"
      defaultLanguage='javascript'
      defaultValue='// some commnet'
      onMount={handleEditorDidMount}
    />
    </>

  );
}

export default Login;
