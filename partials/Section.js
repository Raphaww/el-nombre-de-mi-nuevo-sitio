import styled from '@emotion/styled';

export default styled.div(props => ({
      ...props.level == 0 ? {
         marginBottom: '1.5rem!important'
      }: null,
      ...props.level === 1 ? {
         '@media (max-width: 767px)': {
            marginBottom: '1rem !important'
         }
      } : null
   })
);
