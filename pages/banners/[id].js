import Layout from '../../components/layout';
import { getAllBannerIds, getBannerData } from '../../lib/banners'
import Head from 'next/head';
import { Jumbotron, Container } from 'react-bootstrap';

export default function Banner({ bannerData }) {
   return (
      <Layout>
         <Head>
            <title>{bannerData.title}</title>
         </Head>
         <Jumbotron fluid style={{
            ...bannerData.photos && bannerData.photos.length > 0 && {
               'background-image': `url(//res.cloudinary.com/itermotus/f_auto,w_1280,h_600,b_black,o_70,c_fill/hotel/${bannerData.photos[0].path})`
            },
            'background-position': '50%',
            'background-size': 'cover',
         }}>
            <Container>
               <h1>{bannerData.title}</h1>
            </Container>
         </Jumbotron>
      </Layout>
   );

}

export async function getServerSidePaths() {
   const paths = await getAllBannerIds();
   return {
      paths,
      fallback: false
   };
}

export async function getServerSideProps({ params }) {
   const bannerData = await getBannerData(params.id);
   return {
      props: {
         bannerData
      }
   };
}