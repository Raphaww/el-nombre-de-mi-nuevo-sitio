import styled from '@emotion/styled';
import variables from '../styled/variables';

export default styled.div(props => ({
   margin: '0 auto 2rem',
   position: 'relative',
   minHeight: '200px',
   ...(props.keepAspectRatio && !props.bannerFullWidth) && {
      '@media (min-width: 576px)': {
         maxWidth: '576px'
      }
   },
   '@media (min-width: 768px)': {
      minHeight: '360px', // para conservar tamaño mínimo en w horizontal
      backgroundColor: variables.stageBgcolor,
      ...props.keepAspectRatio && {
         minHeight: '360px',
         ...!props.bannerFullWidth && {
            maxWidth: '768px'
         }
      },
      ...props.bannerFullScreen && {
         height: '100vh',
         paddingTop: '100px'
      }
   },
   '@media (min-width: 992px)': {
      minHeight: '420px',
      ...props.keepAspectRatio && {
         minHeight: '480px',
         ...!props.bannerFullWidth && {
            maxWidth: '1024px'
         }
      }
   },
   '@media (min-width: 1200px)': {
      ...props.keepAspectRatio && {
         minHeight: '600px',
         ...!props.bannerFullWidth && {
            maxWidth: '1280px'
         }
      }
   },
   ...props.solid && {
      backgroundColor: variables.stageBgcolor,
      minHeight: 0
   },
   ...props.keepAspectRatio && {
      backgroundColor: '#FFF'
   },
}));