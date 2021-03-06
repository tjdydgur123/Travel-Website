import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("Failed to save the Image in Server");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    // const newImages = Images.filter(
    //   (img) => currentIndex !== Images.indexOf(img)
    // );

    const newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => {
          return (
            <div onClick={() => deleteHandler(image)} key={index}>
              <img
                style={{ minWidth: "300px", width: "300px", height: "240px" }}
                src={
                  process.env.NODE_ENV === "development"
                    ? `http://localhost:4000/${image}`
                    : `https://fortravel.herokuapp.com/${image}`
                }
                alt={""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileUpload;
