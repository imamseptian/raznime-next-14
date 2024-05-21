import AnimeDetailWithLoader from '@/app/@modal/(.)detail/[animeId]/anime-detail';
import Homepage from '@/app/page';
import ModalWrapper from '@/components/modal-wrapper';
import { fetchAnimeDetails } from '@/lib/api/anime-api';
import { buildMetadata } from '@/lib/services/metadata-service';
import { Metadata } from 'next';
import React from "react";

interface AnimeDetailPageProps {
  params: { animeId: string }
}

/**
 * Generates metadata for the anime detail page based on the provided anime ID.
 *
 * @param {AnimeDetailPageProps} props - The props object containing the anime ID.
 * @returns {Promise<Metadata>} A promise that resolves to the generated metadata.
 */
export const generateMetadata = async ({ params: { animeId } }: AnimeDetailPageProps): Promise<Metadata> => {
  const { data: animeDetail } = await fetchAnimeDetails({ animeId });

  const {
    title, image, description, genres,
  } = animeDetail ?? {};

  const metadataTitle       = `${title ?? 'Not Found'} - Raznime - Stream Anime Online`;
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
 * Renders the AnimeDetailPage component.
 *
 * @param {AnimeDetailPageProps} props - The component props.
 * @param {string} props.params.animeId - The ID of the anime.
 * @return {JSX.Element} The rendered AnimeDetailPage component.
 */
export default async function AnimeDetailPage({
  params: { animeId },
}: AnimeDetailPageProps) {
  return (
    <>
      <Homepage />

      <ModalWrapper
        expectedPath={ `/detail/${animeId}` }
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        exit={{ y: '100vh' }}
        transition={{
          duration : 0.5,
          type     : "spring",
          damping  : 15,
        }}
        className="max-w-2xl lg:max-w-5xl"
        key={ `modal-${animeId}` }
      >
        <AnimeDetailWithLoader animeId={ animeId } />
      </ModalWrapper>
    </>
  );
}
