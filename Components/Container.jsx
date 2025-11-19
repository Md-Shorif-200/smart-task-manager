import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-10 md:px-16 lg:px-20 xl:px-0 '>
        {children}
    </div>
  )
}
