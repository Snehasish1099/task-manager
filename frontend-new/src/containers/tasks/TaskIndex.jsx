import React from 'react'
import { TaskHooks } from './Hooks'
import TaskPage from '../../components/TaskPage'
import Header from '../../common/Header'

const TaskIndex = () => {

    const { getAllTasksApiCall, createTasksApiCall, tasks, updateTasksApiCallById,
        deleteTasksApiCallById,
        // handleExportApiCall,
        handleExport
    } = TaskHooks()
    return (
        <>
            <Header handleExport={() => handleExport(tasks)}/>
            <TaskPage
                getAllTasksApiCall={getAllTasksApiCall}
                createTasksApiCall={createTasksApiCall}
                tasks={tasks}
                updateTasksApiCallById={updateTasksApiCallById}
                deleteTasksApiCallById={deleteTasksApiCallById}
            // handleExportApiCall={handleExportApiCall}
            />
        </>
    )
}

export default TaskIndex