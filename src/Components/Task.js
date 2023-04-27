import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { TaskData } from './TaskData'; // Imports Task data
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Task(props) {
    const { subjectIDFromSubject, buttonsOpen } = props; /* Passes in subjectIDFromSubject and buttonsOpen */

    const [taskOpen, setTaskOpen] = React.useState(false); /* Initializes taskOpen using useState */
    const toggleTask = (taskId) => { /* Function for toggling task*/
        setTaskOpen((prevState) => {
            return {
                ...prevState,
                [taskId]: buttonsOpen ? true : !prevState[taskId],
            };
        });
    };

    const handleMoveUpClick = (taskId) => {
      // Parse the subject ID and task index from the taskId string
      const [subjectID, taskIndex] = taskId.split('-').map(Number);
      
      // Find the task with matching taskId
      const taskToUpdate = TaskData.find((task, index) => index === taskIndex && task.subjectID === subjectID);
      
      if (!taskToUpdate) {
        console.log(`No task found with taskId ${taskId}`);
        return;
      }
      
      // Update the subjectID property of the matching task
      taskToUpdate.subjectID -= 1;
      
      console.log(`Updated subjectID of task ${taskId}`);
    };

    const handleMoveDownClick = (taskId) => {
      // Parse the subject ID and task index from the taskId string
      const [subjectID, taskIndex] = taskId.split('-').map(Number);
      
      // Find the task with matching taskId
      const taskToUpdate = TaskData.find((task, index) => index === taskIndex && task.subjectID === subjectID);
      
      if (!taskToUpdate) {
        console.log(`No task found with taskId ${taskId}`);
        return;
      }
      
      // Update the subjectID property of the matching task
      taskToUpdate.subjectID += 1;
      
      console.log(`Updated subjectID of task ${taskId}`);
    };

    const handleDeleteClick = (taskId) => {
        confirmAlert({
          title: 'Confirm deletion',
          message: 'Are you sure you want to delete this task?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                // Make HTTP DELETE request to delete task
                axios.delete(`/tasks/${taskId}`)
                .then(res => {
                    // Task deleted successfully, handle the response here
                    console.log(res.data);
                })
                .catch(err => {
                    // Error occurred while deleting task, handle the error here
                    console.log(err);
                });
              }
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        });
      };

      const handleEditChange = (event) => {
        console.log(event.target.value); // logs the updated value of the textarea
      }
    
    /*
    const handleDelete = async (event) =>
  {
    event.preventDefault()

    const user = {
      "username": values.username,
      "password": values.password,
    }

    try
    {
      axios.post('http://localhost:5000/tasks/delete')
        .then(res => console.log(res.data)); // User added!
    } catch (err)
    {
      console.log(`Error deleting: ${err}`);
    }
  }
  */


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
                            <div id='TaskWrapper'>
                                <textarea disabled={!buttonsOpen} onChange={handleEditChange} id='TaskName'>{val.name}</textarea>
                                <button id='TaskMoveUpButton' style={{ display: !buttonsOpen ? 'grid' : 'none' }} onClick={() => handleMoveUpClick(taskId)}><ArrowUpwardIcon /></button>
                                <button id='TaskMoveDownButton' style={{ display: !buttonsOpen ? 'grid' : 'none' }} onClick={() => handleMoveDownClick(taskId)}><ArrowDownwardIcon /></button>
                                <button id='TaskDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleDeleteClick(taskId)}><DeleteIcon /></button>
                            </div>
                            <textarea disabled={!buttonsOpen} onChange={handleEditChange} id='TaskDesc' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}>{val.desc}</textarea>
                            <textarea disabled={!buttonsOpen} onChange={handleEditChange} id='TaskStart' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}>{val.start}</textarea>
                            <textarea disabled={!buttonsOpen} onChange={handleEditChange} id='TaskDeadline' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}>{val.deadline}</textarea>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}

export default Task;