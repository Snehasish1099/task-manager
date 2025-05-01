import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import LoginIndex from "../containers/authentication/LoginIndex"
import RegistrationIndex from '../containers/authentication/RegistrationIndex';
import TaskIndex from '../containers/tasks/TaskIndex';
import HomePage from '../common/HomePage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<HomePage />} />
            <Route path='login' element={<LoginIndex />} />
            <Route path='register' element={<RegistrationIndex />} />
            <Route path="/tasks" element={<TaskIndex />} />
        </>
    )
)

export default router