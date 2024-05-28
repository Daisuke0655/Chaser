import React from "react"

const postMatchLog = async (LogID) => {
    await fetch("https://hdtym70xm0.execute-api.ap-northeast-1.amazonaws.com/CHaserAPI/FetchGameLog", 
        {
            method: 'POST',

            mode: 'cors',

            headers: {
                "LogID": LogID
            }

        }
    )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    })
    .catch((error) => {
        console.error("Error:", error)
    });

}

export default postMatchLog;