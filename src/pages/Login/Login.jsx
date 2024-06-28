import React, { useState } from "react";
import "./Login.css";
import postUserData from "../../components/postUserData";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);

    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "名前を入力してください";
    }
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください";
    }

    if (Object.keys(newErrors).length === 0) {
      const result = await postUserData(formData);
      if (result) {
        navigate(`/initial/${formData.name}`);
      } else {
        setFormData({ name: "", password: "" });
        setErrors({});
        newErrors.name = "名前またはパスワードが違います";
        setErrors(newErrors);
        console.log("error");
      }
    } else {
      setErrors(newErrors);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevError) => ({
      ...prevError,
      [e.target.name]: "",
    }));
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <h1 className="heading">ログイン</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>名前:</label>
              {errors.name && <span className="error">{errors.name}</span>}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
              ></input>
            </div>
            <div className="form-field">
              <label>パスワード:</label>
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
              ></input>
            </div>
            <div className="actions">
              <button
                type="submit"
                className={"primary " + (isLoading ? "loading" : "")}
              >
                <div className="label">ログイン</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
