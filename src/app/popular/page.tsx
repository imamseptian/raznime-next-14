import { type Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import PopularAnimeListWithLoader from './popular-anime-list';

export const metadata: Metadata = buildMetadata({
  title: 'Discover Popular Anime - Raznime - Stream Anime Online',
});

export default async function PopularAnimeListPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center lg:text-start mb-3">Popular Anime</h1>

      <PopularAnimeListWithLoader />
    </div>

  );
}
