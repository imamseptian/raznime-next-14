import { fetchAnimeDetails } from '@/lib/api/anime-api';
import AnimeVideoPlayer from '@/components/anime/video-player';
import { getAnimeIdAndEpisodeNumberFromSlug } from '@/lib/helpers/url-helpers';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { withLoader } from '@/components/hocs/with-loader';
import Link from 'next/link';
import { type AnimeDetailResponse } from '@/lib/types/anime';
import { notFound } from 'next/navigation';
import { AnimeEpisodeList, SkeletonLoader as AnimeListSkeletonLoader } from './episode-list';

/**
 * Renders the video player component for a given episode ID. Fetches anime details
 * asynchronously and displays the anime's information, episode list, and video player.
 *
 * @param {Object} props - The component props.
 * @param {string} props.episodeId - The ID of the episode to display.
 * @return {JSX.Element} The rendered video player component.
 * @throws {Error} If an error occurs during the fetch of anime details.
 */
async function VideoPlayer({ episodeId } : { episodeId: string }) {
  const { animeId } = getAnimeIdAndEpisodeNumberFromSlug(episodeId);

  const { data: currentAnimeDetail, isError, error } = await fetchAnimeDetails({ animeId });

  if (isError) {
    if (error === "Anime that you are looking for is not found") {
      notFound();
    } else {
      throw new Error(error || 'An unexpected error occurred');
    }
  }

  const episodeList = currentAnimeDetail?.episodes ?? [];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-2">
      <div className="basis-1/4 order-2 lg:order-1">
        <AnimeEpisodeList
          animeDetail={ currentAnimeDetail as AnimeDetailResponse }
          initialEpisodeId={ episodeId }
        />
      </div>

      <div className="basis-3/4 order-1 lg:order-2">
        <AnimeVideoPlayer
          episodes={ episodeList }
          initialEpisodeId={ episodeId }
        />

        {
          currentAnimeDetail && (
            <div className="p-3 w-full bg-secondary text-secondary-foreground flex flex-col items-center my-3 rounded-none lg:items-start lg:flex-row lg:mb-0 lg:rounded-lg">

              <div className="overflow-hidden aspect-3/4 max-w-[200px] md:max-w-[400px] mr-4 mb-4 lg:mb-0 rounded-lg">
                <Image
                  src={ currentAnimeDetail.image }
                  alt={ currentAnimeDetail.title }
                  width={ 300 }
                  height={ 400 }
                />
              </div>

              <div className="w-full space-y-2 text-center lg:text-start">
                <span className="text-sm text-muted-foreground font-semibold">
                  { currentAnimeDetail.type }
                  <Badge
                    variant="destructive"
                    className="ml-2"
                  >
                    { currentAnimeDetail.status }
                  </Badge>
                </span>
                <h1 className="text-2xl font-bold">{ currentAnimeDetail.title }</h1>
                { currentAnimeDetail.otherName && <h2 className="text-md text-semibold">{ currentAnimeDetail.otherName }</h2> }

                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {
                    currentAnimeDetail.genres.map((genre) => (
                      <Link
                        key={ `anime-${animeId}-${genre}-genre-badge` }
                        href={ `/genre/${genre.toLocaleLowerCase()}` }
                      >
                        <Badge variant="default">
                          { genre }
                        </Badge>
                      </Link>

                    ))
                  }
                </div>

                <p className="text-md text-muted-foreground">
                  { currentAnimeDetail.description }
                </p>

              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-2">
      <div className="basis-1/4 order-2 lg:order-1">
        <AnimeListSkeletonLoader />
      </div>

      <div className="basis-3/4 order-1 lg:order-2">
        <Skeleton className="w-full aspect-video" />

        <div className="flex justify-between my-2">
          <Skeleton className="w-40 h-8" />
          <Skeleton className="w-40 h-8" />
        </div>

        <div className="flex mt-4">
          <Skeleton className="w-40 h-8" />
          <div className="ml-3 flex gap-2">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-40 h-8" />
          </div>
        </div>

        <div className="flex mt-4">
          <Skeleton className="overflow-hidden aspect-3/4 max-w-[200px] mr-4 mb-4 lg:mb-0 w-full" />
          <div className="w-full space-y-2 text-center lg:text-start">
            <div className="flex gap-2">
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-20 h-3" />
            </div>

            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-40 h-4" />

            <div className="flex gap-2">
              <Skeleton className="w-10 h-3" />
              <Skeleton className="w-10 h-3" />
              <Skeleton className="w-10 h-3" />
              <Skeleton className="w-10 h-3" />
            </div>

            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

const VideoPlayerWithLoader = withLoader(VideoPlayer, SkeletonLoader);

export default VideoPlayerWithLoader;
