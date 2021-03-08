import Amplify from '@aws-amplify/core';
import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { getAllLandings } from '../lib/landings';
import awsConfigure from '../awsConfigure';
Amplify.configure({...awsConfigure, ssr: true});

export default function Home({landings}) {
  return (
    <Layout>
      <Head>
        <title>Hola mundo</title>
      </Head>
      <ul className="list-unstyled">
      {landings.map(landing => (
        <li key={landing.id}>
          <Link href={`/landings/${landing.id}`}>
            <a>{landing.name && landing.name !== " " ? landing.name : "[click]"}</a>
          </Link>
        </li>
      ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const landings = await getAllLandings();
  return {
     props: {
        landings
     }
  };
}
