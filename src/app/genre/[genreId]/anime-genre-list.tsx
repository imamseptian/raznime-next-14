import { fetchAnimeByGenre } from '@/lib/api/anime-api';
import InfiniteScroll from '@/components/infinite-scroll';
import { withLoader } from '@/components/hocs/with-loader';
import AnimeListSkeletonLoader from '@/components/skeleton-loader/anime-list';
import AnimeCard from '@/components/anime/card';

/**
 * Fetch list of anime based on the genre from the server and renders them as a grid of AnimeCards.
 *
 * @param {string} genreId - The ID of the genre.
 * @return {Promise<JSX.Element>} A JSX element containing the list of anime cards.
 * @throws {Error} If an unexpected error occurs during the fetch.
 */
async function AnimeGenreList({ genreId }: { genreId: string }) {
  const animeGenreListResponse = await fetchAnimeByGenre({ pageNumber: 1, genre: genreId });

  const {
    isError, data, error,
  } = animeGenreListResponse ?? {};

  const { results: animeResults } = data ?? {};

  if (isError) {
    throw new Error(error || 'An unexpected error occurred');
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 relative">
      {
        animeResults && (
          <>
            {
              animeResults.map((anime) => (
                <AnimeCard
                  key={ `genre-anime-card-${anime.id}` }
                  anime={ anime }
                  cardType="genre"
                  href={ `/detail/${anime.id}` }
                />
              ))
            }
          </>
        )
      }

      <InfiniteScroll cardType="genre" genreId={ genreId } />
    </div>
  );
}

const AnimeGenreListWithloader = withLoader(AnimeGenreList, AnimeListSkeletonLoader);

export default AnimeGenreListWithloader;
