import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllLandingsIds, getLandingData } from '../../lib/landings'
import { Carousel, Stage } from '../../partials';

export default function Banner({ landingData }) {
   const base = '//res.cloudinary.com/itermotus/';
   const bucket = 'hotel';
   return (
      <Layout bannerFullScreen={landingData.bannerProps.bannerFullScreen}>
         <Head>
            <title>{landingData.title}</title>
         </Head>
         <Stage
            keepAspectRatio={landingData.bannerProps.keepAspectRatio}
            bannerFullWidth={landingData.bannerProps.bannerFullWidth}
            bannerFullScreen={landingData.bannerProps.bannerFullScreen}
         >
            <Carousel
               keepAspectRatio={landingData.bannerProps.keepAspectRatio}
               bannerFullScreen={landingData.bannerProps.bannerFullScreen}
               bannerFullScreenTheme={landingData.bannerProps.bannerFullScreenTheme}
               hasExtraInfo
               photos={landingData.photos}
               base={base}
               bucket={bucket}
            />
         </Stage>
      </Layout>
   );

}

export async function getServerSidePaths() {
   const paths = await getAllLandingsIds();
   return {
      paths,
      fallback: false
   };
}

export async function getServerSideProps({ params }) {
   const landingData = await getLandingData(params.uri);
   return {
      props: {
         landingData
      }
   };
}