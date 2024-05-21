import { ANIME_GENRES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import React from 'react';
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/services/metadata-service';
import AnimeGenreListWithloader from './anime-genre-list';

export const generateMetadata = ({ params: { genreId } }: GenreAnimeListPageProps): Metadata => {
  const genreLabel = ANIME_GENRES.find((genre) => genre.id === genreId)?.title || '';

  return buildMetadata({
    title: `${genreLabel} Anime - Raznime - Stream Anime Online`,
  });
};

interface GenreAnimeListPageProps {
  params: {
    genreId: string
  }
}

export default function GenreAnimeListPage({ params: { genreId } }: GenreAnimeListPageProps) {
  const currentGenre = ANIME_GENRES.find((genre) => genre.id === genreId);

  if (!currentGenre) {
    notFound();
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-center lg:text-start mb-3">{ `${currentGenre?.title} Anime` }</h1>

      <AnimeGenreListWithloader genreId={ genreId } />
    </div>
  );
}
