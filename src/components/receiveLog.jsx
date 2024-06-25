import React from "react";

const receiveLog = async () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "",
  };

  try {
    fetch("http://localhost:8000/Log", requestOptions)
      .then((response) => response.json())
      .then((jsonObj) => {
        console.log(jsonObj.message);
        return jsonObj.message;
      });
  } catch (error) {
    console.error("Error:", error);
    throw error; // 必要に応じてエラーを再スロー
  }
};

export default receiveLog;
