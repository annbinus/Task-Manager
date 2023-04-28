import React from 'react'
import '../AppMain.css'; // Two dots to go outside of the components folder
import { setTaskData } from './Task'; // Imports Task data
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import AddIcon from '@mui/icons-material/Add';
import Subject from './Subject'
import fetchData from './Subject'
import { useState } from 'react';

function Task({ tasks, isOpen })
{
  const TaskData = tasks; /* Passes in subjectIDFromSubject */
  const buttonsOpen = isOpen; // Fixed a bug where the deletion icons weren't deleting on tasks, was splitting up into buttonsOpen instead of isOpen - Caden

  // console.log("buttonsOpen: " + buttonsOpen) // for debugging purposes - Caden

  const [taskOpen, setTaskOpen] = React.useState(false); /* Initializes taskOpen using useState */
  const [taskData, setTaskData] = useState([]);
  const toggleTask = (taskId) =>
  { /* Function for toggling task*/
    setTaskOpen((prevState) =>
    {
      return {
        ...prevState,
        [taskId]: !prevState[taskId],
        [taskId]: buttonsOpen ? true : !prevState[taskId],
      };
    });
  };

  const handleMoveUpClick = (taskId) => {
    console.log('Moving task up: ' + taskId);
    const userID = sessionStorage.getItem('userID'); // PASSES IN USERID FROM SESSIONSTORAGE
    axios
      .get(`http://localhost:5000/tasks/${taskId}`) // GETS ALL SUBJECTS AS "res"
      .then((res) => {
        curentSubjectId = res.data.subjectID;
      });

    axios
      .get(`http://localhost:5000/subjects/?userID=${userID}`) // GETS ALL SUBJECTS AS "res"
      .then((res) => {
        console.log('SUBJECT ID BEING MOVED TO: ' + res.data[2]._id);

        const currentSubjectIndex = res.data.findIndex(subject => subject._id === currentSubjectId); // FINDS CURRENT SUBJECT INDEX
        
        const newSubjectId = 0;
        if (currentSubjectIndex > 0)
          newSubjectId = res.data[curentSubjectIndex - 1]._id; // MOVE UP A SUBJECT BY -1
        else
        newSubjectId = res.data[curentSubjectIndex]._id; // OUT OF BOUNDS DONT MOVE UP

        axios
          .put(`http://localhost:5000/tasks/move/${taskId}/${newSubjectId}`)
          .then((res) => {
            console.log(res.data);
            // handle the response here if needed
          })
          .catch((err) => {
            console.log(`Error moving task: ${err}`);
          });

          window.location.reload();
      });
  };
  

  const handleMoveDownClick = (taskId) =>
  {
    console.log('Moving task down: ' + taskId);
  };

  const handleEditNameChange = (event, taskId) =>
  {
    console.log(event.target.value); // logs the updated value of the textarea
    axios
      .get('http://localhost:5000/tasks/' + taskId)
      .then((res) =>
      {
        console.log(res.data);

        const task = {
          name: event.target.value,
          start: res.data.start,
          deadline: res.data.deadline,
          completed: "false",
          description: res.data.description
        };

        console.log(task)

        try
        {
          axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
        } catch (err)
        {
          console.log(`Error updating tasks: ${err}`);
        }
      })
      .catch((err) =>
      {
        console.log(`Error updating tasks: ${err}`);
      });
  };

  
  const handleEditDescChange = (event, taskId) =>
  {
    console.log(event.target.value); // logs the updated value of the textarea
    axios
      .get('http://localhost:5000/tasks/' + taskId)
      .then((res) =>
      {
        console.log(res.data);

        const task = {
          name: res.data.name,
          start: res.data.start,
          deadline: res.data.deadline,
          completed: "false",
          description: event.target.value
        };

        console.log(task)

        try
        {
          axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
        } catch (err)
        {
          console.log(`Error updating tasks: ${err}`);
        }
      })
      .catch((err) =>
      {
        console.log(`Error updating tasks: ${err}`);
      });
  };

  const handleEditStartChange = (event, taskId) =>
  {
    console.log(event.target.value); // logs the updated value of the textarea
    axios
      .get('http://localhost:5000/tasks/' + taskId)
      .then((res) =>
      {
        console.log(res.data);

        const task = {
          name: res.data.name,
          start: event.target.value,
          deadline: res.data.deadline,
          completed: "false",
          description: res.data.description
        };

        console.log(task)

        try
        {
          axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
        } catch (err)
        {
          console.log(`Error updating tasks: ${err}`);
        }
      });
  };

  const handleEditEndChange = (event, taskId) =>
  {
    console.log(event.target.value); // logs the updated value of the textarea
    axios
      .get('http://localhost:5000/tasks/' + taskId)
      .then((res) =>
      {
        console.log(res.data);

        const task = {
          name: res.data.name,
          start: res.data.start,
          deadline: event.target.value,
          completed: "false",
          subjectID: res.subjectID,
          description: res.data.description
        };

        console.log(task)

        try
        {
          axios.put('http://localhost:5000/tasks/update/' + taskId, task).then((res) => console.log(res.data));
        } catch (err)
        {
          console.log(`Error updating tasks: ${err}`);
        }
      })
      .catch((err) =>
      {
        console.log(`Error updating tasks: ${err}`);
      });
  };




   

   const handleDeleteClick = (taskId) =>
   {
     console.log('taskId: '+taskId)
     confirmAlert({
       title: 'Confirm deletion',
       message: 'Are you sure you want to delete this task?',
       buttons: [
         {
           label: 'Yes',
           onClick: () =>
           {
             // Make HTTP DELETE request to delete task
             axios.delete(`http://localhost:5000/tasks/${taskId}`)
               .then(res =>
               {
                 // Task deleted successfully, handle the response here
                 console.log(res.data);
                 const updatedTasks = taskData.filter((val, index) => index !== taskId);
                setTaskData(updatedTasks);
                window.location.reload();
               })
               .catch(err =>
               {
                 // Error occurred while deleting task, handle the error here
                 console.log(err);
               });
           }
         },
         {
           label: 'No',
           onClick: () => { }
         }
       ]
     });
   };

  return (
    <div className='Task'>
      
      <ul className='TaskList'>
        {TaskData.map((val, key) =>
        {
          const taskId = TaskData[TaskData.length - 1];
          return (
            <li
              key={key}
              className='TaskRow'
              onClick={() =>
              {
                toggleTask(taskId);
              }}
            >
              
              <div id='TaskWrapper'>
              
                <textarea disabled={!buttonsOpen} onChange={(event) => handleEditNameChange(event, val._id)} id='TaskName' defaultValue={val.name}></textarea>
                <button id='TaskMoveUpButton' style={{ display: !buttonsOpen ? 'grid' : 'none' }} onClick={() => handleMoveUpClick(val._id)}><ArrowUpwardIcon /></button>
                <button id='TaskMoveDownButton' style={{ display: !buttonsOpen ? 'grid' : 'none' }} onClick={() => handleMoveDownClick(val._id)}><ArrowDownwardIcon /></button>
                <button id='TaskDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleDeleteClick(val._id)}><DeleteIcon /></button>
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