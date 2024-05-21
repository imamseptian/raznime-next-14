import { type Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import AnimeMovieListWithLoader from './movie-list';

export const metadata: Metadata = buildMetadata({
  title: 'Discover Anime Movies - Raznime - Stream Anime Online',
});

export default async function AnimeMovieListPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center lg:text-start mb-5">Discover Anime Movies</h1>
      <AnimeMovieListWithLoader />
    </div>
  );
}
