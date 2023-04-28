import React, { useState, useEffect } from 'react';
import '../AppMain.css';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';

function Subject() {

  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  })
  const [buttonStates, setButtonStates] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [taskData, setTaskData] = useState([]);

  // Here this is the actual fetch of the data to be shown
  // we use useEffect because we don't want to write a class for it, and helps with asynch problems, - Caden
  useEffect(() => {
    async function fetchData() {
      try { // main try
        const res = await axios.get('http://localhost:5000/subjects/'); // get from database asynchronously - Caden
        setSubjectData(res.data); // Tasks information - Caden
        setButtonStates(res.data.map(() => false)); // toggles between edit / view mode - Caden
      } catch (err) { // error catch
        console.log(`Error getting subjects: ${err}`);
      }
    }
    async function fetchTaskData()
    {
      try { // main try
        const taskres = await axios.get('http://localhost:5000/tasks/'); // get from database asynchronously - Caden
        setTaskData(taskres.data); // Tasks information - Caden
      } catch (err) { // error catch
        console.log(`Error getting tasks: ${err}`);
      }
    }

    // actually perform it, - Caden
    fetchData();
    fetchTaskData();
  }, []);

  const toggleButtons = (subjectID, databaseID) => {
    setButtonStates(buttonStates.map((state, index) => index === subjectID ? !state : state));
    updateTasks(databaseID);
  };

  function updateTasks(subjectID, databaseID) {
    console.log(subjectID)

    const updateTasks = taskData.filter((task) => task.subjectID === subjectID);

    console.log("Update Ran")
    console.log(updateTasks)

    updateTasks.forEach((updateTask) => {
      
      const task = {
        name: document.getElementById('TaskName').value,
        start: document.getElementById('TaskStart').value,
        deadline: document.getElementById('TaskDeadline').value,
        completed: "false",
        description: document.getElementById('TaskDesc').value
      };

      console.log(task)

      try {
        axios.put('http://localhost:5000/tasks/update/' + updateTask._id, task).then((res) => console.log(res.data));
      } catch (err) {
        console.log(`Error updating tasks: ${err}`);
      }
    });
  }

  // Deleting on the edit concept
  const handleDeleteClick = (subjectID) => {
    confirmAlert({ // check to make sure user is cleared to delete
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this subject?',
      buttons: [
        {
          label: 'Yes', // on yes
          onClick: () => {
            try {
              
              // Find the subject in DB, filter out the one with val & index. - Caden
              axios.delete('http://localhost:5000/subjects/'+subjectID)
                .then(res => console.log(res.data));
                
              // returning the elements of the array that are NOT at given subjectID - Caden
              const updatedSubjects = subjectData.filter((val, index) => index !== subjectID);
              
              // update as needed - Caden
              setSubjectData(updatedSubjects);
            } catch (err) {
              console.log(`Error deleting subject: ${err}`);
            }
          }
        },
        {
          label: 'No',
          onClick: () => {} // dont delete it! - Caden
        }
      ]
    });
  };

  const handleAddTaskClick = async (subjectID) =>
  {
    const task = {
      "name" : "",
      "start" : "2023-4-16",
      "deadline" : "2023-4-26",
      "completed" : "false",
      "description" : "",
      "subjectID" : subjectID
    }

    try
    {
      axios.post('http://localhost:5000/tasks/add', task)
        .then(res => console.log(res.data));
    } catch (err)
    {
      console.log(`Error signing up: ${err}`);
    }

    const newTask = { name: '', start: "", deadline: "", completed: "false", description: "", subjectID: subjectID };
    const updatedTasks = [...taskData, newTask];

    //console.log(newTask)
    console.log("SubjectID: " + subjectID)

    setTaskData(updatedTasks);
  }

  const handleAddClick = async (event) => 
  {
    event.preventDefault()

    const subject = {
      "name" : "test",
      "boardID" : "643d5c4899b0d1975d321640"
    }

    try
    {
      axios.post('http://localhost:5000/subjects/add', subject)
        .then(res => console.log(res.data));
    } catch (err)
    {
      console.log(`Error signing up: ${err}`);
    }

    const newSubject = { name: 'test', boardID: '' };
    const updatedSubjects = [...subjectData, newSubject];

    setSubjectData(updatedSubjects);

    // quick fix to adding newly changed subjects that couldn't be deleted. 
    // basically just set it's button states so it can be changed. - Caden 
    setButtonStates([...buttonStates, false]);
  }

  return (
    <div className='Subject'>
      <ul className='SubjectList'>
        {subjectData.map((val, subjectID) => {
          const buttonsOpen = buttonStates[subjectID];
          const buttonIcon = buttonsOpen ? <CheckIcon /> : <EditIcon />;
          const tasks = taskData.filter(
            (task) => task.subjectID === val._id
          );
          return (
            <li 
              key={subjectID} 
              className='SubjectRow'
              style={{ backgroundColor: '#7E7E7E' }} // A beautiful grey - Caden
            >
              <div id='SubjectWrapper'>
                <div id='SubjectName'>{val.name}</div>
                <button id='SubjectButton' onClick={() => toggleButtons(subjectID, val._id)}>{buttonIcon}</button>
              </div>
              <div id='SubjectTasks'><Task tasks={tasks} isOpen={buttonsOpen} /></div>
              <button id='SubjectDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleDeleteClick(subjectID)}><DeleteIcon /></button>
              <div id='TaskAddName' style={{ display: buttonsOpen ? 'grid' : 'none' }}>New Task</div>
              <button id='TaskAddButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleAddTaskClick(val._id)}><AddIcon /></button>
            </li>
          )
        })}
        <button id='SubjectAddWrapper' onClick={handleAddClick}>
          <div id='SubjectAddName'>New Subject</div>
          <div id='SubjectAddButton'><AddIcon /></div>
        </button>
      </ul>
    </div>
  );
}

export default Subject;