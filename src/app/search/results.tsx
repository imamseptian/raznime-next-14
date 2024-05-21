import AnimeCard from '@/components/anime/card';
import { withLoader } from '@/components/hocs/with-loader';
import InfiniteScroll from '@/components/infinite-scroll';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import { searchAnime } from '@/lib/api/anime-api';
import Image from 'next/image';
import React from 'react';

/**
 * Fetches search results for anime based on the provided search query.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchQuery - The search query for anime.
 * @return {Promise<JSX.Element>} The JSX element representing the search results.
 * @throws {Error} If an unexpected error occurs during the search.
 */
export async function AnimeSearchResults({ searchQuery }: { searchQuery: string }) {
  const searchResultsResponse = searchQuery ? await searchAnime({ searchQuery: searchQuery as string, pageNumber: 1 }) : null;

  const {
    isError, data, error,
  } = searchResultsResponse ?? {};

  const { results: animeResults } = data ?? {};

  if (!animeResults || animeResults.length === 0) {
    return <EmptyResults />;
  }

  if (isError && error === "Can't find anime that you are looking for") {
    return <EmptyResults />;
  }

  if (isError) {
    throw new Error(error || 'An unexpected error occurred');
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 relative">
      {
        animeResults.map((anime) => (
          <AnimeCard
            key={ `anime-card-${anime.id}` }
            anime={ anime }
            cardType="anime"
            href={ `/detail/${anime.id}` }
          />
        ))
      }

      <InfiniteScroll cardType="anime" />
    </div>
  );
}

/**
 * Renders the component for displaying a message when no search results are found.
 *
 * @return {JSX.Element} The JSX element representing the empty search results message.
 */
function EmptyResults() {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="w-full md:w-1/2 aspect-square overflow-hidden mb-3">
        <Image
          src="/images/anya-500.png"
          alt="Not Found"
          width={ 500 }
          height={ 500 }
          className="w-full aspect-square"
        />
      </div>
      <p className="text-center text-2xl">
        Oops! Seems page or anime that you are looking for is not found
      </p>
    </div>
  );
}

const AnimeSearchResultsWithLoader = withLoader(AnimeSearchResults, AnimeListSkeletonLoader);

export default AnimeSearchResultsWithLoader;
