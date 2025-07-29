import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

//export const dynamic ='auto'
//특정페이지의 유형을 스테틱 또는 다이니믹으로 설정(강제로)
//auto: 기본값
//force-dynamic: 페이지를 강제로 다이니믹
//force-static: 페이지를 강제로 스테딕
//force-static: 페이지를 강제로 스테틱(이유를 알려줌 즉 버그가 낮아짐)
async function AllBooks(){
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,{cache:'force-cache'});
  if(!response.ok){
    return <div>오류발생했습니다</div>
  }
  const allBooks: BookData[] = await response.json();

  return(
    <div>
      {allBooks.map((book)=>(
        <BookItem key={book.id} {...book}/>
      ))}
    </div>
  )
}

async function RecoBooks(){
  await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,{next:{revalidate:3}});
  if(!response.ok){
    return <div>오류발생했습니다</div>
  }
  const recoBooks: BookData[] = await response.json();

  return(
    <div>
      {recoBooks.map((book)=>(
        <BookItem key={book.id} {...book}/>
      ))}
    </div>
  )
}


export const dynamic ='force-dynamic';
export default function Home() {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>....</div>}>
          <RecoBooks/>
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>....</div>}>
          <AllBooks/>
        </Suspense>
      </section>
    </div>
  );
}
