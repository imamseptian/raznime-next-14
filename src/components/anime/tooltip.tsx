'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchAnimeDetails } from '@/lib/api/anime-api';
import { ArrowDownRight, CirclePlay, RefreshCcw } from "lucide-react";
import Image from 'next/image';
import { type AnimeDetailResponse } from '@/lib/types/anime';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { type FetchApiResponse } from '@/lib/api/fetch-api';
import { Badge } from '@/components/ui/badge';

interface AnimeDetailTooltipProps {
  animeId: string;
}

/**
 * Renders the AnimeDetailTooltip component, which displays detailed information about an anime when hovered over.
 *
 * @param {AnimeDetailCardProps} props - The props object containing the animeId.
 * @return {JSX.Element} The rendered AnimeDetailTooltip component.
 */
export default function AnimeDetailTooltip({ animeId }: AnimeDetailTooltipProps) {
  const {
    data: animeDetailResponse,
    isFetching,
  } = useQuery<FetchApiResponse<AnimeDetailResponse>, Error>({
    queryKey : [`anime-${animeId}-detail`],
    queryFn  : () => fetchAnimeDetails({ animeId }),
  });

  if (isFetching) {
    return (
      <div className="relative items-center">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="relative items-center">
      {
        animeDetailResponse?.data ? (
          <AnimeDetailContent currentAnimeDetail={ animeDetailResponse.data } />
        ) : (
          <h2>
            Fail to fetch anime detail
          </h2>
        )
      }
    </div>
  );
}

/**
 * Renders the content of the anime detail component.
 *
 * @param {Object} props - The props object containing the currentAnimeDetail.
 * @param {AnimeDetailResponse} props.currentAnimeDetail - The current anime detail.
 * @return {JSX.Element} The rendered anime detail content.
 */
function AnimeDetailContent({ currentAnimeDetail }: { currentAnimeDetail: AnimeDetailResponse }) {
  return (
    <div className="flex w-full">
      <div className="w-2/3 overflow-hidden aspect-2/3 mr-3 relative">
        <Image
          src={ currentAnimeDetail.image }
          alt=""
          className="w-full rounded-lg"
          width={ 300 }
          height={ 450 }
        />
        <Badge
          variant="default"
          className="absolute top-1 left-1 uppercase"
        >
          { currentAnimeDetail.subOrDub }
        </Badge>
      </div>

      <div className="w-full">
        <h3 className="text-sm line-clamp-2 mb-2">{ currentAnimeDetail.title }</h3>

        <p className="text-xs text-muted-foreground line-clamp-6">
          { currentAnimeDetail.description }
        </p>

        <AnimeDetailTable currentAnimeDetail={ currentAnimeDetail } />

        <div className="flex w-full space-x-1 items-center justify-center">
          <Button
            size="sm"
            className="text-xs text-white bg-[#FF9119] hover:bg-[#FF9119]/80 w-full"
            asChild
          >
            <Link href={ `/watch/${currentAnimeDetail.id}-episode-1` }>
              <CirclePlay className="mr-2" />
              Watch Now
            </Link>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            asChild
          >
            <Link
              href={ `/detail/${currentAnimeDetail.id}` }
              scroll={ false }
            >
              <ArrowDownRight className="text-secondary-foreground" />
            </Link>
          </Button>
        </div>
      </div>

    </div>
  );
}

/**
 * Renders a table displaying detailed information about an anime.
 *
 * @param {Object} props - The props object containing the currentAnimeDetail.
 * @param {AnimeDetailResponse} props.currentAnimeDetail - The current anime detail.
 * @return {JSX.Element} The rendered anime detail table.
 */
function AnimeDetailTable({ currentAnimeDetail }: { currentAnimeDetail: AnimeDetailResponse }) {
  return (
    <table className="text-xs w-full text-left my-3">
      <tbody>
        {
          currentAnimeDetail.otherName && (
            <tr>
              <th className="align-text-top whitespace-nowrap pr-2" scope="row">
                Other names
              </th>
              <td className="line-clamp-4">{ currentAnimeDetail.otherName }</td>
            </tr>
          )
        }

        <tr>
          <th className="align-text-top whitespace-nowrap pr-2" scope="row">
            Release Date
          </th>
          <td>{ currentAnimeDetail.releaseDate }</td>
        </tr>

        <tr>
          <th className="align-text-top whitespace-nowrap pr-2" scope="row">
            Type
          </th>
          <td>{ currentAnimeDetail.type }</td>
        </tr>

        <tr>
          <th className="align-text-top whitespace-nowrap pr-2" scope="row">
            Status
          </th>
          <td>{ currentAnimeDetail.status }</td>
        </tr>

        <tr>
          <th className="align-text-top whitespace-nowrap pr-2" scope="row">
            Genres
          </th>
          <td>{ currentAnimeDetail.genres.join(', ') }</td>
        </tr>
      </tbody>
    </table>
  );
}

function SkeletonLoader() {
  return (
    <>
      <div className="flex w-full items-center opacity-50">
        <Skeleton className="w-40 h-40 mr-2" />
        <div className="w-full">
          <Skeleton className="h-3 w-40" />
          <div className="flex space-x-1 my-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>

          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>

          <Skeleton className="h-5 w-full mt-10" />
        </div>
      </div>
      <RefreshCcw className="absolute top-1/2 left-1/2 text-primary animate-spin font-bold" />
    </>
  );
}
