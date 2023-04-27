import React from "react"
import Task from "./Task"
import axios from 'axios';

//Data for subjects in array form containing objects
// export var SubjectData = [
//     {
//         userId: 1,
//         name: "Not Started",
//         color: "#FFC680",
//         tasks: (buttonsOpen) => <Task subjectIDFromSubject={1} buttonsOpen={buttonsOpen} />
//     },
//     {
//         userId: 1,
//         name: "In Progress",
//         color: "#A4E8FF",
//         tasks: (buttonsOpen) => <Task subjectIDFromSubject={2} buttonsOpen={buttonsOpen} />
//     },
//     {
//         userId: 1,
//         name: "Completed",
//         color: "#ADFF92",
//         tasks: (buttonsOpen) => <Task subjectIDFromSubject={3} buttonsOpen={buttonsOpen} />
//     }
// ]
// var help;
// axios.get('http://localhost:5000/subjects/')
//     .then(res => {

//     }).finally(res => {
//         console.log(res.data)
//         help = res.data
//     })
// export var SubjectData = help;

// const getData = async () => {
//     const response = await axios.get('http://localhost:5000/subjects/');
//     return response;
// };

// export var SubjectData = await getData();