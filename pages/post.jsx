import React, { useEffect, useState } from 'react'
import Input from '../components/base/Input'
import { FaHeartPulse } from 'react-icons/fa6'
import { useRouter } from 'next/router'

export default function post() {
  const router = useRouter()
  const [Config, setConfig] = useState({
    categories: [],
    selectedCategories: [],
    title: '',
    desc: '',
    categorySearch: '',
    budget: '',
  })
  useEffect(() => {
    fetch("/api/data/category").then(async (raw) => {
      const res = await raw.json()
      setConfig((prev) => ({ ...prev, categories: res }))
    })
  }, [])
  const selectCategory = (id) => {
    const selectedCategory = Config.categories.find((v) => v.id == id);
    const newCategoryArr = Config.categories.filter((v) => v.id != id);
    const newSelectedCategoryArr = Config.selectedCategories.concat([selectedCategory]);
    setConfig((prev) => ({ ...prev, categories: newCategoryArr, selectedCategories: newSelectedCategoryArr }));
  }
  const removeCategory = (id) => {
    const removingCategory = Config.selectedCategories.find((v) => v.id == id);
    const newSelectedCategoryArr = Config.selectedCategories.filter((v) => v.id != id);
    const newCategoryArr = Config.categories.concat([removingCategory]);
    setConfig((prev) => ({ ...prev, categories: newCategoryArr, selectedCategories: newSelectedCategoryArr }));
  }
  useEffect(() => {
    let timout = setTimeout(() => {
      fetch(`/api/data/category?query=${Config.categorySearch}`).then(async (raw) => {
        const res = await raw.json()
        const filterCategories = res.filter((v) => {
          const selectedIds = Config.selectedCategories.map(v => v.id)
          return !selectedIds.includes(v.id)
        })
        setConfig((prev) => ({ ...prev, categories: filterCategories }))
      })
    }, 1000)
    return () => {
      clearTimeout(timout)
    }
  }, [Config.categorySearch])
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setConfig((prev) => ({ ...prev, [name]: value }))
  }
  const postProject = async () => {
    setConfig((prev) => ({ ...prev, loading: true }))
    const raw = await fetch("/api/client/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: Config.title,
        desc: Config.desc,
        categoryIds: Config.selectedCategories.map(v => v.id),
        budget: Config.budget
      })
    })
    const res = await raw.json()
    if (raw.ok) {
      router.push("/").then(()=>router.reload())
    }
    else {
      setConfig((prev) => ({ ...prev, errorMsg: res.msg }))
    }
    setConfig((prev) => ({ ...prev, loading: FaHeartPulse }))
  }
  return (
    <div className='flex md:flex-row flex-col justify-center relative space-x-16'>
      <div className="form-control space-y-4">
        <Input placeholder="What's the title" value={Config.title} onChange={handleChange} name="title" label='Title' />
        {/*  */}
        <div id="txtArea-inp">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea className="textarea textarea-bordered min-h-24 w-80 max-h-72" value={Config.desc} onChange={handleChange} name="desc" placeholder="Describe the work"></textarea>
        </div>
        {/*  */}
        <Input placeholder="what's your budget in inr" type="number" value={Config.budget} onChange={handleChange} name="budget" label='Budget' />
        <div className="tags max-w-80">
          <h3>Selected Tags</h3>
          <div className="flex-wrap mt-3">
            {Config.selectedCategories.map((v, i) => <div key={i} pr0-data-id={v.id} onClick={() => removeCategory(v.id)} className="badge badge-error badge-outline gap-2 m-1 text-sm cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              {v.name}
            </div>)}
          </div>
        </div>
        <button onClick={postProject} className="btn">Post </button>
      </div>
      <div className="tagArea p-4 my-3 max-w-80">
        <h2 className="text-lg">Categories</h2>
        <div className="ISearch">
          <Input placeholder='Search' name="categorySearch" value={Config.categorySearch} onChange={handleChange} varient='sm' />
        </div>
        <div className="flex-wrap mt-3">

          {Config.categories.map((v, i) => <div key={i} pr0-data-id={v.id} onClick={() => selectCategory(v.id)} className="badge badge-success badge-outline gap-2 m-1 text-sm cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            {v.name}
          </div>)}
        </div>
      </div>
    </div>
  )
}
