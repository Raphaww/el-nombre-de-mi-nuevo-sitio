import React from 'react';
import styled from '@emotion/styled';

const Styled = styled.div({
   padding: '4rem',
   backgroundColor: '#f3f3f3',
   textAlign: 'center'
}, ({url, theme}) => ({
   ...url && {
      backgroundPosition: '50%',
      backgroundSize: 'cover',
      backgroundImage: `url(${url})`
   },
   ...theme && {
      position: 'relative',
      '.btn': {
         textShadow: 'none'
      },
      '.lead': {
         marginBottom: '1rem'
      },
      ':before': {
         content: '""',
         display: 'block',
         position: 'absolute',
         left: 0,
         right: 0,
         top: 0,
         bottom: 0,
         ...theme === 'dark' && {
            background: 'linear-gradient(to bottom,  rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)'
         },
         ...theme === 'light' && {
            background: 'linear-gradient(to bottom,  rgba(255,255,255,.65) 0%,rgba(255,255,255,0) 100%)'
         }
      },
      ...theme === 'dark' && {
         color: '#fff',
         textShadow: '0 1px 5px rgb(0 0 0 / 50%)',
      },
      ...theme === 'light' && {
         color: '#000',
         textShadow: '0 0 5px rgba(255,255,255,0.5)',
      }
   },
   
}));

const StyledBody = styled.div({
   position: 'relative'
});

const CallToAction = ({title, content, children, base, bucket, images, theme}) => {
   const actionProps = {
      theme,
      ...base && bucket && images && images.items.length > 0 && {
         url: `${base}f_auto,w_1200,h_800,c_fill/${bucket}/${images.items[0].path}`
      }
   };

   return (
      <Styled {...actionProps}>
         <StyledBody>
            <h5>{title}</h5>
            <p className="lead" dangerouslySetInnerHTML={{__html: content}} />
            {children}
         </StyledBody>
      </Styled>
   );
};

CallToAction.defaultProps = {
   theme: 'dark'
};

export default CallToAction;
