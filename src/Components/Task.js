import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
//import { TaskData } from './TaskData'; // Imports Task data
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Subject from './Subject'

function Task({tasks, isOpen}) {
    const TaskData = tasks; /* Passes in subjectIDFromSubject */
    const buttonsOpen = isOpen; // Fixed a bug where the deletion icons weren't deleting on tasks, was splitting up into buttonsOpen instead of isOpen - Caden
    
    // console.log("buttonsOpen: " + buttonsOpen) // for debugging purposes - Caden

    const [taskOpen, setTaskOpen] = React.useState(false); /* Initializes taskOpen using useState */
    const toggleTask = (taskId) => { /* Function for toggling task*/
        setTaskOpen((prevState) => {
            return {
                ...prevState,
                [taskId]: !prevState[taskId],
            };
        });
    };

    const handleDeleteClick = (taskId) => {
        confirmAlert({
          title: 'Confirm deletion',
          message: 'Are you sure you want to delete this task?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                // Delete the task here
                try
                {
                  axios.delete('http://localhost:5000/tasks/'+ taskId)
                       .then(res => console.log(res.data)); // task deleted!
                } catch (err)
                {
                  console.log(`Error deleting: ${err}`);
                }
              }
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };

    return (
        <div className='Task'>
            <ul className='TaskList'>
                {TaskData.map((val, key) => {
                    const taskId = TaskData[TaskData.length - 1];
                    return (
                        <li
                            key={key}
                            className='TaskRow'
                            onClick={() => {
                                toggleTask(taskId);
                            }}
                        >
                            <div id='TaskWrapper'>
                                <textarea disabled={!buttonsOpen} id='TaskName' defaultValue={val.name}></textarea>
                                <button id='TaskDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={ () => handleDeleteClick(val._id)}><DeleteIcon /></button>
                            </div>
                            <textarea disabled={!buttonsOpen} id='TaskDesc' style={{ display: taskOpen[taskId] ? 'block' : 'none' }} defaultValue={val.desc}></textarea>
                            <div id='TaskStart' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}> {/* Changes display of taskOpen to none or block */}
                                Start: {val.start}
                            </div>
                            <div id='TaskDeadline' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}> {/* Changes display of taskOpen to none or block */}
                                End: {val.deadline}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}

export default Task;