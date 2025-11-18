import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-full max-w-5xl mx-auto '>
        {children}
    </div>
  )
}
