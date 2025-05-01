import React, { useState } from 'react'
import ButtonField from '../common/ButtonField';
import TextFieldInput from '../common/TextFieldInput';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { Icon, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginPage = (props) => {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data, '# data');
    props.LoginApiCall(data)
  };

  const [showPassword, setShowPassword] = useState(true)
  const navigate = useNavigate()

  return (
    <div className='w-full flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="w-full max-w-lg flex flex-col justify-center items-center bg-white p-5 rounded-lg shadow-md mt-5">

        <h2 className="text-2xl font-bold my-4 text-center">{"Login"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
          <div>
            <Controller name={"username"}
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  (<TextFieldInput
                    textnewclass={`w-full text-sm `}
                    floatingLabel='Username'
                    value={value}
                    onChange={onChange}
                  />)
                )
              }}
              rules={{
                required: true, pattern: /^[a-zA-Z][a-zA-Z ]*/i
              }}
            />
            {errors.username && errors.username.type === "required" && (
              <span className="error-message text-red-400 text-xs">Required</span>
            )}
            {errors.username && errors.username.type === "pattern" && (
              <span className="error-message text-red-400 text-xs">Not Valid</span>
            )}
          </div>

          <div className={`pb-[2%]`}>
            <Controller
              name={"password"}
              control={control}
              rules={{
                minLength: 2,
                maxLength: 30,
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <TextFieldInput
                  textnewclass={`w-full text-sm`}
                  typePassword={showPassword}
                  floatingLabel="Password"
                  onChange={onChange}
                  value={value}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        <Icon className="text-20" color="action" tabIndex={-1}>
                          {showPassword ?
                            <VisibilityOffIcon sx={{ color: '#747774' }} />
                            :
                            <RemoveRedEyeIcon sx={{ color: '#747774' }} />}
                        </Icon>
                      </IconButton>
                    </InputAdornment>}
                />
              )}
            />
            {errors.password && errors.password.type === "required" && (
              <span className={""}>Please enter your password</span>
            )}
          </div>

          <ButtonField
            type='submit'
            variant={'outlined'}
            buttonName={"Login"}
            buttonextracls={`!px-2 !py-2 !text-white ${props.loading === true && 'bg-grey-300'} !bg-orange-600 !text-sm !w-full hover:!bg-blue-400 hover:!text-black`}
            loading={props.loading}
            disabled={props.loading === true ? true : false}
            onClick={handleSubmit(onSubmit)}
          />
        </form>

        <p className='text-black text-xs'>{"Don't have an account?"}&nbsp;<span onClick={() => navigate('/register')} className='text-blue-600 cursor-pointer underline'>{"Register"}</span></p>
      </div>
    </div>
  )
}

export default LoginPage