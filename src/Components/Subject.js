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
  const [buttonStates, setButtonStates] = useState([]);
  const [subjectData, setSubjectData] = useState([]);

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

    // actually perform it, - Caden
    fetchData();
  }, []);

  const toggleButtons = (subjectID) => {
    setButtonStates(buttonStates.map((state, index) => index === subjectID ? !state : state));
  };

  const handleDeleteClick = () => {
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this subject?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Delete the subject here
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
    <div className='Subject'>
      <ul className='SubjectList'>
        {subjectData.map((val, subjectID) => {
          const buttonsOpen = buttonStates[subjectID];
          const buttonIcon = buttonsOpen ? <CheckIcon /> : <EditIcon />;
          return (
            <li 
              key={subjectID} 
              className='SubjectRow'
              style={{ backgroundColor: '#7E7E7E' }} // A beautiful grey
            >
              <div id='SubjectWrapper'>
                <div id='SubjectName'>{val.name}</div>
                <button id='SubjectButton' onClick={() => toggleButtons(subjectID)}>{buttonIcon}</button>
              </div>
              <div id='SubjectTasks'><Task tasks={val.tasks} isOpen={buttonsOpen} /></div>
              <button id='SubjectDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }} onClick={handleDeleteClick}><DeleteIcon /></button>
              <div id='TaskAddName' style={{ display: buttonsOpen ? 'grid' : 'none' }}>New Task</div>
              <button id='TaskAddButton' style={{ display: buttonsOpen ? 'grid' : 'none' }}><AddIcon /></button>
            </li>
          )
        })}
        <button id='SubjectAddWrapper'>
          <div id='SubjectAddName'>New Subject</div>
          <div id='SubjectAddButton'><AddIcon /></div>
        </button>
      </ul>
    </div>
  );
}

export default Subject;