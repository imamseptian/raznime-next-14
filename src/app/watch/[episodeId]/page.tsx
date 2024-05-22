import AnimeTopAiringSectionWithLoader from '@/components/anime/top-airing-section';
import { getAnimeIdAndEpisodeNumberFromSlug } from '@/lib/helpers/url-helpers';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import { fetchAnimeDetails } from '@/lib/api/anime-api';
import VideoPlayerWithLoader from './video-player';

export const generateMetadata = async ({ params: { episodeId } }: WatchAnimeEpisodePageProps): Promise<Metadata> => {
  const { animeId, episodeNumber } = getAnimeIdAndEpisodeNumberFromSlug(episodeId);

  const { data: currentAnimeDetail } = await fetchAnimeDetails({ animeId });

  const {
    title,
    description,
    image,
    genres,
  } = currentAnimeDetail ?? {};

  const metadataTitle       = `${title ? `${title} Episode ${episodeNumber}` : `Not Found`} - Raznime - Stream Anime Online`;
  const metadataDescription = description;

  return buildMetadata({
    title       : metadataTitle,
    description : metadataDescription,
    keywords    : genres ?? [],
    openGraph   : {
      title       : metadataTitle,
      description : metadataDescription,
      url         : `${process.env.NEXT_PUBLIC_BASE_URL}/detail/${animeId}`,
      images      : [
        {
          url    : image ?? '',
          width  : 300,
          height : 400,
        },
      ],
    },
    twitter: {
      title       : metadataTitle,
      description : metadataDescription,
      images      : [
        {
          url    : image ?? '',
          width  : 300,
          height : 400,
        },
      ],
    },
  });
};

/**
 * @type {Object}
 * @property {Object} params - Next.js router params
 * @property {string} params.episodeId - The episode ID
 */
interface WatchAnimeEpisodePageProps {
  params: { episodeId: string }
}

/**
 * Renders the Page to watch an anime episode.
 */
export default async function WatchAnimeEpisodePage({
  params: { episodeId },
}: WatchAnimeEpisodePageProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full lg:container pt-3">
      <section id="video-player-section" className="basis-4/5">
        <VideoPlayerWithLoader episodeId={ episodeId } />
      </section>

      <div id="episode-player-page-top-airing-section" className="basis-1/5 order-3 px-3 lg:px-0">
        <AnimeTopAiringSectionWithLoader />
      </div>
    </div>
  );
}
