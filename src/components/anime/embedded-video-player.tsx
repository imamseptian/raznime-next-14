'use client';

import { type AnimeEpisodeOtherStreamingServer } from '@/lib/types/anime';
import React, { useEffect, useState } from 'react';
import 'plyr/dist/plyr.css';
import { Skeleton } from '@/components/ui/skeleton';

/**
* A React component that renders an embedded video player from another website for anime episodes.
*
* @component
* @param {AnimeEmbeddedVideoPlayerProps} props - The props for the AnimeEmbeddedVideoPlayer component.
* @returns {React.ReactElement} The rendered AnimeEmbeddedVideoPlayer component.
*/
export default function AnimeEmbeddedVideoPlayer({ server }: { server: AnimeEpisodeOtherStreamingServer }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [server]);

  return (
    <div className="w-full aspect-video">
      {
        isLoading && (
          <Skeleton className="w-full h-full" />
        )
      }

      {
        server && (
          <iframe
            title="embedded-video-player"
            src={ server.url }
            className={ `w-full h-full ${isLoading ? 'hidden' : 'block'}` }
            allowFullScreen
            onLoad={ () => setIsLoading(false) }
          />
        )
      }
    </div>
  );
}
