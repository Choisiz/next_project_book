import { useRouter } from "next/router"
import SearchLayout from '@/components/searchable-layout';
import { ReactNode } from "react";
import books from '@/mock/books.json'
import BookItem from "@/components/book-Item";

export default function Page(){

    return(
      <div>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
      </div>
    )
}

Page.getLayout =(page:ReactNode)=>{
  return <SearchLayout>{page}</SearchLayout>
}