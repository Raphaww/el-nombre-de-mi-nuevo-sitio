import Head from 'next/head';
import { Header } from '../partials';

export default function Layout({children}) {
   return (
      <div>
         <Head>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Header />
         <main>
            {children}
         </main>
      </div>
   );
};
