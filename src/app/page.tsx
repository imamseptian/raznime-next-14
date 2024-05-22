import AnimeTopAiringSectionWithloader from '@/components/anime/top-airing-section';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import PopularCarouselWithLoader from './popular-carousel';
import HomepageAnimeMovieListWithLoader from './homepage-movie-list';
import HomepageRecentEpisodeListWithLoader from './homepage-recent-episode-list';

export const metadata: Metadata = buildMetadata({
  title: 'Home - Raznime - Stream Anime Online',
});

export default async function Homepage() {
  return (
    <div className="w-full">

      <section
        id="popular-anime-carousel-section"
        className="w-full lg:container mb-5"
      >
        <PopularCarouselWithLoader />
      </section>

      <div className="container ">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:basis-3/4">

            <section id="homepage-recent-anime-episodes-section">
              <div className="flex justify-between items-center p-0 my-5 ">
                <h2 className="text-2xl font-bold">Recent Anime Episodes</h2>

                <Button
                  className="p-0"
                  variant="link"
                  asChild
                >
                  <Link
                    href="/recent-release"
                    className="text-secondary-foreground"
                  >
                    View More
                    <ChevronRight size={ 20 } />
                  </Link>
                </Button>
              </div>

              <HomepageRecentEpisodeListWithLoader />
            </section>

            <section id="homepage-anime-movies-section">
              <div className="flex justify-between items-center p-0 my-5 ">
                <h2 className="text-2xl font-bold">Anime Movies</h2>

                <Button
                  className="p-0"
                  variant="link"
                  asChild
                >
                  <Link
                    href="/movies"
                    className="text-secondary-foreground"
                  >
                    View More
                    <ChevronRight size={ 20 } />
                  </Link>
                </Button>
              </div>
              <HomepageAnimeMovieListWithLoader />
            </section>

          </div>

          <section id="homepage-top-airing-section" className="lg:basis-1/4">
            <AnimeTopAiringSectionWithloader />
          </section>

        </div>
      </div>

    </div>
  );
}
