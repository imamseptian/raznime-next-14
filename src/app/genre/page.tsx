import { ANIME_GENRES } from '@/lib/constants';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';

export const metadata: Metadata = buildMetadata({
  title: 'Genre List - Raznime - Stream Anime Online',
});

interface AnimeGenre {
  id: string;
  title: string;
}

/**
 * Renders the GenreListPage component.
 *
 * This component displays a list of anime genres grouped by the first letter of their ID.
 * Each group is displayed in a card with the group's first letter as the card's title.
 * The genres are sorted alphabetically within each group.
 * Each genre is displayed as a link with the genre's title as the link text.
 *
 * @return {JSX.Element} The rendered GenreListPage component.
 */
export default function GenreListPage() {
  const sortedGenres                                        = [...ANIME_GENRES].sort((a, b) => a.id.localeCompare(b.id));
  const groupedAnimeGenres: { [key: string]: AnimeGenre[] } = {};

  sortedGenres.forEach((genre) => {
    const firstLetter = genre.id.charAt(0).toUpperCase();
    if (groupedAnimeGenres[firstLetter]) {
      groupedAnimeGenres[firstLetter].push(genre);
    } else {
      groupedAnimeGenres[firstLetter] = [genre];
    }
  });

  return (
    <div className="container pt-5 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          Object.keys(groupedAnimeGenres).map((key) => (
            <div className="bg-secondary rounded-lg p-3 shadow-lg border">
              <h3 className="text-2xl font-bold mb-2 text-secondary-foreground">{ key }</h3>
              <ul className="space-y-1 list-disc list-inside">
                {
                  groupedAnimeGenres[key].map((genre) => (
                    <li>
                      <Button
                        variant="link"
                        className="px-0 text-primary-foreground"
                        asChild
                      >
                        <Link href={ `/genre/${genre.id}` }>
                          { genre.title }
                        </Link>
                      </Button>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>

    </div>
  );
}
