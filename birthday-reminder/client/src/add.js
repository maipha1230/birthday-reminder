import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const Card = styled.div`
  width: 350px;
  height: 500px;
  display: block;
  position: fixed;
  z-index: 10px;
  background: #ffff;
  border: none;
  border-radius: 4px;
  box-shadow: var(--dark-shadow);
  top: 10%;
  left: 38.5%;
  text-align: center;
  padding: 16px 32px;
`;
const Input = styled.input`
  width: 200px;
  height: 32px;
  border: 1px solid gray;
  border-radius: 4px;
  margin: 16px;
  font-size: 18px;
  padding-left: 1rem;
  color: hsl(209, 61%, 16%);
`;
const InputBtn = styled.input`
    font-size: 16px
    margin: 10px auto;   
    cursor: pointer;
    padding: 16px 40px ;
    border-radius: 2px;
    border: none;
    
`;
const BtnExit = styled.button`
  font-size: 16px;
  background: #fff;
  color: hsl(209, 61%, 16%);
  display: flex;
  border: none;
  justify-content: center;
  &:hover {
    cursor: pointer;
    background: red;
  }
`;
function Add({ closeModal }) {

  
  const [pname, setPname] = useState("");
  const [bday, setBday] = useState("");
  const [img, setImg] = useState({});

  const saveImg = (e) => {
    setImg(e.target.files[0]);
    console.log(img);
  };

  const pressCancel = () => {
    closeModal(false);
  };

  const addPeople = async () => {
    const data = new FormData();
    data.append("file", img);
    data.append("name", pname);
    data.append("bday", bday);
    console.log(data);
    await axios.post("http://localhost:3001/add", data)
    .then((res) => {
      closeModal(false)
    });
  };

  console.log("render: " + pname);
  console.log("render: " + img);

  return (
    <div>
      <Card>
        <h3>add more birthday</h3>
        <form action="">
          <h4 htmlFor="name">Name:</h4>
          <Input
            type="text"
            className="name"
            value={pname}
            onChange={(event) => setPname(event.target.value)}
            required
          />
          <h4 htmlFor="birthday">Birth day:</h4>
          <Input
            type="date"
            className="birth"
            value={bday}
            onChange={(e) => {
              setBday(e.target.value);
            }}
          />

          <InputBtn type="file" name="image" onChange={saveImg} />
          <button button onClick={() => addPeople()}>
            Add
          </button>
        </form>
        <BtnExit onClick={() => pressCancel()}>Cancel</BtnExit>
      </Card>
    </div>
  );
}

export default Add;
