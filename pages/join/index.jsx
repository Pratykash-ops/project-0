import Image from "next/image"
import { useRouter } from "next/router"
import react, { useEffect, useState } from "react"


function InstuCard({ name, code, userCount, img, tags = ["school"] }) {
  const router = useRouter()
  return <div className="card md:w-80 bg-base-100 shadow-xl image-full">
    <figure>
      <Image src="/static/white_house.jpg" height={400} width={800} alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">
        {name}
        <div className="badge badge-secondary">{userCount} Users</div>
      </h2>
      <p>Code: {code}</p>
      <div className="action">
        <button onClick={() => router.push(`/join/institution/${code}`)} className="btn btn-">Join</button>
      </div>
      <div className="card-actions justify-end">
        {tags.map(v => <div className="badge badge-outline">{v}</div>)}
      </div>
    </div>
  </div>
}
export default function Select({ data }) {
  const [Config, setConfig] = useState({
    data: [],
    loading: false
  })
  useEffect(() => {
    setConfig((prev) => ({ ...prev, loading: true }))
    fetch("/api/server/institution").then(async (raw) => {
      if (raw.ok) {
        const res = await raw.json()
        setConfig((prev) => ({ ...prev, data: res.data }))
      }
      setConfig((prev) => ({ ...prev, loading: true }))
    })
  }, [])
  return <>
    <div className="flex flex-col items-start mx-0 md:mx-9">
      <h2 className="text-2xl my-6">Select your school/institution</h2>
      <div className="search">
        <label className="input input-bordered flex items-center gap-6">
          <input type="text" className="grow" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {Config.data.map((v)=><InstuCard code={v.code} name={v.name} img={v.img} userCount={v._count.user}/>)}
      </div>
    </div>
  </>
}