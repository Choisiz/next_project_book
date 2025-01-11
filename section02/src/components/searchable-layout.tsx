
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import style from './searchable-layout.module.css'
export default function SearchLayout({children}:{children:ReactNode}) {
 

  const router =useRouter()
  const [search, setSearch] =useState('')
  const q = router.query.q as string

  useEffect(()=>{
    setSearch(q || "")
  },[q])

  const onChangeSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }
  
  const onsubmit =()=>{
    if(!search)return;
    router.push(`/search?q=${search}`)
  }

  const onkeydown = (e: React.KeyboardEvent<HTMLElement>)=>{
    if(e.key ==='Enter'){
      onsubmit()
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} onChange={onChangeSearch} onKeyDown={onkeydown} placeholder="검색어입력하시오"/>
        <button onClick={onsubmit}>검색</button>
      </div>
      {children}
    </div> 
  )

}

