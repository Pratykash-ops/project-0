import React from 'react'

export default function Input({label="", placeholder="", value="", onChange, type='text',varient="", ...rest}) {
    const possibleClasses = 'input-sm input-xs input-lg'
  return (
    <div>
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">{label}</span>
  </div>
  <input {...rest} type={type} value={value} onChange={onChange} placeholder={placeholder} className={`input input-${varient} input-bordered w-full max-w-xs`} />
</label>
    </div>
  )
}
