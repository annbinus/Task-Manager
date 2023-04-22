import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { TaskData } from './TaskData'; // Imports Task data

function Task(props) {
    const { subjectIDFromSubject } = props; /* Passes in subjectIDFromSubject */
    const [taskOpen, setTaskOpen] = React.useState(false); /* Initializes taskOpen using useState */
    const toggleTask = (taskId) => { /* Function for toggling task*/
        setTaskOpen((prevState) => {
            return {
                ...prevState,
                [taskId]: !prevState[taskId],
            };
        });
    };
    
    return (
        <div className='Task'>
            <ul className='TaskList'>
                {TaskData.filter(TaskData => TaskData.subjectID === subjectIDFromSubject).map((val, key) => {
                    const taskId = `${subjectIDFromSubject}-${key}`;
                    return (
                        <li
                            key={key}
                            className='TaskRow'
                            onClick={() => {
                                toggleTask(taskId);
                            }}
                        >
                            <div id='TaskName'>{val.name}</div>
                            <div id='TaskDesc' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}> {/* Changes display of taskOpen to none or block */}
                                {val.desc}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Task;