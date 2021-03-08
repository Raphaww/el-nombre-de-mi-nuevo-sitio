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
          <Link href={`/landings/${landing.id}`}>
            <a>{landing.name && landing.name !== " " ? landing.name : "[click]"}</a>
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
