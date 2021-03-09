import Amplify from '@aws-amplify/core';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import { getAllLandingsIds, getLandingData } from '../../lib/landings'
import { Carousel, Stage, BannerInfo } from '../../partials';
import awsConfigure from '../../awsConfigure';
Amplify.configure({...awsConfigure, ssr: true});

export default function Banner({ landingData }) {
   const router = useRouter()
   const base = '//res.cloudinary.com/itermotus/';
   const bucket = 'hotel';
   if(router.isFallback){
      return (
         <div>Loading...</div>
      );
   }
   return (
      <Layout bannerFullScreen={landingData.bannerFullScreen}>
         <Head>
            <title>{landingData.title}</title>
         </Head>
         <Stage
            keepAspectRatio={landingData.bannerKeepAspectRatio}
            bannerFullWidth={landingData.bannerFullWidth}
            bannerFullScreen={landingData.bannerFullScreen}
         >
            {(landingData.banners || landingData.images) && (
               <Carousel
                  keepAspectRatio={landingData.bannerKeepAspectRatio}
                  bannerFullScreen={landingData.bannerFullScreen}
                  {... landingData.bannerFullScreenTheme && {
                     bannerFullScreenTheme: landingData.bannerFullScreenTheme
                  }}
                  hasExtraInfo
                  {...landingData.banners
                     && landingData.banners.items.length > 0
                     && {
                     banners: landingData.banners.items
                  }}
                  {...landingData.images
                     && landingData.images.items.length > 0
                     && {
                     images: landingData.images.items.map(item => item.image)
                  }}
                  base={base}
                  bucket={bucket}
               />
            )}
            {(!landingData.baners || landingData.banners.items.length === 0)
               && (
                  <BannerInfo>
                     <h3>{landingData.title}</h3>
                  </BannerInfo>
               )
            }
         </Stage>
      </Layout>
   );

}

export async function getStaticPaths() {
   const paths = await getAllLandingsIds();
   //para staticPaths se pasan como params
   const newPaths = paths.map(id => ({
      params: { uri: id }
   }));
   return {
      paths: newPaths,
      fallback: true
   };
}

export async function getStaticProps({ params }) {
   const landingData = await getLandingData(params.uri);
   return {
      props: {
         landingData
      },
      revalidate: 1
   };
}