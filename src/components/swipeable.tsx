'use client';

import React, { useState, ReactNode, TouchEvent } from 'react';

export interface SwipeableProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

/**
 * A swipeable component that detects horizontal and vertical swipes and triggers corresponding callbacks.
 *
 * @param {SwipeableProps} props - The props for the Swipeable component.
 * @param {ReactNode} props.children - The child components to be wrapped with swipe detection.
 * @param {() => void} [props.onSwipeLeft] - The callback function to be triggered when a left swipe is detected.
 * @param {() => void} [props.onSwipeRight] - The callback function to be triggered when a right swipe is detected.
 * @param {() => void} [props.onSwipeUp] - The callback function to be triggered when an up swipe is detected.
 * @param {() => void} [props.onSwipeDown] - The callback function to be triggered when a down swipe is detected.
 * @return {JSX.Element} The swipeable component wrapped with touch event handlers.
 */
export default function Swipeable({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: SwipeableProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX]     = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY]     = useState<number | null>(null);

  const minSwipeDistance = 50;

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndY(null);
    setTouchStartY(e.targetTouches[0].clientY);
  }

  function onTouchMove(e: TouchEvent<HTMLDivElement>) {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  }

  function onTouchEnd() {
    if (touchStartX !== null && touchEndX !== null) swipeHorizontal();
    if (touchStartY !== null && touchEndY !== null) swipeVertical();
  }

  function swipeHorizontal() {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) {
      return;
    }

    const xDistance = touchStartX - touchEndX;
    const yDistance = touchStartY - touchEndY;

    if (Math.abs(yDistance) >= Math.abs(xDistance)) {
      return;
    }

    const isLeftSwipe  = xDistance > minSwipeDistance;
    const isRightSwipe = xDistance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }

    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  }

  function swipeVertical() {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) {
      return;
    }

    const xDistance = touchStartX - touchEndX;
    const yDistance = touchStartY - touchEndY;

    if (Math.abs(xDistance) >= Math.abs(yDistance)) {
      return;
    }

    const isUpSwipe   = yDistance > minSwipeDistance;
    const isDownSwipe = yDistance < -minSwipeDistance;

    if (isDownSwipe && onSwipeDown) {
      onSwipeDown();
    }

    if (isUpSwipe && onSwipeUp) {
      onSwipeUp();
    }
  }

  return (
    <div onTouchStart={ onTouchStart } onTouchMove={ onTouchMove } onTouchEnd={ onTouchEnd }>
      { children }
    </div>
  );
}
