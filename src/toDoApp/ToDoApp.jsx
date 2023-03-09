
import { useState } from 'react';
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import './scss/toDoApp.css';



const ToDoApp = () => {

 
  const [userInput, setUserInput] = useState('');
  const [userLists, setUserLists] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [updateData, setUpdateData] = useState(null);


  // add todo_lists function starts here----------->
  const addTodo = () => {
    if (!userInput) {
      alert('input field is empty');
    } else if (userInput && !toggle) {
      setUserLists(userLists?.map((elem) => {
        if (elem.id === updateData) {
          return { ...elem, name: userInput };
        }
        return elem;
      }))
      setUpdateData('');
      setToggle(true);
    } else {
      setUserLists(() => {
        const indv = { id: new Date().getTime().toString(), name: userInput }
        const updatedLists = [indv, ...userLists];
       return updatedLists;
      })

    }
    setUserInput('');
  }

console.log(userLists)
  // update todo_lists function starts here----------->
  const upDateTodo = (id) => {
    const findData = userLists.find((item) => {
      return item.id === id;
    })
    setUserInput(findData.name);
    setToggle(false);
    setUpdateData(id);
    // console.log(updateList);
  }


  // remove todo_lists function starts here--------------->
  const removeToDo = (id) => {
    alert(`Do you want to remove this item. `)

    const updatedLists = userLists.filter((lists) => lists.id !== id);
    setUserLists(updatedLists);
   

  }


  // remove all todo_lists function starts here------------>
  const removeAll = () => {
    alert('Are you sure to remove all the lists')

    setUserLists([])
    
  }



  return (
    // main container of toDo App --------------------->
    <div className="container">

      <h1>TODO LIST</h1>
      {/* input of toDo and add button  */}

      <div className="add_todo">
        <input className="input_todo" type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder='Add lists' />
        <button className="button_AddTodo" onClick={addTodo}>Add</button>

      </div>

      {/* toDo lists */}
      <div className="lists_todo">
        {userLists?.length >= 1 ? (<h3 style={{ color: 'white', marginBottom: '.25rem' }}>My lists:-</h3>) : ''}

        {userLists?.map((lists) => {
          return (
            <>
              <div className="lists" key={lists.id}>
                <p>{lists.name}</p><button onClick={() => upDateTodo(lists.id)} className="button_upDateTodo"><FaPen /></button><button onClick={() => removeToDo(lists.id)} className="button_RemoveTodo"><FaRegTrashAlt /></button>
              </div>
            </>
          )
        })}

        {/* remove all button and its functionality */}

        {userLists?.length > 1 ? (<button className="button_RemoveAll" onClick={removeAll}>Remove All</button>) : ''}


      </div>
    </div>
  )
}

export default ToDoApp;