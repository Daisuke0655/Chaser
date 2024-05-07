import React, { useState } from 'react';
import './Login.css';


const Login = () => {
  const [formData,setFormData] = useState({
    name: '',
    password: '',
  })
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
      console.log('receive data')
      setFormData({ name: '', password: ''})
      setErrors({})
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
    <div className='container'>
      <h1 className='heading'>ログイン画面</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-field'>
          <label className='label'>名前:</label>
          {errors.name && <span className="error">{errors.name}</span>}
          <input 
            type='text'
            name='name'
            value={formData.name}
            onChange= {handleChange}
            className='input'
          ></input>
        </div>
        <div className='form-field'>
          <label className='label'>パスワード:</label>
          {errors.password && <span className="error">{errors.password}</span>}
          <input 
            type='text'
            name='password'
            value={formData.password}
            onChange= {handleChange}
            className='input'
          ></input>
        </div>
        <button type='submit' className='button'>
          ログイン
        </button>
      </form>
    </div>
  );
}

export default Login;
