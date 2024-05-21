'use client';

import { useEffect } from 'react';
import type { Metadata } from 'next';
import { updateMetadataFromClient } from '@/lib/services/metadata-service';

/**
 * Updates the metadata title and description after calling this component
 * This component is an alternative way to run the client update metadata function after server component rendering
 *
 * @param {Metadata} props - The props object containing the metadata title and description
 * @param {string} props.title - The new title for the metadata
 * @param {string} [props.description=''] - The new description for the metadata (default: '')
 * @return {null} This function does not return anything
 */
export default function UpdateMetadataComponent({ title, description = '' }: Metadata) {
  useEffect(() => {
    updateMetadataFromClient({
      title: title as string,
      description,
    });
  }, [title, description]);

  return null;
}
