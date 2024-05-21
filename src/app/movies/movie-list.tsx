import AnimeCard from '@/components/anime/card';
import { withLoader } from '@/components/hocs/with-loader';
import InfiniteScroll from '@/components/infinite-scroll';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import { fetchAnimeMovieList } from '@/lib/api/anime-api';
import React from 'react';

/**
 * Fetch list of anime movies from the server and renders them as a grid of AnimeCards.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the grid of AnimeCards.
 * @throws {Error} If an unexpected error occurs during the fetch.
 */
async function AnimeMovieList() {
  const animeMovieListResponse = await fetchAnimeMovieList({ pageNumber: 1 });

  const {
    isError, data, error,
  } = animeMovieListResponse;

  const { results: animeResults } = data ?? {};

  if (isError || !animeResults) {
    throw new Error(error || 'An unexpected error occurred');
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 relative">
      {
        animeResults.map((anime) => (
          <AnimeCard
            key={ `anime-movie-card-${anime.id}` }
            anime={ anime }
            cardType="movie"
            href={ `/detail/${anime.id}` }
          />
        ))
      }

      <InfiniteScroll cardType="movie" />
    </div>
  );
}

const AnimeMovieListWithLoader = withLoader(AnimeMovieList, AnimeListSkeletonLoader);

export default AnimeMovieListWithLoader;
