import React, { useState } from 'react';
import '../AppMain.css';
//import { SubjectData } from './SubjectData';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from 'axios';

function Subject() {
  // var help;
  // const user = {
  //   "username": "jonathan",
  //   "password": "pass",
  // }

  // try
  // {
  //   axios.post('http://localhost:5000/users/signin', user)
  //     .then(res => console.log(res.data));
  // } catch (err)
  // {
  //   console.log(`Error signing up: ${err}`);
  // }
  var buttonStates;
  var setButtonStates;
  try
    {
      axios.get('http://localhost:5000/subjects/')
        .then(res => {
          console.log(res.data)
          getData(res.data);
          //[buttonStates, setButtonStates] = useState(SubjectData.map(() => false))
        }); // User added!
    } catch (err)
    {
      console.log(`Error signing up: ${err}`);
    }
  

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

  function getData(Data){
    console.log(Data);
    return (
      <div className='Subject'>
        <ul className='SubjectList'>
          {Data.map((val, subjectID) => {
            const buttonsOpen = buttonStates[subjectID];
            const buttonIcon = buttonsOpen ? <CheckIcon /> : <EditIcon />;
            return (
              <li 
                key={subjectID} 
                className='SubjectRow'
                style={{ backgroundColor: val.color }}
              >
                <div id='SubjectWrapper'>
                  <div id='SubjectName'>{val.name}</div>
                  <button id='SubjectButton' onClick={() => toggleButtons(subjectID)}>{buttonIcon}</button>
                </div>
                <div id='SubjectTasks'>{val.tasks(buttonsOpen)}</div>
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
}

export default Subject;
