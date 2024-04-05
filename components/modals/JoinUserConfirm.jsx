import Image from "next/legacy/image"
import react, { useState } from "react"
import ImageWithFallback from "../base/ImageWithFallback"
import Link from "next/link"
import generateUsername from "../../core/libs/username"
import useModal from "../../hooks/useModal"
import {useRouter} from "next/router"

export default function JoinUserConfirm({ data , token}) {
    const {closeModal} = useModal()
    const router = useRouter()
    const [Config, setConfig] = useState({
        username: generateUsername(),
        loading: false,
        errorMsg : ''
    })
    const confirm  = async ()=>{
        setConfig((prev)=>({...prev, loading :true, errorMsg : ""}))
        const raw = await fetch("/api/auth/signup", {
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : Config.username,
                token
            })
        })
        const res = await raw.json()
        setConfig((prev)=>({...prev, loading :false}))
        if(res.sessionToken){
            localStorage.setItem("session", res.sessionToken);
            router.push(res.next)
        }
        else{
            setConfig((prev)=>({...prev , errorMsg: res.msg}))
        }
    }
    return <div className="flex flex-col items-start p-9 bg-base-100 space-y-4 rounded-lg max-w-96 md:max-w-[47vw]">
        <h2 className="text-xl font-semibold">Confirmation</h2>
        <div className="flex items-start justify-center space-x-8 ">
            <div className="flex flex-col items-center">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative">
                        <ImageWithFallback fallbackSrc={"/static/user_icon.png"} src={data?.ClientImage} layout="fill" objectFit="cover" />
                    </div>
                </div>
                <h5 className="text-sm p-4">You</h5>
            </div>
            <div className="flex flex-col items-center">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 relative">
                        <ImageWithFallback fallbackSrc={"/static/user_icon.png"} src={data?.verificationData.GuardianImage} layout="fill" objectFit="cover" />
                    </div>
                </div>
                <h5 className="text-sm p-4">Guardian/Parent<br />
                    <span className="text-green-500 font-semibold capitalize">
                        {data?.verificationData.GuardianName.toLowerCase()}
                    </span>
                </h5>
            </div>
        </div>
        <span className="text-info text-xs ">The above data is not stored on our servers, its from your school/institutions database.</span>
        <div>
            <h2>Guide</h2>
            <ol className="text-xs space-y-2 ">
                <li>To protect your privacy, we have a codename for you, which you can also change later.</li>
                <div className="mx-2 bg-secondary/30 p-2 border-l-4 border-secondary-content">
                    <p>Your Username: <span className="font-semibold">{Config.username}</span></p>
                    <button className={"btn btn-link btn-xs"} onClick={()=> setConfig((prev)=>({...prev, username : generateUsername()}))}>random</button>
                </div>
                <li>Please respect others on the platform its place to help people, not to hurt people</li>
                <li>While posting any work make sure to clearly mention details.</li>
                <li>If you're finding work here, please cooperate with the people, and if you face any issue you can contact us on our discord server.</li>
                <button className="link text-purple-400 text-sm">
                    <Link href={"https://discord.gg/PzrMCpswhs"}>Discord</Link>
                </button>
            </ol>
        </div>
        <span className="text-xs text-error">{Config.errorMsg}</span>
        <div className="flex">
        <button disabled={Config.loading} onClick={confirm} className="btn btn-sm btn-primary">Join !</button>
        <button onClick={closeModal} className="btn btn-sm btn-error">Cancel X</button>
        </div>
    </div>
}