import { useContext, createContext } from 'react';
import styled from '@emotion/styled';
import { Container } from 'react-bootstrap';
import isPropValid from '@emotion/is-prop-valid';
import variables from '../styled/variables';
import enums from '../constants/enums';

const BannerInfoContext = createContext({
   theme: enums.theme.DARK
});

function useBannerInfoContext() {
   const context = useContext(BannerInfoContext);
   if (!context) {
      throw new Error(
         `BannerInfo compound components cannot be rendered outside the BannerInfo component`,
      )
   }
   return context;
};

const StyledBannerInfo = styled('div', {
   shouldForwardProp: prop =>
      isPropValid(prop)
      && prop !== 'theme'
})(({theme}) => ({
   ...theme && theme == enums.theme.DARK && {
      color: variables.lightColor
   },
   '@media(min-width: 768px)': {
      marginTop: '2rem'
   },
   '@media(min-width: 992px)': {
      marginTop: '4rem'
   },
   '@media(min-width: 1200px)': {
      marginTop: '5rem'
   },
   '@media(max-width: 767px)': {
      marginTop: '2rem',
      marginBottom: '0rem'
   }
}));

const StyledTitle = styled('div', {
   shouldForwardProp: prop => 
   isPropValid(prop)
   && prop !== 'theme'
})(({theme}) => ({
   ...theme && theme == enums.theme.DARK && {
      textShadow: '0 1px 1px rgba(0,0,0,0.3)'
   },
   fontSize: '1.5rem',
   '@media(min-width: 768px)': {
      fontSize: '2.25rem'
   },
   '@media(max-width: 575px)': {
      fontSize: '1.25rem'
   }
}));
const StyledSubtitle = styled('div', {
   shouldForwardProp: prop => 
   isPropValid(prop)
   && prop !== 'theme'
})(({theme}) => ({
   ...theme && theme == enums.theme.DARK && {
      textShadow: '0 1px 1px rgba(0,0,0,0.3)'
   },
   fontSize: '1.25rem',
   fontWeight: '300',
   '@media(max-width: 767px)': {
      marginBottom: '0'
   },
   '@media(max-width: 575px)': {
      lineHeight: '1.25rem'
   }
}));

const BannerInfo = (props) => {
   const { children, theme, ...rest } = props;
   return (
      <StyledBannerInfo theme={theme} {...rest}>
         <BannerInfoContext.Provider value={{theme}}>
            {children}
         </BannerInfoContext.Provider>
      </StyledBannerInfo>
   );
};

const Title = ({children, ...rest}) => {
   const { theme } = useBannerInfoContext();
   return (
      <StyledTitle theme={theme} {...rest}>
         {children}
      </StyledTitle>
   );
};
const Subtitle = ({children, ...rest}) => {
   const { theme } = useBannerInfoContext();
   return (
      <StyledSubtitle theme={theme} {...rest}>
         {children}
      </StyledSubtitle>
   );
} 
BannerInfo.Title = Title;
BannerInfo.Subtitle = Subtitle;
BannerInfo.Container = styled(Container,{
   shouldForwardProp: prop =>
   prop !== 'keepAspectRatio'
})((props) => ({
   position: 'relative',
   ...props.keepAspectRatio && {
      paddingTop: 0,
      paddingBottom: 0,
      '@media(max-width: 767px)': {
         position: 'absolute',
         bottom: '2rem',
         left: 0,
         right: 0
      }
   }
}));
BannerInfo.defaultProps = {
   theme: enums.theme.DARK
};

export default BannerInfo;
