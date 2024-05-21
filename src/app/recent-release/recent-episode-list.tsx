import AnimeCard from '@/components/anime/card';
import { withLoader } from '@/components/hocs/with-loader';
import InfiniteScroll from '@/components/infinite-scroll';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import { fetchRecentEpisodes } from '@/lib/api/anime-api';
import React from 'react';

/**
 * Fetch list of recent anime episodes and renders them as a grid of AnimeCards.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the grid of AnimeCards.
 * @throws {Error} If an unexpected error occurs during the fetch.
 */
async function RecentEpisodeList() {
  const {
    isError, data, error,
  } = await fetchRecentEpisodes({});

  const { results: animeResults } = data ?? {};

  if (isError || !animeResults) {
    throw new Error(error || 'An unexpected error occurred');
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 relative">
        {
          animeResults.map((anime) => (
            <AnimeCard
              key={ `anime-episode-card-${anime.episodeId}` }
              anime={ anime }
              cardType="episode"
              href={ `/watch/${anime.episodeId}` }
              scroll
            />
          ))
        }

        <InfiniteScroll cardType="episode" />
      </div>
    </div>
  );
}

const RecentEpisodeListWithLoader = withLoader(RecentEpisodeList, AnimeListSkeletonLoader);

export default RecentEpisodeListWithLoader;
