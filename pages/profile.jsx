import React from 'react'
import { useUser } from '../context/user'
import ProfilePicture from '../components/base/ProfilePicture'
import Image from "next/legacy/image"
import JobPostListItem from '../components/base/JobPostListItem'
export default function profile() {
  const { user, loading } = useUser()
  return (
    <div className='mx-0 md:mx-20'>
      {user ? <div className="flex flex-col md:flex-row justify-start">
        <div className="profileDetailsCol min-w-96 md:border-r-2 rounded-t-md md:rounded-l-lg overflow-hidden">
          <div className='w-96 h-44 relative'>
            <div className="opacity-40 bg-gray-600 absolute w-full h-full z-30"></div>
            <Image src={user.institution.img} layout='fill' objectFit='cover'></Image>
          </div>
          <div className='px-4 space-y-4 flex flex-col items-start justify-start -mt-16 z-40'>
            {/* <div className='relative h-24 w-24 '> */}
              <ProfilePicture name={user.name} size={24} />
            {/* </div> */}
            <hr />
            <h2 className="text-lg font-bold capitalize">{user.name}</h2>
            <div className="flex items-center text-sm ">
              <p>School Code name:</p> 
              <span className='text-primary font-bold ml-2 capitalize'>{user.institution.name}</span>
            </div>
            <h2 className="text-lg -mb-2">Academic Details</h2>
            {Object.keys(user.academicDetails).map((v)=>{
              if(v != "other"){
                return <div className="flex items-center text-sm ">
              <p>{v}:</p> 
              <span className='text-primary font-bold ml-2'>{user.academicDetails[v] || "Unknown"}</span>
            </div>
              }
            })}
            <h2 className="text-lg -mb-2">Account Details</h2>
            <div className="flex items-center text-sm ">
              <p>Email:</p> 
              <span className='text-primary font-bold ml-2'>{user.email || "Not given"}</span>
            </div>
            <div className="flex items-center text-sm ">
              <p>Projects:</p> 
              <span className='text-primary font-bold ml-2'>{user.posts.length || "0"}</span>
            </div>
          </div>
        </div>
        <div className="userContentCol md:px-12 md:block hidden">
          <div>
            <h2 className='text-xl mb-4 font-bold'>Your Posts</h2>
            <div>
              {user.posts.map((v)=>{
                return <JobPostListItem {...v}/>
              })}
              {user.posts.length == 0 && <h5>You didn't posted any work yet.</h5>}
            </div>
          </div>
        </div>
      </div> : loading ? <div className="flex justify-start">
        <div className="profileDetailsCol  border-r-2 rounded-l-lg overflow-hidden">
          <div className='w-96 h-44 relative skeleton'>
          </div>
          <div className='px-4 space-y-4 flex flex-col items-start justify-start -mt-16 z-20'>
            <div className='relative h-24 w-24'>
              <ProfilePicture name={"Jhon"} size={24} loading={true}/>
            </div>
            <hr />
            <span className="w-32 h-5 skeleton"></span>
            <div className="flex items-center text-sm ">
              <span className="w-44 h-4 skeleton"></span>
            </div>
          </div>
        </div>
      </div> : null}
    </div>
  )
}
