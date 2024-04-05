import { useRouter } from "next/router"
import react, { useState } from "react"

export default function Earn() {
    let [TermsAccepted, setTermsAccepted] = useState(false)
    let [ErrorMsg, setErrorMsg] = useState("")
    let [Loading, setLoading] = useState(false)
    const router = useRouter()
    const join = async () => {
        setLoading(true)
        setErrorMsg("")
        const raw = await fetch(`/api/auth/join?termsAccepted=${TermsAccepted}`, {
            method: "POST"
        })
        const res = await raw.json()
        if(raw.ok){
            router.push("/dashboard")
            router.reload()
        }
        else{
            setErrorMsg(res.msg)
        }
        setLoading(false)
    }
    return <div className="flex flex-col items-center relative">
        <div>
        
        <div className="termsSection">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Terms of Use for Freelancers</h1>
                <p className="mb-4">Welcome to Project 0! Here are the basic rules for using our platform:</p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="mb-2">Be Honest: Provide accurate information about yourself and your skills.</li>
                    <li className="mb-2">Do Good Work: Deliver high-quality work that meets the project requirements.</li>
                    <li className="mb-2">Respect Others: Treat students and fellow freelancers with kindness and professionalism.</li>
                    <li className="mb-2">Get Paid Fairly: You'll get paid for the work you do, as agreed with the student.</li>
                    <li className="mb-2">Keep it Original: Don't copy others' work. Make sure your work is original.</li>
                    <li className="mb-2">Listen to Feedback: Be open to feedback from students and improve your services.</li>
                    <li className="mb-2">Follow the Rules: If you break these rules, your account may be suspended.</li>
                </ul>
                <p>If you have any questions, feel free to ask.</p>
            </div>
        </div>
        <div className="Confirm self-start">
            <div className="form-control mb-2">
                <label className="cursor-pointer label">
                    <span className="label-text mr-4">I accept the terms</span>
                    <input type="checkbox" onChange={(e)=> setTermsAccepted(e.target.checked)} className="checkbox checkbox-success" />
                </label>
            </div>
            <p className="text-error text-sm">{ErrorMsg}</p>
            <button onClick={join} className="btn bt-sm btn-success" disabled={Loading}>
                Start earning now!
            </button>
        </div>
        </div>
    </div>
}