import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { TaskData } from './TaskData'; // Imports Task data
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Task(props) {
    const { subjectIDFromSubject, buttonsOpen } = props; /* Passes in subjectIDFromSubject */

    const [taskOpen, setTaskOpen] = React.useState(false); /* Initializes taskOpen using useState */
    const toggleTask = (taskId) => { /* Function for toggling task*/
        setTaskOpen((prevState) => {
            return {
                ...prevState,
                [taskId]: buttonsOpen ? true : !prevState[taskId],
            };
        });
    };

    const handleDeleteClick = () => {
        confirmAlert({
          title: 'Confirm deletion',
          message: 'Are you sure you want to delete this task?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                // Delete the task here
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
                                <button id='TaskDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={handleDeleteClick}><DeleteIcon /></button>
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