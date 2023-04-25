import React, { useState } from 'react';
import '../AppMain.css';
import { SubjectData } from './SubjectData';
import Task from './Task';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

function Subject() {
  const [buttonStates, setButtonStates] = useState(SubjectData.map(() => false));

  const toggleButtons = (subjectID) => {
    setButtonStates(buttonStates.map((state, index) => index === subjectID ? !state : state));
  };

  return (
    <div className='Subject'>
      <ul className='SubjectList'>
        {SubjectData.map((val, subjectID) => {
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
                <div id='SubjectButton' onClick={() => toggleButtons(subjectID)}>{buttonIcon}</div>
              </div>
              <div id='SubjectTasks'>{val.tasks(buttonsOpen)}</div>
              <div id='SubjectDeleteButton' style={{ display: buttonsOpen ? 'grid' : 'none' }}><DeleteIcon /></div>
              <div id='SubjectAddButton' style={{ display: buttonsOpen ? 'grid' : 'none' }}><AddIcon /></div>
              <div id='SubjectAddName' style={{ display: buttonsOpen ? 'grid' : 'none' }}>New Task</div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Subject;
