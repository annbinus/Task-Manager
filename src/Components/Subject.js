import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { SubjectData } from './SubjectData'; // Imports subject data

function Subject() {
    return (
        <div className='Subject'>
            <ul className='SubjectList'> {/* Different subjects lists */}
                {SubjectData.map((val, key)=> {
                    return (
                        <li 
                        key={key} 
                        className='SubjectRow'
                        style={{ backgroundColor: val.color }} /* Applies subject's color */
                        >
    
                            <div id='SubjectName'>{val.name}</div> {/* Applies subject's name */}
                            <div id='SubjectTasks'>{val.tasks}</div> {/* Applies subject's tasks */}
                        </li>
                    )
                })}
            </ul>
        </div>
        );
    }

export default Subject