import Head from 'next/head';
import { Header } from '../partials';

export default function Layout({children, bannerFullScreen}) {
   return (
      <div>
         <Head>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Header bannerFullScreen={bannerFullScreen}/>
         <main>
            {children}
         </main>
      </div>
   );
};
