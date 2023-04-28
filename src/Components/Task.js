import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { setTaskData } from './Task'; // Imports Task data
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Subject from './Subject'
import fetchData from './Subject'

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
                [taskId]: buttonsOpen ? true : !prevState[taskId],
            };
        });
    };

    const handleMoveUpClick = (taskId) => {
      console.log('Moving task up: ' + taskId);
      axios
        .get('http://localhost:5000/tasks/' + taskId)
        .then((res) => {
          console.log(res.data);

          const currentSubjectId = res.data.subjectID;
    
          console.log('Current subjectID: ' + currentSubjectId);
          
          
          //try {
          //  axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
          //} catch (err) {
          //  console.log(`Error updating tasks: ${err}`);
          //}
        })
        .catch((err) => {
          console.log(`Error updating tasks: ${err}`);
        });
    };

    const handleMoveDownClick = (taskId) => {
      console.log('Moving task down: ' + taskId);
    };

    const handleEditNameChange = (event, taskId) => {
      console.log(event.target.value); // logs the updated value of the textarea
      axios
        .get('http://localhost:5000/tasks/' + taskId)
        .then((res) => {
          console.log(res.data);

          const task = {
            name: event.target.value,
            start: res.data.start,
            deadline: res.data.deadline,
            completed: "false",
            description: res.data.description
          };
    
          console.log(task)
    
          try {
            axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
          } catch (err) {
            console.log(`Error updating tasks: ${err}`);
          }
        })
        .catch((err) => {
          console.log(`Error updating tasks: ${err}`);
        });
    };

    const handleEditDescChange = (event, taskId) => {
      console.log(event.target.value); // logs the updated value of the textarea
      axios
        .get('http://localhost:5000/tasks/' + taskId)
        .then((res) => {
          console.log(res.data);

          const task = {
            name: res.data.name,
            start: res.data.start,
            deadline: res.data.deadline,
            completed: "false",
            description: event.target.value
          };
    
          console.log(task)
    
          try {
            axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
          } catch (err) {
            console.log(`Error updating tasks: ${err}`);
          }
        })
        .catch((err) => {
          console.log(`Error updating tasks: ${err}`);
        });
    };

    const handleEditStartChange = (event, taskId) => {
      console.log(event.target.value); // logs the updated value of the textarea
      axios
        .get('http://localhost:5000/tasks/' + taskId)
        .then((res) => {
          console.log(res.data);

          const task = {
            name: res.data.name,
            start: event.target.value,
            deadline: res.data.deadline,
            completed: "false",
            description: res.data.description
          };
    
          console.log(task)
    
          try {
            axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
          } catch (err) {
            console.log(`Error updating tasks: ${err}`);
          }
        })
        .catch((err) => {
          console.log(`Error updating tasks: ${err}`);
        });
    };

    const handleEditEndChange = (event, taskId) => {
      console.log(event.target.value); // logs the updated value of the textarea
      axios
        .get('http://localhost:5000/tasks/' + taskId)
        .then((res) => {
          console.log(res.data);

          const task = {
            name: res.data.name,
            start: res.data.start,
            deadline: event.target.value,
            completed: "false",
            description: res.data.description
          };
    
          console.log(task)
    
          try {
            axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
          } catch (err) {
            console.log(`Error updating tasks: ${err}`);
          }
        })
        .catch((err) => {
          console.log(`Error updating tasks: ${err}`);
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
                  axios.delete('http://localhost:5000/tasks/' + taskId)
                       .then(res => console.log(res.data)); // task deleted!
    
                  fetchData();
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
                                <textarea disabled={!buttonsOpen} onChange={(event) => handleEditNameChange(event, val._id)} id='TaskName' defaultValue={val.name}></textarea>
                                <button id='TaskMoveUpButton' style={{ display: !buttonsOpen ? 'grid' : 'none' }} onClick={() => handleMoveUpClick(val._id)}><ArrowUpwardIcon /></button>
                                <button id='TaskMoveDownButton' style={{ display: !buttonsOpen ? 'grid' : 'none' }} onClick={() => handleMoveDownClick(val._id)}><ArrowDownwardIcon /></button>
                                <button id='TaskDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={ () => handleDeleteClick(val._id)}><DeleteIcon /></button>
                            </div>
                            <textarea disabled={!buttonsOpen} onChange={(event) => handleEditDescChange(event, val._id)} id='TaskDesc' style={{ display: taskOpen[taskId] ? 'block' : 'none' }} defaultValue={val.description}></textarea>
                            <div id='TaskStartWrapper'>
                                <div id='TaskStartText' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}>Start: </div>
                                <textarea disabled={!buttonsOpen} id='TaskStart' onChange={(event) => handleEditStartChange(event, val._id)} style={{ display: taskOpen[taskId] ? 'block' : 'none' }} defaultValue={val.start}></textarea>
                            </div>
                            <div id='TaskEndWrapper'>
                                <div id='TaskEndText' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}>End: </div>
                                <textarea disabled={!buttonsOpen} id='TaskDeadline' onChange={(event) => handleEditEndChange(event, val._id)} style={{ display: taskOpen[taskId] ? 'block' : 'none' }} defaultValue={val.deadline}></textarea>
                            </div>
                            <div id='TaskEndEnder' style={{ display: taskOpen[taskId] ? 'block' : 'none' }}></div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

}

export default Task;