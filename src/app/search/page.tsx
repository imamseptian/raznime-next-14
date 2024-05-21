import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import AnimeSearchResultsWithLoader from './results';

interface AnimeSearchPageProps {
  searchParams: {
    query: string | undefined;
    animeId?: string;
    episode?: string;
    numberOfDisplayedEpisode?: string;
    [key: string]: string | string[] | undefined
  }
}
export const generateMetadata = ({ searchParams }: AnimeSearchPageProps): Metadata => {
  const decodedQuery = searchParams.query ? decodeURIComponent(searchParams.query) : '';

  return buildMetadata({
    title: `"${decodedQuery}" Search Results - Raznime - Stream Anime Online`,
  });
};

export default async function AnimeSearchPage({
  searchParams,
}: AnimeSearchPageProps) {
  const searchQuery = searchParams.query;

  if (!searchQuery) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center mb-3 lg:text-center">
        Search Results for
        <br />
        <span>
          { `"${searchQuery}"` }
        </span>
      </h1>
      {
        searchQuery && <AnimeSearchResultsWithLoader searchQuery={ searchQuery } />
      }

    </div>

  );
}
