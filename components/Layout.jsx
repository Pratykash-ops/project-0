import react, { useEffect } from 'react'
import Header from './Header'
import {Poppins} from "next/font/google"
import Footer from './Footer'
import { useRouter } from 'next/router'

const PoppinsFont = Poppins({
    weight: "300",
    subsets: ["latin"]
})
export default function Layout({children}){
    const router = useRouter()
    useEffect(()=>{
        if(router.query.reload){
            router.push(router.basePath).then(()=> router.reload())
            // router.reload()
        }
    }, [router.query])
    return <>
    <div className='overflow-x-hidden max-w-[100vw] min-h-[100vh]'
    style={{
        fontFamily: PoppinsFont.style.fontFamily
    }}
    >
        <Header/>
        <main className='p-5 min-h-screen'>
        {children}
        </main>
        <Footer/>
    </div>
        </>
}