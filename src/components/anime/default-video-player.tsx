/* eslint-disable jsx-a11y/media-has-caption */

'use client';

import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';
import { type AnimeEpisodeSource } from '@/lib/types/anime';

/**
* @typedef {Object} CustomPlyrOptions
* @property {Object} [urls] - An object containing the download URL for the video.
* @property {string} [urls.download] - The download URL for the video.
* @property {Plyr.Options} [options] - Additional options for the Plyr player.
*/
interface CustomPlyrOptions extends Plyr.Options {
  urls?: {
    download?: string;
  };
}

/**
* @typedef {Object} AnimeDefaultVideoPlayerProps
* @property {AnimeEpisodeSource} source - The source of the anime episode to be played.
* @property {string} [downloadLink] - The download link for the video file.
* @property {Function} [onVideoEnded] - A callback function to be called when the video ends.
*/
interface AnimeDefaultVideoPlayerProps {
  source: AnimeEpisodeSource;
  downloadLink?: string;
  onVideoEnded?: () => void;
}

/**
* A React component that renders a video player for anime episodes using the Plyr library and HLS.js.
*
* @component
* @param {AnimeDefaultVideoPlayerProps} props - The props for the AnimeDefaultVideoPlayer component.
* @returns {React.ReactElement} The rendered AnimeDefaultVideoPlayer component.
*/
function AnimeDefaultVideoPlayer({ source, downloadLink = '', onVideoEnded = () => {} }: AnimeDefaultVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef   = useRef<Hls | null>(null);
  const plyrRef  = useRef<Plyr | null>(null);

  useEffect(() => {
    const updateQuality = (newQuality: number) => {
      if (newQuality === 0) {
        if (hlsRef.current) hlsRef.current.currentLevel = -1;
      } else if (hlsRef.current) {
        hlsRef.current.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality && hlsRef.current) {
            hlsRef.current.currentLevel = levelIndex;
          }
        });
      }
    };

    const defaultOptions: CustomPlyrOptions = {
      keyboard: {
        focused : true,
        global  : true,
      },
    };

    if (typeof window !== 'undefined' && !Hls.isSupported()) {
      if (videoRef.current) {
        videoRef.current.src = source.url;
        plyrRef.current      = new Plyr(videoRef.current, defaultOptions);
        plyrRef.current.play();
      }
    } else {
      const hlsInstance = new Hls();
      if (hlsInstance) {
        hlsRef.current = hlsInstance;
        hlsInstance.loadSource(source.url);

        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hlsInstance.levels.map((l) => l.height);
          availableQualities.unshift(0);

          defaultOptions.controls = [
            "play-large",
            "restart",
            "rewind",
            "play",
            "fast-forward",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            "captions",
            "settings",
            "pip",
            "airplay",
            "download",
            "fullscreen",
          ];

          defaultOptions.quality = {
            default  : 0,
            options  : availableQualities,
            forced   : true,
            onChange : (e) => updateQuality(e),
          };

          defaultOptions.i18n = {
            qualityLabel: {
              0: 'Auto',
            },
          };

          if (downloadLink) {
            defaultOptions.urls = {
              download: downloadLink,
            };
          }

          if (typeof window !== 'undefined') {
            //  Quality switch
            hlsInstance.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
              const span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");
              if (hlsInstance.autoLevelEnabled) {
                if (span) span.innerHTML = `AUTO (${hlsInstance.levels[data.level].height}p)`;
              } else if (span) span.innerHTML = `AUTO`;
            });
          }

          if (videoRef.current) {
            plyrRef.current = new Plyr(videoRef.current, defaultOptions);
            plyrRef.current.play();
          }
        });

        if (videoRef.current) {
          hlsInstance.attachMedia(videoRef.current);
        }
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (plyrRef.current) {
        plyrRef.current.destroy();
      }
    };
  }, [source.url]);

  return (
    <div className="w-full">
      <video
        ref={ videoRef }
        className="w-full aspect-video"
        controls
        playsInline
        onEnded={ onVideoEnded }
      />
    </div>

  );
}

export default AnimeDefaultVideoPlayer;
