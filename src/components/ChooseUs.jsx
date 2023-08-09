import React from 'react'

const ChooseUs = ({content}) => {
  return (
    <div className='max-w-[380px] lg:max-w-[315px] rounded border hover:bg-yellow-400 shadow-md flex flex-col items-center lg:items-start gap-2 p-3 lg:p-5 group'>
        <div className='bg-orange-100 group-hover:bg-slate-50 rounded-lg flex justify-center items-center w-12 p-1 h-12'>
          <img src={content.icon} alt="icon" />
        </div>
        <h3 className='font-medium text-xl'>{content.title}</h3>
        <p className='text-gray-600 lg:text-start text-center'>{content.desc}</p>
    </div>
  )
}

export default ChooseUs