import React from 'react';

const Text = ({content}) => {
   return (
      <div dangerouslySetInnerHTML={{__html: content}} />
   );
};

export default Text;
