import { useReducer, useState } from "react";
import { doDeleteApiCall, doGetApiCall, doPostApiCall, doPutApiCall } from "../../utils/ApiConfig"
import * as xls from 'xlsx';

export const TaskHooks = () => {
    const [tasks, setTasks] = useState([]);

    const reducer = (state, action) => {
        switch (action.type) {
            case "GET_SUCCESS":
                return action.payload
            default:
                break;
        }
    }
    const [state, dispatch] = useReducer(reducer, [])


    const createTasksApiCall = async (formdata, reset) => {
        let data = {
            url: `${process.env.REACT_APP_TASK_URL}/tasks/`,
            bodyData: {
                username: localStorage?.getItem('username'),
                title: formdata?.title,
                description: formdata?.description,
                effort_to_finish: formdata?.effort,
                due_date: formdata?.due_date,
            }
        }
        let res = await doPostApiCall(data)
        if (res?.status === 201) {
            getAllTasksApiCall()
            reset({
                title: '',
                description: '',
                effort: '',
                due_date: ''
            })
        } else {
            console.log("# creation of Task failed")
        }
    }

    const getAllTasksApiCall = async () => {
        let data = {
            url: `${process.env.REACT_APP_TASK_URL}/tasks/`,
        }
        let res = await doGetApiCall(data)
        if (res?.status === 200) {
            setTasks(res?.data)
            dispatch({ type: "GET_SUCCESS", payload: res?.data })
        } else {
            console.log("# get tasks unsuccessful")
        }
    }

    const updateTasksApiCallById = async (formData, id, reset) => {
        let data = {
            url: `${process.env.REACT_APP_TASK_URL}/tasks/${id}/`,
            bodyData: {
                username: localStorage?.getItem('username'),
                title: formData?.title,
                description: formData?.description,
                effort_to_finish: formData?.effort,
                due_date: formData?.due_date,
            }
        }
        let res = await doPutApiCall(data)
        if (res?.status === 200) {
            getAllTasksApiCall()
            reset({
                title: '',
                description: '',
                effort: '',
                due_date: ''
            })
        } else {
            console.log("# update task unsuccessful")
        }
    }

    const deleteTasksApiCallById = async (id) => {
        let data = {
            url: `${process.env.REACT_APP_TASK_URL}/tasks/${id}/`,
        }
        let res = await doDeleteApiCall(data)
        if (res?.status === 200) {
            getAllTasksApiCall()
        } else {
            console.log("# delete task unsuccessful")
        }
    }

    // const handleExportApiCall = async () => {
    //     try {
    //         let data = {
    //             url: `${process.env.REACT_APP_TASK_URL}/export-excel/`,
    //         }
    //         const res = await doGetApiCall(data)

    //         const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', `${localStorage.getItem('username')}_tasks.xlsx`);
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.log(error, "# Error while downloading excel")
    //     }
    // };

    const handleExport = () => {
        console.log(state, '# state')

        if (tasks && tasks?.length > 0) {
            const ws = xls.utils.json_to_sheet(tasks);
            const wb = xls.utils.book_new();
            xls.utils.book_append_sheet(wb, ws, 'Tasks');

            xls.writeFile(wb, 'tasks.xlsx');
        }
    };

    return {
        createTasksApiCall,
        getAllTasksApiCall,
        tasks,
        updateTasksApiCallById,
        deleteTasksApiCallById,
        // handleExportApiCall,
        handleExport,
        state
    }
}