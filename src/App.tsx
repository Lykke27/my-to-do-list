import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./components/Todolist";


function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "milk", isDone: false},
        {id: 2, title: "bread", isDone: true},
        {id: 3, title: "chips", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (filter === "done") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (id: number) => {
        const newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to buy"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}

            />
        </div>
    );
}

export default App;
