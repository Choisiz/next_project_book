'use client'

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react"

export default function Error({error,reset}:{error:Error; reset:()=>void}){
    useEffect(()=>{
        console.log('error',error)
    },[error])

    const router = useRouter();
    

    return (
        <div>
            <div>북 에러 발생</div>
            <button onClick={()=>{
                startTransition(()=>{
                    router.refresh(); //현재페이지에 필요한 서버컴포넌트들을 다시 불러옴
                    reset(); //에러 초기화 및 컴포넌트 재렌더링
                })
            }}>
                reset
            </button>
        </div>
    )
}