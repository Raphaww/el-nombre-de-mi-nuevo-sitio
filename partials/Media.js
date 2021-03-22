import React, { createContext, useContext } from 'react';
import { Row } from 'react-bootstrap';
import variables from '../styled/variables';
import styled from '@emotion/styled';

const MediaContext = createContext({
   fluid: true
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
   ...fluid && {
      width: '100%'
   }
}));

const MediaImage = styled.div({
   position: 'relative',
   backgroundSize: 'cover',
   backgroundColor: '#eee',
   backgroundPosition: 'center center',
   minHeight: '194px !important',
}, ({base, path, bucket, empty, fluid}) => ({
   ...empty ? {
      textAlign: 'center',
      display: 'block',
      color: '#aaa',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
   } : { 
      backgroundImage: `url(${base}f_auto,h_400,c_fill/${bucket}/${path})`
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

const MediaInfo = styled.div({
   paddingTop: '15px',
   paddingBottom: '15px'
}, ({fluid}) => ({
   ...fluid && {
      width: '100%',
      padding: '20px'
   }
}));

const MediaInfoBody = styled.div({
   margin: '0.5rem 0'
});

const Media = ({ children }) => {
   const { fluid } = useMediaContext();
   return (
      <RowStyled noGutters fluid={fluid}>
         {children}
      </RowStyled>
   );
};
const Image = ({base, images, bucket}) => {
   const { fluid } = useMediaContext();
   return (base && bucket && images && images.items.length > 0) ? (
      <MediaImage base={base} path={images.items[0].path} bucket={bucket} fluid={fluid}/>
   ) : (
      <MediaImage empty fluid={fluid}/>
   );
};

const Info = ({title, content}) => {
   const { fluid } = useMediaContext();
   return (
      <MediaInfo fluid={fluid}>
         {title && (
            <h2>{title}</h2>
         )}
         <MediaInfoBody>
            <div dangerouslySetInnerHTML={{__html: content}} />
         </MediaInfoBody>
      </MediaInfo>
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
   fluid: true
};

export default Media;
