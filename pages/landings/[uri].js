import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllLandingsIds, getLandingData } from '../../lib/landings'
import { Carousel, Stage } from '../../partials';

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