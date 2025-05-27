import SearchLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-Item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from 'next/router';
import { BookData } from '@/types';
import Head from 'next/head';
export default function Page(){
    const [books,setBooks] =useState<BookData[]>([])
    const router = useRouter()
    const q = router.query.q

    const fetchSearchResult = async()=>{
      const data = await fetchBooks(q as string)
      setBooks(data)
    }

    useEffect(()=>{
      if(q){
        fetchSearchResult()
      }
    },[q])

    return(
      <div>
        <Head>
          <title>한입북스 - 검색결과</title>
          <meta property='og:image' content='/thumbnail.png'/>
          <meta property='og:title' content='한입북스'/>
          <meta property='og:description' content='한입북스에 도서를 만나보세요'/>
        </Head>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
      </div>
    )
}

Page.getLayout =(page:ReactNode)=>{
  return <SearchLayout>{page}</SearchLayout>
}