import React, { createContext, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import isPropValid from '@emotion/is-prop-valid';
import variables from '../styled/variables';
import styled from '@emotion/styled';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const MediaContext = createContext({
   fluid: false
});

function useMediaContext() {
   const context = useContext(MediaContext);
   if (!context) {
      throw new Error(
         `Media components cannot be rendered outside the Media.Container component`,
      )
   }
   return context;
};

const RowStyled = styled(Row, {
   shouldForwardProp: prop =>
   prop !== 'fluid'
})(({fluid}) => ({
   marginBottom: '2rem',
   backgroundColor: variables.listItemBgColor,
   color: variables.listItemColor,
   marginRight: 0,
   marginLeft: 0,
   ...fluid && {
      width: '100%'
   }
}));

const MediaImage = styled('div', {
   shouldForwardProp: prop => prop !== 'fluid' && prop !== 'empty' && prop !== 'url'
})(({url, empty, fluid}) => ({
   position: 'relative',
   backgroundSize: 'cover',
   backgroundColor: '#eee',
   backgroundPosition: 'center center',
   minHeight: '194px !important',
   ...!empty && { 
      backgroundImage: `url(${url})`
   },
   ...fluid && {
      padding: '0 15px',
      width: '100%',
      height: '194px',
      '@media (min-width: 768px)': {
         height: '152px'
      },
      '@media (min-width: 992px)': {
         height: '208px'
      },
      '@media (min-width: 1200px)': {
         height: '250px'
   }}
}));

const MediaImageCol = MediaImage.withComponent(Col);

const MediaInfo = styled('div', {
   shouldForwardProp: prop => prop !== 'fluid'
})(({fluid}) => ({
   paddingTop: '15px',
   paddingBottom: '15px',
   ...fluid && {
      width: '100%',
      padding: '20px'
   }
}));

const MediaInfoCol = MediaInfo.withComponent(Col);

const MediaInfoBody = styled.div({
   margin: '0.5rem 0'
});

const Media = ({ children }) => {
   const { fluid } = useMediaContext();
   return (
      <RowStyled fluid={fluid}>
         {children}
      </RowStyled>
   );
};
const Image = ({base, images, bucket, size, order}) => {
   const { fluid } = useMediaContext();
   let TagName = fluid ? MediaImage : MediaImageCol;
   const tagProps = {
      fluid,
      ...base && bucket && images && images.items.length > 0 ? {
         url: `${base}f_auto,h_400,c_fill/${bucket}/${images.items[0].path}`
      } : {
         empty: true
      },
      ...!fluid && {
         md: {
            span: size || 4,
            order
         },
         xs: {
            span: 12,
            order: 'first'
         }
      }
   };
   return (
      <LazyLoadComponent placeholder={<TagName empty />}>
         <TagName {...tagProps} />
      </LazyLoadComponent>
   );
};

const Info = ({title, content, children}) => {
   const { fluid } = useMediaContext();
   let TagName = fluid ? MediaInfo : MediaInfoCol;
   return (
      <TagName fluid={fluid}>
         {title && (
            <h2>{title}</h2>
         )}
         <MediaInfoBody>
            <div dangerouslySetInnerHTML={{__html: content}} />
            {children}
         </MediaInfoBody>
      </TagName>
   );
};

const Container = ({fluid, children}) => {
   return (
      <MediaContext.Provider value={{fluid}}>
         {children}
      </MediaContext.Provider>
   );
};

Media.Container = Container;
Media.Info = Info;
Media.Image = Image;

Container.defaultProps = {
   fluid: false
};

export default Media;
