import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function ProjectView() {
    const router = useRouter()
    useEffect(() => {
      console.log(router.query)
    }, [router.query])
    
  return (
    <div className='md:mx-20 mx-3'>
        <div className='flex flex-col items-start p-4 border-b space-y-3'>
            <h2 className='text-2xl font-bold'>Project title</h2>
            <p className='text-sm md:w-[50%] '>Project description Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus et qui illum itaque voluptates? Vero nam ipsam quod illo rem similique a aliquid consequatur fugiat dolorem quos, facere excepturi neque?</p>
            <div className='flex flex-wrap'>
                <div className="badge badge-outline mx-1">lorem</div>
                <div className="badge badge-outline mx-1">ipsum</div>
                <div className="badge badge-outline mx-1">dolor</div>
                <div className="badge badge-outline mx-1">sit amet</div>
            </div>
        </div>
    </div>
  )
}
