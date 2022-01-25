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
function Update(props) {

const id = props.id;

  const [pname, setPname] = useState(props.name);
  const [bday, setBday] = useState("");

  const pressCancel = () => {
    props.closeModal(false)
  };

  const updatePeople = async (id) => {
    await axios.put(`http://localhost:3001/update/${id}`, 
    {
      name: pname,
      bday: bday
    })
    .then(() => {
      props.closeModal(false)
    
    })
  };

  console.log("render: " + pname);
  console.log(id);


  return (
    <div>
      <Card>
        <h3>Update Birthday</h3>
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

          <button button onClick={() => updatePeople(id)}>
            Update
          </button>
        </form>
        <BtnExit onClick={() => pressCancel()}>Cancel</BtnExit>
      </Card>
    </div>
  );
}

export default Update;
