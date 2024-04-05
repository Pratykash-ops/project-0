import React from 'react';
import { useUser } from '../context/user';
import TimeAgo from 'javascript-time-ago'
import { useRouter } from 'next/router';

const timeago = new TimeAgo('en-US')
const WorkCard = ({title, description,budget,tags=[],createdAt,id }) =>{
  const router =useRouter()
  return <div className="card bg-base-200 relative">
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p className='truncate w-full h-20 text-sm  text-wrap overflow-clip'>{description}</p>
    <p>Budget: ₹ {budget}</p>
    <div className="flex-wrap gap-2">
      {tags.map(v=><div className='badge badge-success badge-outline mr-2'>{v.name}</div>)}
    </div>
    <div className="card-actions justify-between items-baseline">
      <span className='text-xs text-base-content'>
        {timeago.format(new Date(createdAt))}
        </span>
      <button onClick={()=>router.push(`/project/${id}`)}className="btn btn-primary">See details</button>
    </div>
  </div>
</div>
}
const ProfilePage = () => {
  const {user} = useUser()
  return (
    <div className='md:mx-20  mx-6'>
      <h1 className="text-xl font-bold mb-6">Your Postings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user && user.posts.map(v=><WorkCard key={v.id} id={v.id}title={v.title} description={v.description} budget={v.budget} createdAt={v.createdAt}tags={v.categories}/>)}
        {(user && user.posts.length == 0) && <h2>You didn't have posted anything yet</h2>}
      </div>
    </div>
  );
};

export default ProfilePage;
