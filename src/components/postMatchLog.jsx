import React from "react";

const postMatchLog = async (Logid) => {
  var res;
  await fetch(
    "https://hdtym70xm0.execute-api.ap-northeast-1.amazonaws.com/CHaserAPI/FetchGameLog",
    {
      method: "POST",

      mode: "cors",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ LogID: Logid }),
    },
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.body)
      res = data.body;
      return res;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return res;
};

export default postMatchLog;
