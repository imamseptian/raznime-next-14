import { type AnimeDetailResponse } from '@/lib/types/anime';
import { ChevronRight, CirclePlay } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * Renders the content of an anime carousel item.
 *
 * @param {Object} props - The props object.
 * @param {AnimeDetailResponse} props.anime - The anime object with its details.
 * @param {number} [props.index=0] - The index of the anime item in the carousel. To display ranking number
 * @return {JSX.Element} The rendered anime carousel item content.
 */
export default function AnimeCarouselContent({ anime, index = 0 }: { anime: AnimeDetailResponse, index: number }) {
  const animeFirstEpisode = anime.episodes[0];

  return (
    <div
      key={ anime.id }
      className="flex-none w-full"
    >
      <div
        className="relative bg-cover bg-no-repeat bg-center rounded-b-lg"
        style={{
          backgroundImage: `url(${anime.image})`,
        }}
      >
        <div className="flex items-center bg-black/80 backdrop-blur-sm p-0 rounded-b-lg">

          <div className="pl-4 md:pl-8 w-full flex-shrink-1">
            <h3 className="text-[#FF9119] font-bold text-lg lg:text-3xl mb-3">
              { `#${index + 1} Spotlight` }
            </h3>

            <span className="text-gray-300 hidden md:block text-sm mb-2">
              { anime.type }
              <Badge
                variant="destructive"
                className="ml-2"
              >
                { anime.status }
              </Badge>
            </span>

            <h3 className="text-white text-lg line-clamp-2 font-bold lg:text-2xl mb-2">{ anime.title }</h3>

            { anime.otherName && <h4 className="text-gray-200 hidden lg:line-clamp-2 text-md mb-2">{ anime.otherName }</h4> }

            <div className="hidden lg:flex flex-wrap mb-3">
              {
                anime.genres.slice(0, 3).map((genre) => (
                  <Link
                    key={ `anime-${anime.id}-${genre}-genre-badge` }
                    href={ `/genre/${genre.toLocaleLowerCase()}` }
                  >
                    <Badge
                      variant="default"
                      className="mr-1 mb-1"
                    >
                      { genre }
                    </Badge>
                  </Link>
                ))
              }
            </div>

            <p className="hidden md:line-clamp-3 text-sm text-gray-300 mb-3">
              { anime.description }
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              {
                animeFirstEpisode && (
                  <Button
                    className="text-white text-xs bg-[#FF9119] hover:bg-[#FF9119]/80 lg:text-md"
                    size="sm"
                    asChild
                  >
                    <Link href={ `/watch/${animeFirstEpisode.id}` }>
                      <CirclePlay size={ 15 } className="mr-1" />
                      Watch Now
                    </Link>
                  </Button>
                )
              }

              <Button
                variant="link"
                size="sm"
                className="text-xs text-white p-0 lg:text-md"
                asChild
              >
                <Link href={ `/detail/${anime.id}` }>
                  Detail
                  <ChevronRight className="ml-2" />
                </Link>
              </Button>
            </div>

          </div>

          <div className="flex-shrink-0 overflow-hidden w-[40%] md:w-[35%] lg:w-[30%] flex justify-end lg:justify-start">
            <Image
              src={ anime.image }
              alt={ anime.title }
              width={ 300 }
              height={ 400 }
              className="parallelogram h-full aspect-3/4"
              draggable={ false }
            />
          </div>

        </div>
      </div>
    </div>
  );
}
