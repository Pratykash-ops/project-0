import Image from 'next/legacy/image'
import React from 'react'

export default function ProfilePicture({name, loading=false, size=8}) {
  const possibleClasses = ['w-8 h-8']
  return (
    <><div className="avatar mx-1">
    <div className={`w-${size} h-${size} mask mask-squircle ${loading ? "skeleton" : ""} relative z-50`}>
      <Image layout='fill' objectFit='fill' src={`https://api.dicebear.com/8.x/thumbs/png?seed=${name.replace(" ", '-')}`} />
    </div>
  </div></>
  )
}
