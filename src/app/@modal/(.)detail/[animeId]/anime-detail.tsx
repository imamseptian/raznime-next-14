import { fetchAnimeDetails } from '@/lib/api/anime-api';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CirclePlay } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { type AnimeDetailEpisode } from '@/lib/types/anime';
import { ANIME_DETAIL_LIMIT_OF_DISPLAYED_EPISODES } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { withLoader } from '@/components/hocs/with-loader';
import UpdateMetadataComponent from '@/components/update-metadata-component';
import AnimeDetailNotFound from './anime-detail-not-found';

/**
 * Renders the detail modal content for a specific anime.
 *
 * @param {Object} props - The component props.
 * @param {string} props.animeId - The ID of the anime to fetch the details for.
 * @return {JSX.Element} The rendered anime detail view.
 */
async function AnimeDetail({ animeId }: { animeId: string }) {
  const animeDetailResponse = await fetchAnimeDetails({ animeId });

  const { data: currentAnimeDetail, isError, error } = animeDetailResponse;

  const animeFirstEpisode                 = currentAnimeDetail?.episodes[0];
  const animeEpisodes                     = currentAnimeDetail?.episodes ?? [];
  const episodeList: AnimeDetailEpisode[] = [...animeEpisodes].sort((a, b) => b.number - a.number);

  const showWatchNowButton          = episodeList.length > 0 && animeFirstEpisode;
  const showWatchMoreEpisodesButton = episodeList.length > ANIME_DETAIL_LIMIT_OF_DISPLAYED_EPISODES && animeFirstEpisode;

  return (
    <>
      {
        isError && (
          <AnimeDetailNotFound errorMessage={ error } />
        )
      }

      {
        currentAnimeDetail && (
          <>
            { /* background image  */ }
            <div
              className="relative bg-cover bg-no-repeat bg-center rounded-t-lg"
              style={{
                backgroundImage: `url(${currentAnimeDetail.image})`,
              }}
            >
              <div className="flex flex-col items-center md:items-end md:flex-row bg-black/80 backdrop-blur-sm p-4 rounded-t-lg">
                <div className="overflow-hidden aspect-3/4 max-w-[300px] mr-4 mb-4 md:mb-0">
                  <Image
                    src={ currentAnimeDetail.image }
                    alt={ currentAnimeDetail.title }
                    width={ 300 }
                    height={ 400 }
                  />
                </div>

                <div className="w-full space-y-2 text-center md:text-start">
                  <span className="text-sm text-gray-300">
                    { currentAnimeDetail.type }
                    <Badge
                      variant="destructive"
                      className="ml-2"
                    >
                      { currentAnimeDetail.status }
                    </Badge>
                  </span>

                  <h1 className="text-2xl font-bold text-white">{ currentAnimeDetail.title }</h1>

                  { currentAnimeDetail.otherName && <h2 className="text-md text-semibold text-gray-200">{ currentAnimeDetail.otherName }</h2> }

                  <div className="flex flex-wrap justify-center md:justify-start">
                    {
                      currentAnimeDetail.genres.map((genre) => (
                        <Link
                          key={ `anime-${currentAnimeDetail.id}-${genre}-genre-badge` }
                          href={ `/genre/${genre.toLocaleLowerCase()}` }
                        >
                          <Badge
                            variant="default"
                            className="mr-1 mb-1"
                          >
                            { genre }
                          </Badge>
                        </Link>

                      ))
                    }
                  </div>

                  {
                    showWatchNowButton && (
                      <Button
                        size="lg"
                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 w-full md:max-w-[200px]"
                        asChild
                      >
                        <Link href={ `/watch/${animeFirstEpisode.id}` }>
                          <CirclePlay className="mr-2" />
                          Watch Now
                        </Link>
                      </Button>
                    )
                  }

                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-md text-muted-foreground">
                { currentAnimeDetail.description }
              </p>

              {
                currentAnimeDetail.type !== 'MOVIE' && episodeList.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold my-3">Episodes</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                      {
                        episodeList.slice(0, ANIME_DETAIL_LIMIT_OF_DISPLAYED_EPISODES).map((currentEpisode) => (
                          <Button
                            key={ `${currentAnimeDetail.id}-episode-${currentEpisode.number}` }
                            className="hover:scale-105 hover:ring-1"
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link
                              href={ `/watch/${currentEpisode.id}` }
                              className="flex justify-between"
                            >
                              <span className="mr-1">{ `EP ${currentEpisode.number}` }</span>
                              <span className="capitalize">{ `| ${currentAnimeDetail.subOrDub}` }</span>
                            </Link>
                          </Button>
                        ))
                      }
                    </div>

                    {
                      showWatchMoreEpisodesButton && (
                        <div className="w-full flex justify-center mt-3">
                          <Button
                            className="hover:scale-105 hover:ring-1"
                            variant="outline"
                            asChild
                          >
                            <Link
                              href={ `/watch/${animeFirstEpisode.id}` }
                              scroll={ false }
                            >
                              Watch More Episodes
                            </Link>
                          </Button>
                        </div>
                      )
                    }
                  </>
                )
              }
            </div>
          </>
        )
      }

      { /* calling this component to update metadata in case its being called by intercepted route */ }
      { /* because currently intercepted route canno set metadata by itself */ }
      {
        currentAnimeDetail
        && (
          <UpdateMetadataComponent
            title={ `${currentAnimeDetail.title} - Raznime - Stream Anime Online` }
          />
        )
      }
    </>
  );
}

function SkeletonLoader() {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center md:items-end md:flex-row mb-4">

        <Skeleton className="aspect-3/4 w-full max-w-[300px] mr-4 mb-4 md:mb-0" />

        <div className="w-full space-y-2 flex flex-col items-center md:items-start">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-5 w-80" />

          <div className="flex flex-wrap justify-center md:justify-start">
            {
              Array(4).fill(0).map((_, index) => (
                <Skeleton
                  // eslint-disable-next-line react/no-array-index-key
                  key={ `skeleton-anime-detail-badge-${index}` }
                  className="h-5 w-12 mr-2"
                />
              ))
            }
          </div>

          <Skeleton className="h-10 w-64" />

        </div>

      </div>

      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-full mb-2" />

      <div className="flex flex-col md:flex-row justify-between items-center my-3">
        <h3 className="text-xl font-semibold mb-3 md:mb-0">Episodes</h3>
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 ">
        {
          Array(8).fill(0).map((_, index) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key
              key={ `skeleton-anime-detail-episode-badge-${index}` }
              className="h-5 w-full mr-2"
            />
          ))
        }
      </div>

    </div>
  );
}

const AnimeDetailWithLoader = withLoader(AnimeDetail, SkeletonLoader);

export default AnimeDetailWithLoader;
