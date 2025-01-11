import { ReactNode } from 'react';
import style from './index.module.css'
import SearchLayout from '@/components/searchable-layout';
import books from '@/mock/books.json'
import BookItem from '@/components/book-Item';
import { InferGetServerSidePropsType } from 'next';

/*ssr */
//서버측에서 딱한번만 실행되는 함수
//컴포넌트보다 먼저실행된다.
export const getServerSideProps = ()=>{
  const data ='ssr'
  
  return {
    props:{
      data
    }
  }
}

//총 두번실행됨
export default function Home({data}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
        </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book)=><BookItem key={book.id} {...book}/>)}
        </section>
    </div>
  );
}

Home.getLayout =(page:ReactNode)=>{
  return <SearchLayout>{page}</SearchLayout>
}
