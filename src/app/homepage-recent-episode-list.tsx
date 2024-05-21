import AnimeCard from '@/components/anime/card';
import { withLoader } from '@/components/hocs/with-loader';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import { fetchRecentEpisodes } from '@/lib/api/anime-api';
import React from 'react';

/**
 * Fetches the recent anime episodes and renders them as a grid of AnimeCards.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the grid of AnimeCards.
 */
async function HomepageRecentEpisodeList() {
  const { isError, data: recentEpisodeResponse, error } = await fetchRecentEpisodes({});

  const { results: recentAnimeEpisodes } = recentEpisodeResponse ?? {};

  if (isError || !recentAnimeEpisodes) {
    return (
      <div className="w-full flex justify-center items-center">
        <h3>{ error || 'Error occured during fetching recent anime episode list' }</h3>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 relative">
        {
          recentAnimeEpisodes.map((anime) => (
            <AnimeCard
              key={ `anime-episode-card-${anime.episodeId}` }
              anime={ anime }
              cardType="episode"
              href={ `/watch/${anime.episodeId}` }
              scroll
            />
          ))
        }
      </div>
    </div>
  );
}

const HomepageRecentEpisodeListWithLoader = withLoader(HomepageRecentEpisodeList, AnimeListSkeletonLoader);

export default HomepageRecentEpisodeListWithLoader;
