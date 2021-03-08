import Amplify from '@aws-amplify/core';
import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllLandingsIds, getLandingData } from '../../lib/landings'
import { Carousel, Stage } from '../../partials';
import awsConfigure from '../../awsConfigure';
Amplify.configure({...awsConfigure, ssr: true});

export default function Banner({ landingData }) {
   const base = '//res.cloudinary.com/itermotus/';
   const bucket = 'hotel';
   return (
      <Layout bannerFullScreen={landingData.bannerFullScreen}>
         <Head>
            <title>{landingData.name}</title>
         </Head>
         <Stage
            keepAspectRatio={landingData.bannerKeepAspectRatio}
            bannerFullWidth={landingData.bannerFullWidth}
            bannerFullScreen={landingData.bannerFullScreen}
         >
            {landingData.Banners && landingData.Banners.items.map(banner => (
               <Carousel
                  key={banner.id}
                  keepAspectRatio={landingData.bannerKeepAspectRatio}
                  bannerFullScreen={landingData.bannerFullScreen}
                  {... landingData.bannerFullScreenTheme && {
                     bannerFullScreenTheme: landingData.bannerFullScreenTheme
                  }}
                  hasExtraInfo
                  photos={banner.BannerImages.items.map(item => item.image)}
                  base={base}
                  bucket={bucket}
               />
            ))}
         </Stage>
      </Layout>
   );

}

export async function getStaticPaths() {
   const paths = await getAllLandingsIds();
   const newPaths = paths.map(p => ({
      params: { uri: p }
   }));
   return {
      paths: newPaths,
      fallback: false
   };
}

export async function getStaticProps({ params }) {
   const landingData = await getLandingData(params.uri);
   return {
      props: {
         landingData
      }
   };
}