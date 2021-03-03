import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, Todolist} from "./components/Todolist";
import {v1} from 'uuid'

function App() {
    const [tasks, setTasks] = useState([

        {id: v1(), title: "milk", isDone: false},
        {id: v1(), title: "bread", isDone: true},
        {id: v1(), title: "chips", isDone: false},
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

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }
    const removeTask = (id: string) => {
        const newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist title="What to buy"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
