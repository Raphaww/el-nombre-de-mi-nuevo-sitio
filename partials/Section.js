import styled from '@emotion/styled';

export default styled.div(props => ({
      ...props.level == 0 ? {
         marginBottom: '1.5rem!important'
      }: null
   })
);
