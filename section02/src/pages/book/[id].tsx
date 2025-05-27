import {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next";
  import style from "./[id].module.css";
  import fetchOneBook from "@/lib/fetch-one-book";
import Head from "next/head";
import { useRouter } from "next/router";
  
  
  export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const id = context.params!.id;
    const book = await fetchOneBook(Number(id));
  
    return {
      props: {
        book,
      },
    };
  };
  
  export default function Page({
    book,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    if(router.isFallback){
      return (
        <>
        <Head>
      <title>한입북스</title>
      <meta property='og:image' content='/thumbnail.png'/>
      <meta property='og:title' content='한입북스'/>
      <meta property='og:description' content='한입북스에 도서를 만나보세요'/>

    </Head>
    <div>로딩중입니다</div>
        </>
      )
    }
    if (!book) return "문제가 발생했습니다 다시 시도하세요";
  
    const {
      title,
      subTitle,
      description,
      author,
      publisher,
      coverImgUrl,
    } = book;
  
    return (
      <>
      <Head>
          <title>{title}</title>
          <meta property='og:image' content={coverImgUrl}/>
          <meta property='og:title' content={title}/>
          <meta property='og:description' content={description}/>
        </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
      </>
    );
  }