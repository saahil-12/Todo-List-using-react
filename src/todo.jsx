import { useState } from "react";
import "./todo.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(null);

  const addTask = () => {
    if(edit){
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newTask;
      setTasks([...updatedTasks]);
      setNewTask("");
      setEdit(false);
    }else{
      if(newTask.length){
        setTasks([...tasks, { text: newTask, completed: false , number: index}]);
        setNewTask("");
      }
    }
  };

  const deleteHandler = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  const completeHandler = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = updatedTasks[index].completed
      ? updatedTasks[index].completed
      : !updatedTasks[index].completed;
    setTasks(updatedTasks);
    
  };

  const editHandler=(index)=> {
    let edittext = tasks[index].text;
    setNewTask(edittext);
    setEdit(!edit);
    setIndex(index)
  }

  return (
    <div>
      <>
        <div className="addInput">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask }>{edit ? 'Update Task' : 'Add Task'}</button>
        </div>
        <div className="addInput">
          <ul className="orderListing">
            {tasks.map((item, index) => (
              <li key={index} className="listing">
                <span className="indexspan"> {index+1}.</span>
                <span className="textspan"
                    style={
                    {textDecoration: item.completed ? "oveline"  : "none",}
                    
                  }>
                  {item.text}
                
                </span>
                <div>
                  <button onClick={() => editHandler(index)}>
                    Edit
                  </button>
                  <button onClick={() => completeHandler(index) } 
                  style={{backgroundColor: tasks[index].completed? "green":""}}>
                  {item.completed? "Completed" : "complete"}
                  </button>
                  <button onClick={() => deleteHandler(index)}>
                    Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
}
