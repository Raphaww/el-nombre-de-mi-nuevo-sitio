import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import { css } from '@emotion/react';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const GalleryLink = styled.a({
   cursor: 'pointer',
   display: 'block',
   float: 'left',
   border: '2px solid #FFF',
   position: 'relative',
   overflow: 'hidden',
   width: '25%',
   ':first-of-type': {
      float: 'left',
      width: '50%'
   },
}, ({length, index }) => ({
   img: {
      width: '100%',
      minHeight: index === 0 ? '120px': '58px',
      '@media (min-width: 576px)': {
         minHeight: index === 0 ? '179px': '88px'
      },
      '@media (min-width: 768px)': {
         minHeight:  index === 0 ? '244px': '120px'
      },
      '@media (min-width: 992px)': {
         minHeight:  index === 0 ? '330px': '163px'
      },
      '@media (min-width: 1200px)': {
         minHeight: index === 0 ? '394px': '196px'
      },
   },
   ...length === 3 && {
      width: '33.333%',
      ':first-of-type': {
         width: '66.6666%'
      }
   },
   ...length === 4 && {
      width: '50%',
      ':first-of-type': {
         width: '50%'
      }
   }
}));

const GalleryCount = styled('span')({
   position: 'absolute',
   top: 0,
   bottom: 0,
   left: 0,
   right: 0,
   background: 'rgba(0,0,0,0.4)',
   color: '#fff',
   fontSize: '200%',
   whiteSpace: 'nowrap',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
});

const Background = styled('div')({
   position: 'fixed',
   width: '100%',
   height: '100%',
   top: 0,
   left: 0,
   backgroundColor: '#0b0b0b',
   overflow: 'hidden',
   opacity: 0.8,
   zIndex: 300
});

const Wrapper = styled('div')({
   position: 'fixed',
   width: '100%',
   height: '100%',
   top: 0,
   left: 0,
   zIndex: 301,
   outline: 'none!important'
});

const Container = styled('div')({
   textAlign: 'center',
   position: 'absolute',
   width: '100%',
   height: '100%',
   left: 0,
   top: 0,
   padding: '0 8px',
   boxSizing: 'border-box',
   cursor: 'zoom-out',
   ':before': {
      content: '""',
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'middle'
   }
});

const Content = styled('div')({
   position: 'relative',
   display: 'inline-block',
   verticalAlign: 'middle',
   margin: '0 auto',
   textAlign: 'left',
   zIndex: 302,
   maxWidth: '100%'
});

const Figure = styled('div')({
   lineHeight: 0,
   cursor: 'pointer',
   ':after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '40px',
      bottom: '40px',
      display: 'block',
      right: 0,
      width: 'auto',
      height: 'auto',
      zIndex: -1,
      boxShadow: '0 0 8px rgb(0 0 0 / 60%)',
      background: '#444'
   },
   'img': {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      display: 'block',
      boxSizing: 'border-box',
      padding: '40px 0',
      margin: '0 auto'
   }
});

const ButtonBase = () => css({
   overflow: 'visible',
   cursor: 'pointer',
   background: 'transparent',
   border: 0,
   display: 'block',
   outline: 'none',
   padding: 0,
   zIndex: 303,
   boxShadow: 'none',
   touchAction: 'manipulation',
});

const ArrowBase = () => css({
   position: 'absolute',
   opacity: 0.65,
   margin: 0,
   top: '50%',
   marginTop: '-55px',
   padding: 0,
   width: '90px',
   height: '110px',
   ':active': {
      marginTop: '-54px'
   },
   ':hover,:focus':{
      opacity: 1
   },
   ':before,:after':{
      content: '""',
      display: 'block',
      width: 0,
      height: 0,
      position: 'absolute',
      left: 0,
      top: 0,
      marginTop: '35px',
      marginLeft: '35px',
      border: 'medium inset transparent',
   }
});

const CloseButton = styled.button(ButtonBase, {
   position: 'absolute',
   color: '#fff',
   top: 0,
   right: '-6px',
   textAlign: 'right',
   paddingRight: '6px',
   width: '100%',
   height: '44px',
   lineHeight: '44px',
   fontStyle: 'normal',
   fontSize: '28px',
   fontFamily: 'Arial,Baskerville,monospace',
   opacity: 0.65,
   cursor: 'zoom-out !important',
   ':hover,:focus': {
      opacity: 1
   }
});

const PrevButton = styled.button(ButtonBase, ArrowBase, {
   left: 0,
   ':after': {
      borderTopWidth: '13px',
      borderBottomWidth: '13px',
      top: '8px',
      borderRight: '17px solid #FFF',
      marginLeft: '31px'
   },
   ':before': {
      borderTopWidth: '21px',
      borderBottomWidth: '21px',
      opacity: 0.7,
      marginLeft: '25px',
      borderRight: '27px solid #3F3F3F'
   }
});

const NextButton = styled.button(ButtonBase, ArrowBase, {
   right: 0,
   ':after': {
      borderTopWidth: '13px',
      borderBottomWidth: '13px',
      top: '8px',
      borderLeft: '17px solid #FFF',
      marginLeft: '39px'
   },
   ':before': {
      borderTopWidth: '21px',
      borderBottomWidth: '21px',
      opacity: 0.7,
      borderLeft: '27px solid #3F3F3F'
   }
});

const Caption = styled.div({
   marginTop: '-36px',
   position: 'absolute',
   top: '100%',
   left: 0,
   width: '100%',
   cursor: 'auto',
});

const Counter = styled.div({
   position: 'absolute',
   top: 0,
   right: 0,
   color: '#ccc',
   fontSize: '12px',
   lineHeight: '18px',
   whiteSpace: 'nowrap'
});

function useWindowSize() {
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined
   });
   useEffect(() => {
      function handleResize() {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
         });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
   }, []);
   return windowSize;
}

function useKeyPress(callback) {
   useEffect(() => {
      function onKeyup(e){
         callback(e.key);
      }
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
   }, []);
}

const Gallery = ({ base, bucket, images, scrollPosition }) => {
   const [currentPhotoIndex, _setCurrentPhotoIndex] = useState(-1);
   const currentPhotoIndexRef = useRef(currentPhotoIndex);
   const setCurrentPhotoIndex = (value) => {
      currentPhotoIndexRef.current = value;
      _setCurrentPhotoIndex(value);
   };
   const windowSize = useWindowSize();
   
   useKeyPress((key) => {
      if(currentPhotoIndexRef.current < 0){
         return;
      }
      switch (key) {
         case 'Escape':
            close();
            break;
         case 'ArrowLeft':
            moveImage(-1);
            break;
         case 'ArrowRight':
            moveImage(1);
            break;
         default:
            break;
      }
   })
   const open = (index) => {
      document.body.style.overflow = 'hidden';
      setCurrentPhotoIndex(index);
   };
   const close = (event) => {
      event && event.stopPropagation();
      document.body.style.overflow = '';
      setCurrentPhotoIndex(-1);
   };
   const moveImage = (mov, event) => {
      event && event.stopPropagation();
      const final = currentPhotoIndexRef.current+mov;
      if(final >= 0 && final < images.items.length){
         setCurrentPhotoIndex(final);
      }
   }
   return (
      <div className="clearfix">
         {images.items.slice(0,5).map((image, index) => {
            let size = '';
            if(index === 0){
               size = 'w_600,h_430';
            } else if (index < 5){
               size = 'w_300,h_215';
            }
            return (
               <GalleryLink key={index} index={index} length={images.items.length} onClick={() => open(index)}>
                  <LazyLoadImage
                     effect="opacity"
                     scrollPosition={scrollPosition}
                     src={`${base}q_auto:low,f_auto,${size},c_fill/${bucket}/${image.path}`}
                  />
                  {index === 4 && index !== (images.items.length - 1) && (
                     <GalleryCount>
                        + {images.items.length - 5}
                     </GalleryCount>
                  )}
               </GalleryLink>
            );
         })}
         {currentPhotoIndex >= 0 && (
            <React.Fragment>
               <Background />
               <Wrapper>
                  <Container onClick={close}>
                     <Content>
                        <Figure onClick={(event) => moveImage(1, event)}>
                           <CloseButton onClick={close}>×</CloseButton>
                           <img
                              src={`${base}q_auto:low,f_auto,w_1200,h_800,c_fit/${bucket}/${images.items[currentPhotoIndex].path}`}
                              style={{
                                 maxHeight: `${windowSize.height}px`
                              }}
                           />
                           <Caption>
                              <Counter>{currentPhotoIndex+1}/{images.items.length}</Counter>
                           </Caption>
                        </Figure>
                     </Content>
                     <PrevButton onClick={(event) => moveImage(-1, event)} />
                     <NextButton onClick={(event) => moveImage(1, event)} />
                  </Container>
               </Wrapper>
                  
            </React.Fragment>
            
         )}
      </div>
   );
};

export default trackWindowScroll(Gallery);
