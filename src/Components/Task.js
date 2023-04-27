import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { setTaskData } from './Task'; // Imports Task data
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Task({tasks, isOpen}) {
    const TaskData = tasks; /* Passes in subjectIDFromSubject */
    const buttonsOpen = isOpen;
    
    console.log("buttonsOpen: " + buttonsOpen)

    const [taskOpen, setTaskOpen] = React.useState(false); /* Initializes taskOpen using useState */
    const toggleTask = (taskId) => { /* Function for toggling task*/
        setTaskOpen((prevState) => {
            return {
                ...prevState,
                [taskId]: !prevState[taskId],
            };
        });
    };

    const handleDeleteClick = (taskID) => {
        confirmAlert({
          title: 'Confirm deletion',
          message: 'Are you sure you want to delete this task?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                // Delete the task here
                try {
              
                  // Find the subject in DB, filter out the one with val & index. - Caden
                  axios.delete('http://localhost:5000/subjects/'+taskID)
                    .then(res => console.log(res.data));
                    
                  // returning the elements of the array that are NOT at given subjectID - Caden
                  const updatedTasks = taskID.filter((val, index) => index !== taskID);
                  
                  // update as needed - Caden
                  setTaskData(updatedTasks);
                } catch (err) {
                  console.log(`Error deleting subject: ${err}`);
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
                                <button id='TaskDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleDeleteClick(val._id)}><DeleteIcon /></button>
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