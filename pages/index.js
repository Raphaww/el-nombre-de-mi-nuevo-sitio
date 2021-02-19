import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { getAllLandings } from '../lib/landings';

export default function Home({landings}) {
  return (
    <Layout>
      <Head>
        <title>Hola mundo</title>
      </Head>
      <ul className="list-unstyled">
      {landings.map(landing => (
        <li key={landing.id}>
          <Link href={`/landings/${landing.uri}`}>
            <a>{landing.title && landing.title !== " " ? landing.title : "[click]"}</a>
          </Link>
        </li>
      ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  const landings = await getAllLandings();
  return {
     props: {
        landings
     }
  };
}
