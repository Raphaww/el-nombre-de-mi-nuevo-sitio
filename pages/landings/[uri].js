import React from 'react';
import Amplify from '@aws-amplify/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Row, Col, Container } from 'react-bootstrap';
import BookerComponent from '@revenatium/revenatium-booker/dist/components/Booker';
import Layout from '../../components/layout';
import { getAllLandingsIds, getLandingData } from '../../lib/landings'
import { Carousel, Stage, BannerInfo, WidgetContainer, Gallery, Text, Section, Media, Video } from '../../partials';
import awsConfigure from '../../awsConfigure';
import enums from '../../constants/enums';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

Amplify.configure({...awsConfigure, ssr: true});

export default function Banner({ landingData, bookerProps }) {
   const router = useRouter()
   const base = '//res.cloudinary.com/itermotus/';
   const bucket = 'hotel';
   if(router.isFallback){
      return (
         <div>Loading...</div>
      );
   }

   const bannerCols = {
      xs: 12,
      ...landingData.bannerKeepAspectRatio && {
         sm: 9,
         md: 12
      },
      ...landingData.widgetType === enums.widgetType.VERTICAL && {
         md: 6,
         lg: 7,
         xl: 8
      },
      ...landingData.widgetType === enums.widgetType.HORIZONTAL && {
         md: 12
      }
   };

   const drawComponent = (component, level = 0) => {
      let result = null;
      switch (component.type) {
         case enums.componentType.TEXT:
            result = (
               <React.Fragment>
                  {component.title && (
                     <h4>{component.title}</h4>
                  )}
                  <Text content={component.content} />
               </React.Fragment>
            );
            break;
         case enums.componentType.ROW:
            const cols = [];
            {component.children
            && component.children.items.map(child => {
               cols.push(
                  <React.Fragment key={child.id}>
                     {drawComponent(child, level + 1)}
                  </React.Fragment>
               );
            })}
            result = (
               <React.Fragment>
                  {component.title && (
                     <h4>{component.title}</h4>
                  )}
                  <Row>
                     {cols}
                  </Row>
               </React.Fragment>
               
            );
            break;
         case enums.componentType.GALLERY:
            if(component.images
               && component.images.items.length > 0){
               result = (
                  <React.Fragment>
                     {component.title && (
                        <h4>{component.title}</h4>
                     )}
                     <Gallery images={component.images} base={base} bucket={bucket} />
                  </React.Fragment>
               );
            }
            break;
         case enums.componentType.MEDIA:
            const containerProps = {};
            if(component.styleOptions){
               containerProps.fluid = component.styleOptions.fixed; 
            }
            result = (
               <Media.Container {...containerProps}>
                  <Media>
                     <Media.Image
                        base={base}
                        bucket={bucket}
                        images={component.images}
                        order={component.styleOptions && component.styleOptions.order > 0 ? component.styleOptions.order : 0 }
                     />
                     <Media.Info title={component.title} content={component.content} />
                  </Media>
               </Media.Container>
            );
            break;
         case enums.componentType.VIDEO:
            result = (
               <Video videoId={component.videoId} />
            );
            break;
         default:
            break;
      }

      return (
         <Col {...component.size ? { md: component.size } : null}>
            <Section level={level}>
               {result}
            </Section>
         </Col>
      );
   };

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
                  cols={bannerCols}
               />
            )}
            {(!landingData.banners || landingData.banners.items.length === 0) && (
               <BannerInfo.Container
                  keepAspectRatio={landingData.bannerKeepAspectRatio}
                  bannerFullScreen={landingData.bannerFullScreen}
                  isTop
               >
                  <Row>
                     <Col {...bannerCols}>
                        <BannerInfo>
                           {landingData.title && (
                              <BannerInfo.Title>
                                 {landingData.title}
                              </BannerInfo.Title>
                           )}
                           {landingData.subTitle && (
                              <BannerInfo.subtitle>
                                 {landingData.title}
                              </BannerInfo.subtitle>
                           )}
                        </BannerInfo>
                     </Col>
                  </Row>
               </BannerInfo.Container>
            )}
            <WidgetContainer 
               bannerFullScreen={landingData.bannerFullScreen}
               keepAspectRatio={landingData.bannerKeepAspectRatio}
               type={landingData.widgetType}
               hasBanners={landingData.banners && landingData.banners.items.length > 0}
            >
               <BookerComponent {...bookerProps} />
            </WidgetContainer>
         </Stage>
         {landingData.components
         && landingData.components.items.map(component => {
            let result = (
               <Container fluid={component.notContained} {...component.notContained && {style:{padding: 0}}}>
                  <Row noGutters={component.notContained}>
                     {drawComponent(component)}
                  </Row>
               </Container>
            );
            
            return (
               <React.Fragment key={component.id}>
                  {result}
               </React.Fragment>
            );
         })}
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
   const bookerProps = {
      selectedForm: 'HOTEL',
      dateFormat: 'MMM D',
      places: [
         {"id": 1, "name": "Suites Sofia", "uri": "suites-sofia", "place": {id: 1, name: "Cancun", airportCode: "CUN"}}
      ],
      language: 'es-mx',
      showCalendarIcon: true,
      originEndPoint: 'https://api-packages-stage.revenatium.com/availability/airports',
      quoteVersion: 'V1',
      hotelForm: {
         startDate: null,
         endDate: null,
         rooms: [{adults: 2, children: 0, childrenAges: []}],
         maxAdults: 8,
         maxRooms: 6,
         maxChildren: 2,
         minChildrenAge: 0,
         maxChildrenAge: 12,
         destination: [],
         promotionCode: null,
         hasPromotionCodeEnabled: true,
         hasMultiDestination: false,
         quoteRates: false,
         hotelBookerRates: {}
      }
   };
   return {
      props: {
         landingData,
         bookerProps
      },
      revalidate: 1
   };
}