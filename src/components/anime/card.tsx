import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  type AnimeGenre,
  type AnimeMovie,
  type PopularAnime,
  type RecentAnimeEpisode,
  type TopAiringAnime,
  type Anime,
} from "@/lib/types/anime";
import CustomTooltip from "@/components/custom-tooltip";
import Link, { LinkProps } from "next/link";
import AnimeDetailTooltip from '@/components/anime/tooltip';
import MotionDiv from '@/components/framer/motion-div';

interface AnimeCardProps extends LinkProps {
  anime:
  | Anime
  | AnimeMovie
  | RecentAnimeEpisode
  | PopularAnime
  | TopAiringAnime
  | AnimeGenre;
  cardType: "anime" | "movie" | "episode" | "popular" | "top-airing" | "genre";
  scroll?: boolean;
}

interface GetBadgeValueProps {
  anime:
  | Anime
  | AnimeMovie
  | RecentAnimeEpisode
  | PopularAnime
  | TopAiringAnime
  | AnimeGenre;
  cardType: "anime" | "movie" | "episode" | "popular" | "top-airing" | "genre";
}

/**
 * Returns the left badge value based on the given anime and card type.
 *
 * @param {GetBadgeValueProps} props - The properties containing the anime and card type.
 * @param {Anime | AnimeMovie | RecentAnimeEpisode | PopularAnime | TopAiringAnime | AnimeGenre} props.anime - The anime object.
 * @param {"anime" | "movie" | "episode" | "popular" | "top-airing" | "genre"} props.cardType - The type of card.
 * @return {string | null} The left badge value in uppercase for "anime" card type, or null for other card types.
 */
function getLeftBadgeValue({ anime, cardType }: GetBadgeValueProps) {
  let currentAnime;
  switch (cardType) {
    case "anime":
      currentAnime = anime as Anime;
      return currentAnime.subOrDub.toUpperCase();
    default:
      return null;
  }
}

/**
 * Returns the right badge value based on the given anime and card type.
 *
 * @param {GetBadgeValueProps} props - The properties containing the anime and card type.
 * @param {Anime | AnimeMovie | RecentAnimeEpisode | PopularAnime | TopAiringAnime | AnimeGenre} props.anime - The anime object.
 * @param {"anime" | "movie" | "episode" | "popular" | "top-airing" | "genre"} props.cardType - The type of card.
 * @return {string | null} The right badge value based on the card type. Returns the release date without non-digit characters for "anime" card type. Returns the release date for "movie" card type. Returns "Ep {episodeNumber}" for "episode" card type. Returns the release date for "popular" card type. Returns "Released: {released}" for "genre" card type. Returns "Ep {episodeNumber}" for "top-airing" card type. Returns null for other card types.
 */
function getRightBadgeValue({ anime, cardType }: GetBadgeValueProps) {
  let currentAnime;
  switch (cardType) {
    case "anime":
      currentAnime = anime as Anime;
      return currentAnime.releaseDate.replace(/\D/g, "");
    case "movie":
      currentAnime = anime as AnimeMovie;
      return currentAnime.releaseDate;
    case "episode":
      currentAnime = anime as RecentAnimeEpisode;
      return `Ep ${currentAnime.episodeNumber}`;
    case "popular":
      currentAnime = anime as PopularAnime;
      return currentAnime.releaseDate;
    case "genre":
      currentAnime = anime as AnimeGenre;
      return `Released: ${currentAnime.released}`;
    case "top-airing":
      currentAnime = anime as TopAiringAnime;
      return `Ep ${currentAnime.episodeNumber}`;
    default:
      return null;
  }
}

/**
 * Renders an AnimeCard component.
 *
 * @param {AnimeCardProps} props - The props for the AnimeCard component.
 * @param {Anime} props.anime - The anime object to display.
 * @param {string} props.href - The URL to navigate to when the card is clicked.
 * @param {string} props.cardType - The type of card to display.
 * @param {boolean} [props.scroll=false] - Whether to scroll to the top of the page when navigating.
 * @return {JSX.Element} The rendered AnimeCard component.
 */
export default function AnimeCard({
  anime,
  href,
  cardType,
  scroll = false,
}: AnimeCardProps) {
  const leftBadgeValue  = getLeftBadgeValue({ anime, cardType });
  const rightBadgeValue = getRightBadgeValue({ anime, cardType });

  return (
    <CustomTooltip content={ <AnimeDetailTooltip animeId={ anime.id } /> }>

      <Link
        href={ href }
        scroll={ scroll }
      >
        <MotionDiv
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.6 }}
          variants={{
            hidden  : { opacity: 0, y: 20 },
            visible : { opacity: 1, y: 0 },
          }}
        >
          <div className="hover:scale-105 hover:ring-2 aspect-3/4 w-full overflow-hidden relative mb-3 rounded-lg">

            <Image
              src={ anime.image }
              alt={ anime.title }
              width={ 300 }
              height={ 400 }
              className="w-full rounded-lg"
              placeholder="blur"
              blurDataURL="/images/anime-card-placeholder-blur.png"
            />
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-slate-900 w-full h-1/2 flex p-2">
              <h5 className="self-end text-md font-bold text-gray-50 line-clamp-2 mx-auto text-center">
                { anime.title }
              </h5>
            </div>
            <div className="flex flex-row-reverse w-full absolute top-1 justify-between px-1">
              { rightBadgeValue && (
                <Badge variant="default">
                  { rightBadgeValue }
                </Badge>
              ) }

              { leftBadgeValue && (
                <Badge variant="destructive">
                  { leftBadgeValue }
                </Badge>
              ) }
            </div>
          </div>
        </MotionDiv>

      </Link>
    </CustomTooltip>
  );
}
