import React, { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { MdFileUpload } from "react-icons/md";
import { FaFileImport } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { PopUp } from "../../components/popUp";

import "./EditScript.css";

const EditScript = ({userId}) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const togglePopUp = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        if (editorRef.current) {
          editorRef.current.setValue(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const sendFile = async (content, num) => {
    const jsonData = {
      UserID: userId.toString(),
      slot: num,
      program: content,
      language: "python",
    };
    try {
      const response = await fetch(
        "https://hpaiddjrprewsmr3kjbbvk5sfe0jmuyd.lambda-url.ap-northeast-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify(jsonData),
          mode: "cors",
        }
      );
      if (response.ok) {
        alert("ファイルがアップロードされました")
        console.log("File uploaded successfully");
        // navigate(`/initial/${userId}`);
      } else {
        alert("ファイルをアップロードできませんでした")
        console.error("File upload failed");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("end");
  };

  const handleDownload = (num) => {
    setIsLoading(true);
    if (editorRef.current) {
      const content = editorRef.current.getValue();
      console.log(content);
      sendFile(content, num);
      togglePopUp();
    }
    setIsLoading(false);
  };

  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage="python"
        defaultValue="# some commnet"
        onMount={handleEditorDidMount}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="import-button"
        ref={fileInputRef}
        accept=".py"
        style={{ display: "none" }}
      ></input>
      <span className="import-button" onClick={handleUploadClick}>
        <FaFileImport size={20} color="white"></FaFileImport>
      </span>
      <span className="upload-button" onClick={togglePopUp}>
        <MdFileUpload size={25} color="white" />
      </span>
      {isPopUpVisible && (
        <PopUp onClose={togglePopUp} allowClose={true}>
          <p>保存するスロットを選択して下さい</p>
          <div className="select_save_slot">
            <button
              className={"secondary " + (isLoading ? "loading" : "")}
              onClick={() => handleDownload(0)}
            >
              <div className="label">スロット１</div>
            </button>
            <button
              className={"secondary " + (isLoading ? "loading" : "")}
              onClick={() => handleDownload(1)}
            >
              <div className="label">スロット２</div>
            </button>
            <button
              className={"secondary " + (isLoading ? "loading" : "")}
              onClick={() => handleDownload(2)}
            >
              <div className="label">スロット３</div>
            </button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default EditScript;
