import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";

const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Describtion, setDescribtion] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescribtion(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = () => {
    if (!Title || !Describtion || !Price || !Continent || !Images) {
      return alert("Please fill out all the fields");
    }

    const body = {
      writer: props.user.userData._id,
      title: Title,
      description: Describtion,
      price: Price,
      images: Images,
      continents: Continent,
    };

    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("Upload it successfully!");
        props.history.push("/");
      } else {
        alert("Failed to upload");
      }
    });
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "2rem auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Upload Travel Product</h2>
      </div>

      <Form onFinish={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>Describtion</label>
        <TextArea onChange={descriptionChangeHandler} value={Describtion} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
