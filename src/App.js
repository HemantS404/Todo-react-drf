import { useRef, useState, useEffect } from "react";
import './App.css'

function App() {

  const [listOfToDo, setListOfToDo] = useState(JSON.parse(localStorage.getItem('listOfToDo')) || [])
  const [toDoName, setToDoName] = useState('')
  const [toDoTime, setToDoTime] = useState('')

  const inputName = useRef(null)
  const inputTime = useRef(null)

  useEffect(()=>{
    localStorage.setItem('listOfToDo', JSON.stringify(listOfToDo))
  }, [listOfToDo])

  const deleteTodo = (index) =>{
    listOfToDo.splice(index, 1)
    setListOfToDo([...listOfToDo])
  }

  const toggle = (index) =>{
    listOfToDo[index].completed = (listOfToDo[index].completed === 'false') ? 'true' : 'false'
    setListOfToDo([...listOfToDo])
  }

  const submitButton = () =>{
    inputName.current.value = ''
    inputTime.current.value = ''
    inputName.current.focus()
    toDoName !== '' && toDoTime !== '' ? setListOfToDo([...listOfToDo, {'name':toDoName,'time':toDoTime,'completed': 'false'}]): alert("Name & Time Can't be null")
    setToDoName('')
    setToDoTime('')
  }

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="input">
        <div className="text">
          Name : <input type="text" ref = {inputName} onInput={(event) => setToDoName(event.target.value)}/>
        </div>
        <div className="time">
          Time : <input type="time" ref = {inputTime} onInput={(event) => setToDoTime(event.target.value)}/>
        </div>
        <button onClick={submitButton}>Submit</button>
      </div>
      {listOfToDo.map((todo, index) =>{
        return(
          <div className = {`TODO ${todo.completed}`} >
            <div className="texty">
              <p>Name : {todo.name}</p>
              <p>Time : {todo.time}</p>
              <p>Status : {todo.completed === 'true'?'Completed':'Incomplete'}</p>
              </div>
            <div className="buttony">
              {todo.completed === 'true'?<button onClick={()=>toggle(index)}><i className="fa fa-toggle-off"></i></button>:<button onClick={()=>toggle(index)}><i className="fa fa-toggle-on"></i></button>}
              <button onClick={()=>deleteTodo(index)}><i className="fa fa-trash-o"></i></button>
            </div>
          </div>
      )})}
    </div>
  );
}

export default App;
