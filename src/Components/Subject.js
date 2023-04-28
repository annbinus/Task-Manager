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

function Subject()
{

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
  useEffect(() =>
  {
    async function fetchData()
    { // function to recieve and display subjects
      try
      { // main try
        const userID = sessionStorage.getItem('userID'); // PASSES IN USERID FROM SESSIONSTORAGE
        const res = await axios.get(`http://localhost:5000/subjects/?userID=${userID}`); // PASSES IN USERID AS QUERY
        setSubjectData(res.data); // Tasks information - Caden
        setButtonStates(res.data.map(() => false)); // toggles between edit / view mode - Caden
      } catch (err)
      { // error catch
        console.log(`Error getting subjects: ${err}`);
      }
    }
    async function fetchTaskData() // function to recieve and display tasks
    {
      try
      { // main try
        const userID = sessionStorage.getItem('userID')
        const taskres = await axios.get(`http://localhost:5000/tasks/?userID=${userID}`); // get from database asynchronously - Caden
        console.log(taskres.data);
        setTaskData(taskres.data); // Tasks information - Caden
      } catch (err)
      { // error catch
        console.log(`Error getting tasks: ${err}`);
      }
    }

    // actually perform it, - Caden
    fetchData();
    fetchTaskData();
  }, []);

  const toggleButtons = (subjectID, databaseID) =>
  {
    setButtonStates(buttonStates.map((state, index) => index === subjectID ? !state : state));
  };

  // Deleting on the edit concept
  const handleDeleteClick = (subjectID) =>
  {
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this subject?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
          {
            const userID = sessionStorage.getItem('userID'); // PASSES IN USERID FROM SESSIONSTORAGE
            axios.get(`http://localhost:5000/subjects/?userID=${userID}`) // PASSES IN USERID AS QUERY
              .then(res =>
              {
                console.log("Within Subject.js, subjectID: " + res.data[subjectID]._id);
                axios.delete('http://localhost:5000/subjects/' + res.data[subjectID]._id)
                  .then(res =>
                  {
                    console.log(res.data);
                    const updatedSubjects = subjectData.filter((val, index) => index !== subjectID);
                    setSubjectData(updatedSubjects);
                  })
                  .catch(err =>
                  {
                    console.log(`Error deleting subject: ${err}`);
                  });
              })
              .catch(err =>
              {
                console.log(`Error getting subjects: ${err}`);
              });
          }
        },
        {
          label: 'No',
          onClick: () => { } // do nothing if 'No' button clicked
        }
      ]
    });
  };



  const handleEditNameChange = (event, subjectID) =>
  {
    console.log("Editing subject")
    console.log(subjectID)
    console.log(event.target.value); // logs the updated value of the textarea

    const subject = {
      name: event.target.value
    };

    console.log(subject)

    try
    {
      axios.put('http://localhost:5000/subjects/update/' + subjectID, subject).then((res) => console.log(res.data));
    } catch (err)
    {
      console.log(`Error updating tasks: ${err}`);
    }
  };

  // Add subject
  const handleAddClick = async () => 
  {
    // event.preventDefault()

    // console.log(event);

    const subject = {
      "name": "New Subject",
      "boardID": "644355f2ddb0c25db2015643",
      "userID": sessionStorage.getItem('userID'),
    }

    try
    {
      axios.post('http://localhost:5000/subjects/add', subject)
        .then(res =>
        {
          console.log('Added a subject. Here is res.data:');
          console.log(res.data);
          console.log('Newly created subjectID: ' + res.data['_id']);
        });
    } catch (err)
    {
      console.log(`Error signing up: ${err}`);
    }
    const newSubject = { name: 'New Subject', boardID: '' }; // Changed from saying 'test' to 'New Subject' so the name doesn't change on refresh - Caden
    const updatedSubjects = [...subjectData, newSubject];
    setSubjectData(updatedSubjects);
    // quick fix to adding newly changed subjects that couldn't be deleted. 
    // basically just set it's button states so it can be changed. - Caden 
    setButtonStates([...buttonStates, false]);
    window.location.reload();
  }
  // Add task
  const handleAddTaskClick = async (subjectID) =>
  {
    const task = {
      "name": "New Task",
      "start": "2023-4-16",
      "deadline": "2023-4-26",
      "completed": "false",
      "description": "New Description",
      "subjectID": subjectID,
      "userID": sessionStorage.getItem('userID') // PASSES IN USERID FROM SESSIONSTORAGE
    }

    try
    {
      axios.post('http://localhost:5000/tasks/add', task)
        .then(res =>
        {
          console.log('Added a task. Here is res.data:');
          console.log(res.data);
          console.log('Newly created taskID: ' + res.data['._id']);
        });
    } catch (err)
    {
      console.log(`Error signing up: ${err}`);
    }

    const newTask = { name: "New Task", start: "2023-4-16", deadline: "2023-4-26", completed: "false", description: "New Description", subjectID: subjectID, "userID": sessionStorage.getItem('userID') };
    const updatedTasks = [...taskData, newTask];

    //console.log(newTask)
    console.log("SubjectID: " + subjectID)

    setTaskData(updatedTasks);
    window.location.reload();
  }


  return (
    <div className='Subject'>
      <ul className='SubjectList'>
        {subjectData.map((val, subjectID) =>
        {
          console.log('subjectData cur val:');
          console.log(val);

          console.log('subjectData cur subjectID:');
          console.log(subjectID);
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
                <textarea disabled={!buttonsOpen} onChange={(event) => handleEditNameChange(event, val._id)} id='SubjectName' defaultValue={val.name}></textarea>
                <button id='SubjectButton' onClick={() => toggleButtons(subjectID, val._id)}>{buttonIcon}</button>
              </div>
              <div id='SubjectTasks'><Task tasks={tasks} isOpen={buttonsOpen} /></div>
              <div>
                <div id='TaskAddName' style={{ display: buttonsOpen ? 'grid' : 'none' }}>New Task</div>
                <button id='TaskAddButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleAddTaskClick(val._id)}><AddIcon /></button>

              </div>
              <button id='SubjectDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={() => handleDeleteClick(subjectID)}><DeleteIcon /></button>
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