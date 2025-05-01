import React from 'react'
import Header from './Header'

const HomePage = () => {
  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-100'>
      <Header />
      <div className="flex-grow flex items-center justify-center">
        {"Welcome to Task Manager"}
      </div>
    </div>
  )
}

export default HomePage