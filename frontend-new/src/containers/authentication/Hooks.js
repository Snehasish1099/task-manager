import { useNavigate } from "react-router";
import { doPostApiCall } from '../../utils/ApiConfig'

export const AuthHooks = () => {

    const navigate = useNavigate();

    // Registration API call
    const RegistrationApiCall = async (formData) => {
        const data = {
            url: `${process.env.REACT_APP_AUTH_URL}/register`,
            bodyData: {
                username: formData?.username,
                password: formData?.password,
            }
        }
        const res = await doPostApiCall(data)
        if (res?.status === 201) {
            navigate('/login')
        } else {

        }
    }

    // Login API call 
    const LoginApiCall = async (formdata) => {
        const data = {
            url: `${process.env.REACT_APP_AUTH_URL}/login`,
            bodyData: {
                username: formdata?.username,
                password: formdata?.password
            }
        }

        const res = await doPostApiCall(data)
        if (res?.status === 200) {
            localStorage.setItem('token', res?.token)
            localStorage.setItem('username', res?.user?.username)

            navigate(`/tasks`)
        } else {

        }
    }


    return {
        RegistrationApiCall,
        LoginApiCall
    }
}