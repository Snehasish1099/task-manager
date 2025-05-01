import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import TaskOutlined from '@mui/icons-material/TaskOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import DownLoadIcon from '@mui/icons-material/Download'

const Header = (props) => {

  const navigate = useNavigate()
  const routeLocation = useLocation()

  return (
    <div className='bg-blue-800 h-[8vh] !w-full flex justify-end items-center px-[3%]'>

      {localStorage.getItem('token') ?
        <div className='flex gap-4'>
          <div className={`flex items-center gap-2 py-[5%] cursor-pointer px-2`} onClick={() => navigate('/tasks')}>
            <TaskOutlined className='text-white cursor-pointer' />
            <p className={`text-white text-sm`}>{"Tasks"}</p>
          </div>

          {routeLocation?.pathname === '/tasks' &&
            <div
              className={`flex items-center gap-2 py-[5%] cursor-pointer px-2`}
              onClick={() => props.handleExport()}
            >
              <DownLoadIcon className='text-white' />
              <p className={`text-white text-sm`}>{"Export Excel"}</p>
            </div>
          }

          <div
            className={`flex items-center gap-2 py-[5%] cursor-pointer px-2`}
            onClick={() => {
              localStorage.clear();
              navigate('/login')
            }}
          >
            <LogoutIcon className='text-white' />
            <p className={`text-white text-sm`}>{"Logout"}</p>
          </div>
        </div>
        :
        <div className='flex gap-4'>
          <div onClick={() => navigate('/register')} className={`font-medium text-white text-sm leading-5 cursor-pointer tracking-[0.15px] flex gap-2 hover:underline`}>
            <p>{"Register"}</p>
          </div>
          <div onClick={() => navigate('/login')} className={`font-medium text-white text-sm leading-5 cursor-pointer tracking-[0.15px] flex gap-2  hover:underline`}>
            <p>{"Login"}</p>
          </div>
        </div>
      }

    </div >
  )
}

export default Header