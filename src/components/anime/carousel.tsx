/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { type AnimeDetailResponse } from '@/lib/types/anime';
import React, {
  useEffect,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Swipeable from '@/components/swipeable';
import AnimeCarouselContent from './carousel-content';

interface CarouselProps {
  animeList: AnimeDetailResponse[];
}

/**
 * Renders a carousel of anime items.
 *
 * @param {CarouselProps} props - The props object containing the animeList.
 * @param {AnimeDetailResponse[]} props.animeList - The list of anime with its detail to display in the carousel.
 * @return {JSX.Element} The rendered carousel component.
 */
function AnimeCarousel({ animeList }: CarouselProps) {
  const [currentSlide, setCurrentSlide]   = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? animeList.length - 1 : prevSlide - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === animeList.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isInteracting) {
        handleNextClick();
      }
    }, 5000); // Change the interval duration as needed

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [handleNextClick]);

  return (
    <Swipeable onSwipeLeft={ handleNextClick } onSwipeRight={ handlePrevClick }>

      { /* To prevent autoplay when user still interacting with carousel */ }
      <div
        className="w-full relative"
        onTouchStart={ () => setIsInteracting(true) }
        onTouchEnd={ () => setIsInteracting(false) }
        onMouseDown={ () => setIsInteracting(true) }
        onMouseUp={ () => setIsInteracting(false) }
        style={{ userSelect: 'none' }}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={ handlePrevClick }
          className="hidden lg:block absolute left-[-3%] top-1/2 rounded-full"
        >
          <ChevronLeft size={ 30 } />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={ handleNextClick }
          className="hidden lg:block absolute right-[-3%] top-1/2 rounded-full"
        >
          <ChevronRight size={ 30 } />
        </Button>

        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {
              animeList.map((anime, index) => (
                <AnimeCarouselContent
                  key={ `anime-carousel-${anime.id}` }
                  anime={ anime }
                  index={ index }
                />
              ))
            }
          </div>
        </div>

      </div>
    </Swipeable>

  );
}

export default AnimeCarousel;
