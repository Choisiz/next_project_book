import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";



async function Footer() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,{cache:'force-cache'});
   //force-chche하개 되면서 라우트캐시컴포넌트 즉 캐싱이 된다 해당컴포넌트가 물론 이 api호출은 이제 한번만 하겠지만,
   //현재 프로젝트에는 크게 상관없다.  
  if(!response.ok){
    return<div>제작 @winterloodss</div>
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;
  return(
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount} 등록되어있습니다.</div>
    </footer>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
