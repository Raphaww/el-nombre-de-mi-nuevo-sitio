import styled from '@emotion/styled';
import { Carousel } from 'react-bootstrap';
import variables from '../styled/variables';

const StyledCarousel = styled(Carousel, {
   shouldForwardProp: prop => 
   prop !== 'keepAspectRatio'
   && prop !== 'hasExtraInfo'
   && prop !== 'bannerFullScreen'
})`
   ${props => props.keepAspectRatio
   ? `
      position: relative;
      margin: 0 auto 1rem;
      height: 270px;
   `
   : `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
   `}
   & .carousel-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
   }
   & .carousel-indicators{
      z-index: 1 !important;
      margin-bottom: 0;
   }
   @media (min-width: 768px){
      ${props => props.keepAspectRatio && `
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         height: 100%;
         width: 100%;
      `}
      ${props => props.bannerFullScreen && `
         min-height: 360px;
      `
   }
   @media(max-width: 767px){
      background-color: ${variables.bgcolorStage};
      margin-bottom: 1rem;
      .carousel-inner {
         overflow: visible;
      }
   }
   @media (max-width: 575px){
      ${props => props.hasExtraInfo && `
      margin-bottom: 65px;
      `}
      ${props => props.keepAspectRatio && `
      height: 200px;
      `}
   }
`;
const StylesCarouselItem = styled(Carousel.Item, {
   shouldForwardProp: prop =>
   prop !== 'bannerFullScreenTheme'
})((props) => ({
   height: '100%',
   backgroundPosition: '50%',
   backgroundSize: 'cover',
   // ...props.path && {
   //    backgroundImage: `url(${props.path}) !important`
   // },
   ...(props.bannerFullScreenTheme === 'LIGHT'
   || props.bannerFullScreenTheme === 'DARK') && {
      '&:before': {
         content: '""',
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         ...props.bannerFullScreenTheme === 'LIGHT' && {
            background: `-moz-linear-gradient(top,  rgba(255,255,255,.25) 0%, rgba(255,255,255,0) 100%)`,
            background: `-webkit-linear-gradient(top,  rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 100%)`,
            background: `linear-gradient(to bottom,  rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 100%)`,
            filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=0 )`
         },
         ...props.bannerFullScreenTheme === 'DARK' && {
            background: '-moz-linear-gradient(top,  rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
            background: '-webkit-linear-gradient(top,  rgba(0,0,0,0.25) 0%,rgba(0,0,0,0) 100%)',
            background: 'linear-gradient(to bottom,  rgba(0,0,0,0.25) 0%,rgba(0,0,0,0) 100%)',
            filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 )`
         }
      }
   }
}));

const carousel = ({images, banners, base, bucket, keepAspectRatio, hasExtraInfo, bannerFullScreen, bannerFullScreenTheme}) => {
   return (
      <StyledCarousel
         controls={false}
         indicators={images && images.length > 1 || banners && banners.length > 0}
         fade
         keepAspectRatio={keepAspectRatio}
         hasExtraInfo={hasExtraInfo}
         bannerFullScreen={bannerFullScreen}
      >
         {banners && banners.map((banner) => (
            <StylesCarouselItem
               key={banner.id}
               bannerFullScreenTheme={bannerFullScreenTheme}
               style={{backgroundImage: `url(${base}f_auto,w_1280,h_600,b_black,o_70,c_fill/${bucket}/${banner.image.path})`}}
            >
               <Carousel.Caption>
                  <h3>{banner.title}</h3>
               </Carousel.Caption>
            </StylesCarouselItem>
         ))}
         {images && images.map((image) => (
            <StylesCarouselItem
               key={image.id}
               bannerFullScreenTheme={bannerFullScreenTheme}
               style={{backgroundImage: `url(${base}f_auto,w_1280,h_600,b_black,o_70,c_fill/${bucket}/${image.path})`}}
            />
         ))}
      </StyledCarousel>
   );
};

export default carousel;
