'use client';

import {
  type AnimeDetailEpisode,
  type AnimeDetailResponse,
} from '@/lib/types/anime';
import { ArrowDown01, ArrowDown10, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAnimeIdAndEpisodeNumberFromSlug } from '@/lib/helpers/url-helpers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import ShallowLink from '@/components/shallow-link';
import { updateMetadataFromClient } from '@/lib/services/metadata-service';

/**
 * Sorts an array of AnimeDetailEpisode objects based on the episode number.
 *
 * @param arrayOfEpisodes - The array of episodes to be sorted.
 * @param sortDir - The sorting direction. 'asc' for ascending order, 'desc' for descending order. Defaults to 'desc'.
 * @returns The sorted array of episodes.
 */
const sortEpisodes = (arrayOfEpisodes: AnimeDetailEpisode[], sortDir: 'asc' | 'desc' = 'desc') => {
  const arrayToSort = [...arrayOfEpisodes];
  if (sortDir === 'asc') {
    return arrayToSort.sort((a, b) => a.number - b.number);
  }

  return arrayToSort.sort((a, b) => b.number - a.number);
};

/**
 * Props for the AnimeEpisodeList component.
 *
 * @property {AnimeDetailEpisode[]} episodes - The list of episodes to be displayed.
 * @property {string} animeTitle - The title of the anime. Used for the page title and metadata.
 */
interface AnimeEpisodeListProps {
  animeDetail: AnimeDetailResponse;
  initialEpisodeId: string;
}

/**
 * Renders a list of anime episodes.
 */
export function AnimeEpisodeList({ animeDetail, initialEpisodeId }: AnimeEpisodeListProps) {
  const episodes = animeDetail?.episodes ?? [];

  const searchParams = useSearchParams();
  const queryParams  = Object.fromEntries(searchParams);
  const pathName     = usePathname();

  const [currentEpisodeId, setCurrentEpisodeId] = useState(initialEpisodeId);

  useEffect(() => {
    const { animeId }    = getAnimeIdAndEpisodeNumberFromSlug(initialEpisodeId);
    const regexPattern   = new RegExp(`${animeId}-episode-\\d+`);
    const matchEpisodeId = pathName.match(regexPattern);
    if (matchEpisodeId) {
      setCurrentEpisodeId(matchEpisodeId[0]);
    }
  }, [pathName]);

  const [sortDir, setSortDir]         = useState<'asc' | 'desc'>('desc');
  const [episodeList, setEpisodeList] = useState(sortEpisodes(episodes, 'desc'));

  useEffect(() => {
    setEpisodeList(sortEpisodes(episodeList, sortDir));
  }, [sortDir]);

  /**
   * Handles the form submission for filtering episodes based on the episode number.
   *
   * @param formData - The form data containing the episode number.
   */
  const onSubmit = (formData: FormData) => {
    const episodeNumber = formData.get('episodeNumber');

    if (episodeNumber) {
      const updatedEpisodeList = episodes.filter((episode) => episode.number.toString().includes(episodeNumber as string));
      setEpisodeList(sortEpisodes(updatedEpisodeList, sortDir));
    } else {
      setEpisodeList(sortEpisodes(episodes, sortDir));
    }
  };

  const handleLinkClick = (episodeId: string) => {
    const { episodeNumber } = getAnimeIdAndEpisodeNumberFromSlug(episodeId);
    updateMetadataFromClient({
      title: `${animeDetail.title} Episode ${episodeNumber} - Raznime - Stream Anime Online`,
    });
  };

  return (
    <div className="w-full border p-3 rounded-none lg:rounded-lg">
      <form
        action={ onSubmit }
        className="flex justify-between items-center gap-2"
      >
        <Input
          type="text"
          name="episodeNumber"
          placeholder="Search for episodes"
          className="w-full"
        />
        <Button size="icon" variant="outline">
          {
            sortDir === 'asc'
              ? <ArrowDown01 onClick={ () => setSortDir('desc') } />
              : <ArrowDown10 onClick={ () => setSortDir('asc') } />
          }
        </Button>
        <button className="sr-only" type="submit">Search</button>
      </form>

      <ul className="w-full divide-y divide-secondary mt-3 max-h-[40vh] lg:max-h-[70vh] overflow-y-auto">
        {
          episodeList.map((episode, index) => {
            const isActive = episode.id === currentEpisodeId;
            let color      = index % 2 === 0 ? 'bg-secondary text-secondary-foreground' : 'bg-secondary-accent text-accent-foreground';
            if (isActive) {
              color = 'bg-primary text-primary-foreground';
            }

            return (
              <li
                key={ `anime-link-${episode.id}` }
                className={ `${color} hover:bg-destructive hover:text-destructive-foreground p-0` }
              >
                <ShallowLink
                  href={{
                    pathname : `/watch/${episode.id}`,
                    query    : queryParams,
                  }}
                  onLinkClick={ () => handleLinkClick(episode.id) }
                  scroll
                >
                  <div className="flex justify-between items-center p-2">
                    <p className="text-sm">
                      { `Episode ${episode.number}` }
                    </p>
                    {
                      isActive && <Play className="text-primary-foreground" />
                    }
                  </div>

                </ShallowLink>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="w-full space-y-2">
      {
        Array(10).fill(0).map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={ `episode-list-item-skeleton-${index}` }
            className="w-full h-8"
          />
        ))
      }
    </div>
  );
}
