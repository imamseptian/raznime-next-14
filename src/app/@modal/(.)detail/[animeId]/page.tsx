import ModalWrapper from '@/components/modal-wrapper';
import React from "react";
import AnimeDetailWithLoader from './anime-detail';

interface AnimeDetailPageInterceptProps {
  params: { animeId: string }
}

/**
 * Render modal that contain anime detail information
 *
 * @param {AnimeDetailPageInterceptProps} props - The component props
 * @param {string} props.params.animeId - The ID of the anime
 * @return {JSX.Element} The rendered modal component
 */
export default async function AnimeDetailPageIntercept({
  params: { animeId },
}: AnimeDetailPageInterceptProps) {
  return (
    <ModalWrapper
      expectedPath={ `/detail/${animeId}` }
      initial={{ y: '100vh' }}
      animate={{ y: 0 }}
      exit={{ y: '100vh' }}
      transition={{
        duration : 0.5,
        type     : "spring",
        damping  : 15,
      }}
      className="max-w-2xl lg:max-w-5xl"
      key={ `modal-${animeId}` }
    >
      <AnimeDetailWithLoader animeId={ animeId } />
    </ModalWrapper>
  );
}
