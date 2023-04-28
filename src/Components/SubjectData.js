import axios from "axios"
import React from "react"
import Task from "./Task"

// Data for subjects in array form containing objects
export const SubjectData = [
    {
        name: "Not Started",
        color: "#FFC680",
        tasks: (buttonsOpen) => <Task subjectIDFromSubject={1} buttonsOpen={buttonsOpen} />
    },
    {
        name: "In Progress",
        color: "#A4E8FF",
        tasks: (buttonsOpen) => <Task subjectIDFromSubject={2} buttonsOpen={buttonsOpen} />
    },
    {
        name: "Completed",
        color: "#ADFF92",
        tasks: (buttonsOpen) => <Task subjectIDFromSubject={3} buttonsOpen={buttonsOpen} />
    }
]