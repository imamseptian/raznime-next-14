import { getPopularAnimeCarouselData } from '@/lib/api/anime-api';
import { Skeleton } from '@/components/ui/skeleton';
import { withLoader } from '@/components/hocs/with-loader';
import AnimeCarousel from '@/components/anime/carousel';

/**
 * Asynchronously fetches the popular anime list from the server and renders an AnimeCarousel component with the data.
 *
 * @return {JSX.Element | null} The AnimeCarousel component with the popular anime list data, or null if there was an error fetching the data.
 */
async function PopularCarouselSection() {
  const popularAnimeListResponse = await getPopularAnimeCarouselData();

  const {
    data: popularAnimeList,
    isError,
  } = popularAnimeListResponse ?? {};

  if (isError) {
    return null;
  }

  return (
    <AnimeCarousel animeList={ popularAnimeList ?? [] } />
  );
}

function SkeletonLoader() {
  return (
    <Skeleton className="w-full h-[calc(350px+1rem)]" />
  );
}

const PopularCarouselWithLoader = withLoader(PopularCarouselSection, SkeletonLoader);

export default PopularCarouselWithLoader;
