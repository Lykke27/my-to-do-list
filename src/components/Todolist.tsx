import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@material-ui/core/Button"
import '../App.css';
import SaveIcon from "@material-ui/icons/Save";
import {ButtonGroup} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography'

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
    changeStatus: (id:string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
       if (title.trim() !== ''){
           props.addTask(title)
           setTitle('')
       } else {
           setError('Title is required')
       }
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
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
        <div className={"toDoList"}>
            <div className={"wrapper"}>
                <Typography variant={"subtitle1"}>
                    <h2>{props.title}</h2>
                </Typography>

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
                {error &&  <div className="error-message">{error}</div>}
                <ul>
                    {
                        props.tasks.map(t => {
                            const removeTask = () => props.removeTask(t.id)
                            const changeCheckboxStatus = (e:ChangeEvent<HTMLInputElement>) => {
                                let newCheckboxValue = e.currentTarget.checked;
                                props.changeStatus(t.id, newCheckboxValue)
                            }
                            return (
                                <li className={"li-style"}>
                                    <Checkbox
                                        checked={t.isDone}
                                        color={"primary"}
                                        onChange={changeCheckboxStatus}
                                    />
                                    <span>{t.title}</span>
                                    <Button
                                        onClick={removeTask}
                                        variant="contained"
                                        color="secondary"
                                        size={"small"}
                                    >x</Button>
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
        </div>
    )
}
