import { fetchPopularAnimeList } from '@/lib/api/anime-api';
import InfiniteScroll from '@/components/infinite-scroll';
import { withLoader } from '@/components/hocs/with-loader';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import AnimeCard from '@/components/anime/card';

/**
 * Fetches list of popular anime from the server and renders them as a grid of AnimeCards.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the grid of AnimeCards.
 * @throws {Error} If an unexpected error occurs during the fetch.
 */
async function PopularAnimeList() {
  const popularAnimeListResponse = await fetchPopularAnimeList({ pageNumber: 1 });

  const {
    isError, data, error,
  } = popularAnimeListResponse || {};

  const { results: animeResults } = data || {};

  if (isError || !animeResults) {
    throw new Error(error || 'An unexpected error occurred');
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 relative">

      {
        animeResults.map((anime) => (
          <AnimeCard
            key={ `popular-anime-card-${anime.id}` }
            anime={ anime }
            cardType="popular"
            href={ `/detail/${anime.id}` }
          />
        ))
      }

      <InfiniteScroll cardType="popular" />
    </div>
  );
}

const PopularAnimeListWithLoader = withLoader(PopularAnimeList, AnimeListSkeletonLoader);

export default PopularAnimeListWithLoader;
