import React from "react";

const postUserData = async (data) => {
  const jsonData = {
    UserID: data.name,
    Password: data.password
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonData)
  };

  try {
    const response = await fetch('http://localhost:8000/', requestOptions);
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
    throw error;  // 必要に応じてエラーを再スロー
  }
};

export default postUserData;
