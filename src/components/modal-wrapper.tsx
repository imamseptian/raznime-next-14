"use client";

import { motion, AnimatePresence, type MotionProps } from 'framer-motion';
import { cn } from "@/lib/utils";
import { X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface ModalWrapperProps extends MotionProps {
  expectedPath: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Renders a modal wrapper component that displays a modal with the given content.
 *
 * @param {ModalWrapperProps} props - The component props.
 * @param {string} props.expectedPath - The expected url path for the modal to be displayed.
 * @param {string} [props.className=''] - The CSS class name for the modal wrapper.
 * @param {React.ReactNode} props.children - The content to be displayed in the modal.
 * @return {JSX.Element} The rendered modal wrapper component.
 */
export default function ModalWrapper({
  expectedPath,
  className = '',
  children,
  ...props
}: ModalWrapperProps) {
  const router = useRouter();

  const pathName            = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // to prevent modal showing outside the `expectedPath`
  useEffect(() => {
    const isDetailOpen = pathName === expectedPath;
    if (isDetailOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [pathName, expectedPath]);

  /**
   * Closes the modal and navigates back after a delay.
   * Added this to solve exit animation not playing
   */
  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.back();
    }, 500);
  };

  /**
   * Handles the click event on the backdrop element of the modal.
   *
   * @param {React.MouseEvent<HTMLDivElement>} event - The click event object.
   * @return {void} This function does not return a value.
   */
  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'static-modal-backdrop' || target.id === 'modal-wrapper') {
      handleCloseModal();
    }
  };

  return (
    <AnimatePresence>
      {
        isOpen && (
          <motion.div
            id="static-modal-backdrop"
            data-modal-backdrop="static"
            tabIndex={ -1 }
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden bg-black bg-opacity-50 pt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key="overlay"
            onClick={ onBackdropClick }
          >
            <motion.div
              id="modal-wrapper"
              className={ cn(
                "w-full max-w-2xl rounded-lg shadow-lg bg-popover",
                className,
              ) }
              { ...props }
            >
              <input type="checkbox" readOnly checked className="hide-body-scrollbar hidden" />
              <div id="modal-content" className="popup-modal overflow-y-auto max-h-[calc(100svh-1.25rem)] relative">

                <Button
                  type="button"
                  data-modal-hide="static-modal"
                  onClick={ handleCloseModal }
                  variant="link"
                  className="fixed top-2 right-2 z-50 p-0"
                >
                  <X className="mt text-popover-foreground" />
                  <span className="sr-only">Close modal</span>
                </Button>
                { children }

                <div className="p-4 lg:hidden">
                  <Button
                    onClick={ handleCloseModal }
                    className="hover:ring-1 w-full"
                    variant="destructive"
                    size="lg"
                  >
                    Close
                  </Button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )
      }

    </AnimatePresence>
  );
}
