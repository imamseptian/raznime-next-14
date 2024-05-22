'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronLeft, ChevronRight, CirclePlay, Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AnimeDefaultVideoPlayer from '@/components/anime/default-video-player';
import AnimeEmbeddedVideoPlayer from '@/components/anime/embedded-video-player';
import {
  fetchAnimeEpisodeOtherStreamingServers,
  fetchAnimeEpisodeStreamingLinks,
} from '@/lib/api/anime-api';
import {
  type AnimeDetailEpisode,
  type AnimeEpisodeOtherStreamingServer,
  type AnimeEpisodeStreamingLinksResponse,
} from '@/lib/types/anime';
import { DEFAULT_AVAILABLE_SERVERS, VIDEO_PLAYER_TYPES } from '@/lib/constants';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/lib/services/local-storage-service';
import { FetchApiResponse } from '@/lib/api/fetch-api';
import { getAnimeIdAndEpisodeNumberFromSlug } from '@/lib/helpers/url-helpers';
import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Settings for the video player from local storage
 *
 * @property {('embedded'|'default')} playerType - The type of player to use
 * @property {('gogocdn'|'vidstreaming'|'streamsb')} server - The streaming server to use
 */
interface VideoPlayerSettings {
  playerType: 'embedded' | 'default';
  server: string;
}

/**
 * Props for the AnimeVideoPlayer component
 *
 * @property {AnimeDetailEpisode[]} episodes - array of episodes that will be used to check if prev/next episodes exist
 * @property {string} animeTitle - The title of the anime being viewed
 */
interface AnimeVideoPlayerProps {
  episodes: AnimeDetailEpisode[];
  initialEpisodeId: string;
}

/**
 * Renders the video player component for an anime episode.
 *
 * @param {AnimeVideoPlayerProps} props - The props object containing the episodes and initial episode ID.
 * @return {JSX.Element} The rendered video player component.
 */
function AnimeVideoPlayer({ episodes, initialEpisodeId }: AnimeVideoPlayerProps) {
  const router = useRouter();

  const pathName = usePathname();

  const [currentEpisodeId, setCurrentEpisodeId] = useState(initialEpisodeId);

  useEffect(() => {
    const { animeId }    = getAnimeIdAndEpisodeNumberFromSlug(initialEpisodeId);
    const regexPattern   = new RegExp(`${animeId}-episode-\\d+`);
    const matchEpisodeId = pathName.match(regexPattern);
    if (matchEpisodeId) {
      setCurrentEpisodeId(matchEpisodeId[0]);
    }
  }, [pathName]);

  const isFirstEpisode = currentEpisodeId === episodes[0].id;
  const isLastEpisode  = currentEpisodeId === episodes[episodes.length - 1].id;

  const { animeId, episodeNumber } = getAnimeIdAndEpisodeNumberFromSlug(currentEpisodeId);

  const searchParams              = useSearchParams();
  const localStorageVideoSettings =  getFromLocalStorage<VideoPlayerSettings>('videoSettings') ?? {
    playerType : 'default',
    server     : 'gogocdn',
  };

  let playerType = searchParams.get('playerType') ?? localStorageVideoSettings.playerType;
  const server   = searchParams.get('server') ?? localStorageVideoSettings.server;

  playerType = VIDEO_PLAYER_TYPES.includes(playerType as string)
    ? playerType
    : 'default';

  const defaultPlayerServer = DEFAULT_AVAILABLE_SERVERS.includes(server)
    ? (server as 'gogocdn' | 'vidstreaming' | 'streamsb')
    : 'gogocdn';

  const {
    data: defaultPlayerStreamingLinksResponse,
    isLoading: isLoadingDefaultPlayerSource,
  } = useQuery<FetchApiResponse<AnimeEpisodeStreamingLinksResponse>, Error>({
    queryKey : [`anime-${currentEpisodeId}-default-streaming-links`, { currentEpisodeId, server: defaultPlayerServer }],
    queryFn  : () => fetchAnimeEpisodeStreamingLinks({ episodeId: currentEpisodeId, streamingServer: defaultPlayerServer }),
  });

  const {
    data: embeddedPlayerStreamingLinksResponse,
    isLoading: isLoadingEmbeddedPlayerSource,
  } = useQuery<FetchApiResponse<AnimeEpisodeOtherStreamingServer[]>, Error>({
    queryKey : [`anime-${currentEpisodeId}-embedded-streaming-links`, { currentEpisodeId }],
    queryFn  : () => fetchAnimeEpisodeOtherStreamingServers({ episodeId: currentEpisodeId }),
  });

  /**
   * Handles the click event when the server button is changed.
   *
   * @param newPlayerType - The new player type ('embedded' or 'default').
   * @param newServer - The new server.
   * @param shouldStoreToLocalStorage - Whether to store the video settings to local storage.
   * @return void This function does not return a value.
   */
  const handleChangeServerButtonClick = (
    newPlayerType: 'embedded' | 'default',
    newServer: string,
    shouldStoreToLocalStorage = true,
  ) => {
    if (shouldStoreToLocalStorage) { saveToLocalStorage('videoSettings', { playerType: newPlayerType, server: newServer }); }
    const params = new URLSearchParams(searchParams.toString());
    params.set('playerType', newPlayerType);
    params.set('server', newServer);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const {
    data: defaultPlayerSources,
    isError: isErrorDefaultPlayerSources,
    error: errorDefaultPlayerSources,
  } = defaultPlayerStreamingLinksResponse ?? {};

  const {
    data: embeddedPlayerLinks,
    isError: isErrorEmbeddedPlayerLinks,
    error: errorEmbeddedPlayerLinks,
  } = embeddedPlayerStreamingLinksResponse ?? {};

  const downloadLink = defaultPlayerSources?.download;

  const defaultPlayerSource      = defaultPlayerSources?.sources.find((source) => source.quality === "default");
  const animeEmbeddedPlayerLinks = embeddedPlayerLinks ?? [];

  const selectedEmbeddedServer = animeEmbeddedPlayerLinks.find(
    (currentServer) => currentServer.name === server,
  );

  if (!selectedEmbeddedServer && playerType === 'embedded' && animeEmbeddedPlayerLinks.length > 0) {
    handleChangeServerButtonClick('embedded', animeEmbeddedPlayerLinks[0].name, false);
  }

  const showDefaultVideoPlayer = playerType === 'default' && defaultPlayerSource && !isLoadingDefaultPlayerSource;

  const showEmbeddedVideoPlayer = playerType === 'embedded'
    && animeEmbeddedPlayerLinks.length > 0
    && !isLoadingEmbeddedPlayerSource
    && selectedEmbeddedServer;

  const showDefaultVideoPlayerError  = isErrorDefaultPlayerSources && playerType === 'default';
  const showEmbeddedVideoPlayerError = isErrorEmbeddedPlayerLinks && playerType === 'embedded';

  /**
   * Updates the current episode using shallow navigation.
   * Then update the metadata title to keep it in sync.
   *
   * @param newEpisodeNumber - The new episode number to switch to.
   */
  const handleChangeEpisode = (newEpisodeNumber: number) => {
    const newEpisodeId = `${animeId}-episode-${newEpisodeNumber}`;
    const episodeExist = episodes.find((episode) => episode.id === newEpisodeId);
    if (!episodeExist) return;

    const params = new URLSearchParams(searchParams.toString());
    router.push(`/watch/${newEpisodeId}?${params.toString()}`);
  };

  const disablePrevEpisodeButton = isFirstEpisode || isLoadingDefaultPlayerSource || isLoadingEmbeddedPlayerSource;
  const disableNextEpisodeButton = isLastEpisode || isLoadingDefaultPlayerSource || isLoadingEmbeddedPlayerSource;

  return (
    <>
      <div className="w-full aspect-video">
        {
          isLoadingDefaultPlayerSource && playerType === 'default' && (
            <Skeleton className="w-full aspect-video" />
          )
        }

        { showDefaultVideoPlayer && (
          <AnimeDefaultVideoPlayer
            source={ defaultPlayerSource }
            onVideoEnded={ () => handleChangeEpisode(Number(episodeNumber) + 1) }
            downloadLink={ downloadLink }
          />
        ) }

        {
          showEmbeddedVideoPlayer && (
            <AnimeEmbeddedVideoPlayer server={ selectedEmbeddedServer } />
          )
        }

        {
          showDefaultVideoPlayerError && (
            <div className="w-full aspect-video flex items-center justify-center">
              <h3 className="text-xl capitalize">
                { errorDefaultPlayerSources || `Cannot connect to ${defaultPlayerServer}` }
              </h3>
            </div>
          )
        }

        {
          showEmbeddedVideoPlayerError && (
            <div className="w-full aspect-video flex items-center justify-center">
              <h3 className="text-xl capitalize">
                { errorEmbeddedPlayerLinks || `Cannot connect to ${server}` }
              </h3>
            </div>
          )
        }
      </div>

      <div className="w-full flex justify-between my-3 ">
        <Button
          onClick={ () => handleChangeEpisode(Number(episodeNumber) - 1) }
          disabled={ disablePrevEpisodeButton }
          variant="outline"
        >
          <ChevronLeft
            className="mr-1"
            size={ 20 }
          />
          Prev Episode
        </Button>

        <Button
          onClick={ () => handleChangeEpisode(Number(episodeNumber) + 1) }
          disabled={ disableNextEpisodeButton }
          variant="outline"
        >
          Next Episode
          <ChevronRight
            className="ml-1"
            size={ 20 }
          />
        </Button>
      </div>

      <table className="w-full border-2 text-sm">
        <tbody>
          <tr className="border-b-2">
            <th
              className="text-sm border-r-2"
              scope="row"
            >
              Default Server
            </th>
            <td className="flex flex-wrap gap-2 px-1 py-3">
              {
                DEFAULT_AVAILABLE_SERVERS.map((defaultServer) => {
                  const isButtonSelected = defaultServer === defaultPlayerServer && playerType === 'default';
                  return (
                    <Button
                      key={ `default-server-button-${defaultServer}` }
                      type="button"
                      variant={ isButtonSelected ? 'default' : 'outline' }
                      className="capitalize"
                      size="sm"
                      onClick={ () => handleChangeServerButtonClick('default', defaultServer) }
                    >
                      <CirclePlay
                        size={ 15 }
                        className="mr-2"
                      />
                      { defaultServer }
                    </Button>
                  );
                })
              }
            </td>
          </tr>

          {
            animeEmbeddedPlayerLinks.length > 0 && (
              <tr className="border-b-2">
                <th
                  className="text-sm border-r-2"
                  scope="row"
                >
                  Other Servers
                </th>
                <td className="flex flex-wrap gap-2 px-1 py-3">
                  { animeEmbeddedPlayerLinks.map((otherServer) => {
                    const isButtonSelected = otherServer.name === server && playerType === 'embedded';
                    return (
                      <Button
                        key={ `other-server-button-${otherServer.name}` }
                        type="button"
                        variant={ isButtonSelected ? 'default' : 'outline' }
                        className="capitalize"
                        size="sm"
                        onClick={ () => handleChangeServerButtonClick('embedded', otherServer.name) }
                      >
                        <CirclePlay
                          size={ 15 }
                          className="mr-2"
                        />
                        { otherServer.name }
                      </Button>
                    );
                  }) }
                </td>
              </tr>
            )
          }

          {
            downloadLink && (
              <tr>
                <th
                  className="text-sm border-r-2"
                  scope="row"
                >
                  Download
                </th>
                <td className="px-1 py-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="capitalize"
                    size="sm"
                    asChild
                  >
                    <Link
                      href={ downloadLink }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download
                        size={ 15 }
                        className="mr-2"
                      />
                      Download
                    </Link>

                  </Button>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>
    </>
  );
}

export default AnimeVideoPlayer;
