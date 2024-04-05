import { useRouter } from "next/router"
import react, { Suspense, useState } from "react"
import useModal from "../../../hooks/useModal"
import dynamic from "next/dynamic"
import React from "react"
import ReactModal from "react-modal"

const JoinUserConfirm = dynamic(() => import("../../../components/modals/JoinUserConfirm"))

function Checkbox({ children }) {
    return <div className="form-control">
        <label className="cursor-pointer label">
            <span className="label-text">{children}</span>
            <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </label>
    </div>
}
export default function Inst() {
    const router = useRouter()
    const { openModal, modalActive, modalStyles, modalClass, closeModal } = useModal()
    const [data, setData] = useState({
        email: '',
        password: '',
        admn_no: '',
        errorMsg: ''
    })
    const [userConfirm, setUserConfirm] = useState({
        data: null,
        token: null
    })
    const handleChange = (e) => {
        const name = e.target.name
        setData((prev) => ({ ...prev, [name]: e.target.value }))
    }
    const handleSubmit = async () => {
        const raw = await fetch("/api/auth/confirm", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                admn_no: data.admn_no,
                InstCode: router.query.institution,
            })
        })
        const res = await raw.json()
        if (raw.ok) {
            setUserConfirm((prev) => ({ ...prev, ...res }))
            setData((prev)=>({...prev, errorMsg: ""}))
            openModal()
        }else{
            setData((prev)=>({...prev, errorMsg: res.msg}))
        }
    }
    return <>
        <div>
            <div className="m-9 mx-auto w-80">
                {/* <div>
                    <h2 className="text-2xl font-semibold">You are joining for</h2>
                    <div className="w-96">
                        <Checkbox>To hire someone</Checkbox>
                        <Checkbox>Finding work</Checkbox>
                    </div>
                </div> */}
                <div className="flex flex-col items-start border-t p-4 border-base-300">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">What is your addmission no.</span>
                        </div>
                        <input onChange={handleChange} value={data.admn_no} name="admn_no" type="text" placeholder="Addmision no." className="input input-bordered w-full max-w-xs" />
                    </label>
                <span className={"text-xs text-error"}>{data.errorMsg}</span>
                    <button onClick={handleSubmit} className="btn my-5">Join now!</button>
                </div>
            </div>
        </div>
        <ReactModal isOpen={modalActive} className={modalClass} style={modalStyles} onRequestClose={closeModal} shouldCloseOnEsc={true}>
            <Suspense fallback={<>Loading</>}>
                {modalActive &&
                    <JoinUserConfirm token={userConfirm.token}data={userConfirm.data} />
                }
            </Suspense>
        </ReactModal>
    </>
}