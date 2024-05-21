import AnimeCard from '@/components/anime/card';
import { withLoader } from '@/components/hocs/with-loader';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import { fetchAnimeMovieList } from '@/lib/api/anime-api';
import React from 'react';

/**
 * Asynchronously fetches the list of anime movies from the server and renders them as a grid of AnimeCards.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the grid of AnimeCards.
 * @throws {Error} If an unexpected error occurs during the fetch.
 */
async function HomepageAnimeMovieList() {
  const animeMovieListResponse = await fetchAnimeMovieList({ pageNumber: 1 });

  const {
    isError, data, error,
  } = animeMovieListResponse;

  const { results: animeResults } = data ?? {};

  if (isError || !animeResults) {
    return (
      <div className="w-full flex justify-center items-center">
        <h3>{ error || 'Error occured during fetching anime movie list' }</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 relative">
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
    </div>
  );
}

const HomepageAnimeMovieListWithLoader = withLoader(HomepageAnimeMovieList, AnimeListSkeletonLoader);

export default HomepageAnimeMovieListWithLoader;
