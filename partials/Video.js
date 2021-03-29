import React from 'react';

const Video = ({videoId}) => {
   return (
      <div className="embed-responsive embed-responsive-4by3">
         <iframe src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
       </div>
   );
};

export default Video;
