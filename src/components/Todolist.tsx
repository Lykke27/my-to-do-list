import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import Button from "@material-ui/core/Button"
import '../App.css';
import SaveIcon from "@material-ui/icons/Save";
import {ButtonGroup} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

export type FilterValuesType = 'all' | 'active' | 'done';
type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const setAllFilter = () => {
        props.changeFilter("all")
    }
    const setActiveFilter = () => {
        props.changeFilter("active")
    }
    const setDoneFilter = () => {
        props.changeFilter("done")
    }

    return (
        <div>
            <h2>{props.title}</h2>
            <TextField value={title}
                       onChange={updateInput}
                       onKeyPress={onKeyPressAddTask}
                       label={"Task to do"}
                       placeholder={'Enter something'}
            />
            <Button startIcon={<SaveIcon/>}
                    size={"small"}
                    onClick={addTask}
                    variant="contained"
                    color="primary">Add</Button>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id)
                        return (
                            <li>
                                <span className="task">
                                 <Checkbox
                                     checked={t.isDone}
                                     color={"primary"}
                                 />
                                 <span>{t.title}</span>
                                 <Button
                                     startIcon={<DeleteIcon/>}
                                     onClick={removeTask}
                                     variant="contained"
                                     color="secondary"/>
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={setAllFilter}>All</Button>
                    <Button onClick={setActiveFilter}>Active</Button>
                    <Button onClick={setDoneFilter}>Done</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}