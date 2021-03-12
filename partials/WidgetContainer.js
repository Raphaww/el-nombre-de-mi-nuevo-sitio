import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import variables from '../styled/variables';

const StyledWidgetContainer = styled('div', {
   shouldForwardProp: prop =>
   isPropValid(prop)
   && prop !== 'type'
})(({type, bannerFullScreen, keepAspectRatio, hasBanners}) => ({
   ...type === 'HORIZONTAL' && {
      backgroundColor: variables.widgetHorizontalbBgColor,
      '@media (min-width: 768px)': {
         position: 'absolute',
         bottom: '1.25rem',
         left: 0,
         right: 0
      }
   },
   ...bannerFullScreen && {
      '@media (min-width: 768px)': {
         bottom: '3rem'
      }
   },
   ...!keepAspectRatio && hasBanners && {
      '@media (max-width: 767px)': {
         paddingTop: '200px'
      }
   }
}));

const StyledOuterContainer = styled('div', {
   shouldForwardProp: prop => isPropValid(prop)
})(({isSticky}) => ({
   transition: 'background-color .3s',
   // ...isSticky && {
   //    backgroundColor: variables.lightBgColor,
   //    width: '100% !important',
   //    left: 0,
   //    right: 0,
   //    boxShadow: '0 0 5px rgba(0,0,0,0.3)'
   // }
}));

const WidgetContainer = ({type, bannerFullScreen, keepAspectRatio, hasBanners, colWidth, children}) => {
   const cols = {
      xs: 12,
      ...type === 'VERTICAL' && {
         md: { span: 6, offset: 6 },
         lg: { span: 5, offset: 7 },
         xl: { span: 4, offset: 8 },
      },
      ...type === 'HORIZONTAL' && colWidth > 0 && colWidth <= 12 && {
         lg: { span: colWidth }
      }
   };
   return (
      <StyledWidgetContainer
         type={type}
         bannerFullScreen={bannerFullScreen}
         keepAspectRatio={keepAspectRatio}
         hasBanners={hasBanners}
      >
         <StyledOuterContainer>
            <Container>
               <Row className='justify-content-center'>
                  <Col {...cols}>
                     <div className={`itm-booker ${type === 'HORIZONTAL' && 'itm-booker-horizontal'}`}>
                        {children}
                     </div>
                  </Col>
               </Row>
            </Container>
         </StyledOuterContainer>
      </StyledWidgetContainer>
   )
};

export default WidgetContainer;
