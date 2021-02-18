import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import { getAllBanners } from '../lib/banners';

export default function Home({banners}) {
  return (
    <Layout>
      <Head>
        <title>Hola mundo</title>
      </Head>
      <ul className="list-unstyled">
      {banners.map(banner => (
        <li key={banner.id}>
          <Link href={`/banners/${banner.id}`}>
            <a>{banner.title && banner.title !== " " ? banner.title : "[click]"}</a>
          </Link>
        </li>
      ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  const banners = await getAllBanners();
  return {
     props: {
        banners
     }
  };
}
