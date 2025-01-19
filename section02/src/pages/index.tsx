import { ReactNode } from 'react';
import style from './index.module.css'
import SearchLayout from '@/components/searchable-layout';
import books from '@/mock/books.json'
import BookItem from '@/components/book-Item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

/*ssr */
//서버측에서 딱한번만 실행되는 함수
//컴포넌트보다 먼저실행된다.
export const getServerSideProps = async()=>{
  
  
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(),fetchRandomBooks()])
  
  return {
    props:{
      allBooks,
      recoBooks
    }
  }
}

//총 두번실행됨
export default function Home({
  allBooks,
  recoBooks
}:InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book)=><BookItem key={book.id} {...book}/>)}
        </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book)=><BookItem key={book.id} {...book}/>)}
        </section>
    </div>
  );
}

Home.getLayout =(page:ReactNode)=>{
  return <SearchLayout>{page}</SearchLayout>
}
