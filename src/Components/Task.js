import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { TaskData } from './TaskData'; // Imports Task data

function Task() {
    return (
        <div className='Task'>
            <ul className='TaskList'> {/* Different tasks lists */}
                {TaskData.map((val, key)=> {
                    return (
                        <li 
                        key={key} 
                        className='TaskRow'
                        >
                            <div id='TaskName'>{val.name}</div> {/* Applies task's name */}
                            <div id='TaskName'>{val.desc}</div> {/* Applies task's descripition */}
                        </li>
                    )
                })}
            </ul>
        </div>
        );
    }

export default Task