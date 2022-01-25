import React, { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Update from "./Update";
import Add from './add'
import axios from "axios";

const List = () => {

  const [people, setPeople] = useState([]);

  const [updateModal, setUpdateModal] = useState(false);
  const [ updateId, setUpdateId ] = useState()
  const [ updateName, setUpdateName ] = useState('')
  const [ updateBday, setUpdateBday ] = useState(null)
  const [ updatePic, setUpdataePic ] = useState('')
  const [addModal, setAddModal] = useState(false);
  
  
  const toggleAddModal = () => {
    setAddModal(true);
  };


  
  
  useEffect(() => { //use for fetch birthday when page render
    fetchPeople()
  },[])


  const fetchPeople = async () => {// fetch birthdays list from database
    await axios.get('http://localhost:3001/')
    .then((response) => {
      setPeople(response.data)
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

 

  //UpdateModal toggle
  const toggleUpdateModal = (id, name, bday, pic) => {
    setUpdateModal(true);
    setUpdateId(id)
    setUpdateName(name)
    setUpdateBday(bday)
    setUpdataePic(pic)
  };

  //delete Bday person from list
  const deletePeople = (id) => {
    const delId = id
    axios.delete(`http://localhost:3001/delete/${delId}`)
    .then((response) => {
      setPeople(
        people.filter((val) => {
        return val.id !== id
      }))

    })
  }

  const clearAll = async () => {// clear all bday from list
    await axios.delete('http://localhost:3001/clear')
    .then((response) => {
      setPeople([])
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const btnDel = {
    backGroundColor: "red",
    width: "24px",
    height: "24px",
    position: "absolute",
    top: "-40px",
    right: "2px",
  };
  const btnUpdate = {
    backGround: "red",
    width: "24px",
    height: "24px",
    position: "absolute",
    top: "-40px",
    right: "30px",
  };

  return (

    <>
        <section className="container">

    <h3> {people.length} in birthdays list</h3>
      {people.map((person) => {
        const { id, name, Bday, pic } = person;
        const today = new Date().getFullYear();
        const bday = new Date(Bday);
        const age = today - bday.getFullYear();
        return (  
            <article key={id} className="person">
              <img src={pic} alt={name} />
              <div style={{ position: "relative" }}>
                <button style={btnDel} className="delete">
                  <FontAwesomeIcon
                    onClick={() => deletePeople(id)}
                    style={{
                      width: 16,
                      height: 16,
                      position: "absolute",
                      top: 0,
                      right: 1.5,
                    }}
                    icon={faUserMinus}
                  ></FontAwesomeIcon>
                </button>
                <button style={btnUpdate} className="update">
                  <FontAwesomeIcon
                    onClick={() => toggleUpdateModal(id, name, bday, pic)}
                    style={{
                      width: 16,
                      height: 16,
                      position: "absolute",
                      top: 0,
                      right: 1.5,
                    }}
                    icon={faUserEdit}
                  ></FontAwesomeIcon>
                </button>
                <h4>{name}</h4>
                <p>{age} years</p>
              </div> 
            </article>              
        );
      })}        
      <button onClick={() => toggleAddModal()}>Add birthday</button>
      <button onClick={() => clearAll()}>Clear all</button>

      { addModal && <Add closeModal={setAddModal} />}
      
      { updateModal && <Update closeModal={setUpdateModal}  id={updateId} name={updateName} bday={updateBday} pic={updatePic} /> }
      </section>
    </>
  );
};
export default List;
