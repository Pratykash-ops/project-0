import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useUser } from '../context/user';
import JobPostListItem from '../components/base/JobPostListItem';

export default function dashboard() {
  const {user} = useUser()
  const router = useRouter()
  const [Listings, setListings] = useState([]);
  useEffect(()=>{
    fetch("/api/data/listProjects").then(async (raw)=>{
      const res = await raw.json()
      if(raw.ok){
        setListings(res)
      }
      else{
        router.push("/earn")
      }
    })
  }, [])
  return (
    <div className='md:mx-36 mx-2'>
      <div>
        <h2 className='text-2xl font-bold my-5'>Listings</h2>
        <div>
          {Listings.map((v,i)=><JobPostListItem applyEnabled={true} key={i} {...v}/>)}
        </div>
      </div>
      
    </div>
  )
}
