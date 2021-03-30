import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const Video = ({videoId}) => {
   return (
      <div className="embed-responsive embed-responsive-4by3">
         <LazyLoadComponent>
            <iframe src={`https://www.youtube.com/embed/${videoId}`}
               frameBorder="0"
               allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen />
         </LazyLoadComponent>
       </div>
   );
};

export default Video;
