import { type Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import RecentEpisodeListWithLoader from './recent-episode-list';

export const metadata: Metadata = buildMetadata({
  title: 'Recent Released Episodes - Raznime - Stream Anime Online',
});

export default async function RecentReleasePage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center lg:text-start mb-5">Recent Released Episode</h1>
      <RecentEpisodeListWithLoader />
    </div>
  );
}
