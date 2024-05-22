import { fetchTopAiringAnimeList } from '@/lib/api/anime-api';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import CustomTooltip from '@/components/custom-tooltip';
import AnimeDetailTooltip from '@/components/anime/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { withLoader } from '@/components/hocs/with-loader';

/**
 * Renders a list component to displaying the top airing anime.
 * Fetches the top airing anime list from the API and maps over the results to render each anime as a card.
 * Each card contains an image, title, episode number, and a limited number of genres. Clicking on a card navigates to the episode page.
 */
async function AnimeTopAiringSection() {
  const topAiringAnimeListResponse = await fetchTopAiringAnimeList({ pageNumber: 1 });

  return (
    <div className="w-full">
      <h2 className="text-xl text-center mb-3">Top Airing</h2>

      {
        topAiringAnimeListResponse.data?.results.map((anime) => (
          <CustomTooltip
            key={ `top-airing-${anime.id}-link` }
            content={ (
              <AnimeDetailTooltip
                animeId={ anime.id }
              />
            ) }
          >
            <Link
              href={ `/watch/${anime.episodeId}` }
              scroll
            >
              <div className="flex mb-3 items-start hover:scale-105">
                <div className="w-full max-w-[150px] basis-1/3">
                  <div className="w-full aspect-3/4 overflow-hidden rounded-lg">
                    <Image
                      src={ anime.image }
                      alt={ anime.title }
                      className="w-full"
                      width={ 300 }
                      height={ 400 }
                    />
                  </div>
                </div>

                <div className="w-full px-2 basis-2/3">
                  <h5 className="text-sm font-bold line-clamp-2 text-secondary-foreground">
                    { anime.title }
                  </h5>
                  <h6 className="text-xs text-muted-foreground mb-3">
                    { `Episode ${anime.episodeNumber}` }
                  </h6>
                  <div className="flex flex-wrap gap-1">
                    {
                      anime.genres.map((genre, index) => {
                        if (index < 3) {
                          return (
                            <Badge
                              key={ `top-airing-${anime.id}-${genre}-badge` }
                              variant="default"
                            >
                              { genre }
                            </Badge>
                          );
                        }
                        return null;
                      })
                    }
                  </div>
                </div>
              </div>
            </Link>
          </CustomTooltip>
        ))
      }
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="w-full space-y-2">
      {
        Array(10).fill(0).map((_, index) => (
          <div
          // eslint-disable-next-line react/no-array-index-key
            key={ `trending-section-list-item-skeleton-${index}` }
            className="flex"
          >

            <Skeleton
              className="w-full max-w-[150px] aspect-3/4 basis-1/3"
            />

            <div className="w-full basis-2/3 space-y-2 ml-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-16 h-4" />

              <div className="flex flex-wrap gap-1">
                <Skeleton className="w-8 h-4" />
                <Skeleton className="w-8 h-4" />
                <Skeleton className="w-8 h-4" />
                <Skeleton className="w-8 h-4" />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

const AnimeTopAiringSectionWithLoader = withLoader(AnimeTopAiringSection, SkeletonLoader);

export default AnimeTopAiringSectionWithLoader;
