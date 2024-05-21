import { Skeleton } from '@/components/ui/skeleton';
import MotionDiv from '@/components/framer/motion-div';

/**
 * Renders a skeleton loader for a list of anime cards.
 *
 * @return {JSX.Element} The skeleton loader component.
 */
export default function AnimeListSkeletonLoader() {
  return (

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 relative">
      {
        Array(20).fill(0).map((_, index) => (
          <MotionDiv
            // eslint-disable-next-line react/no-array-index-key
            key={ `anime-card-skeleton-loader-${index}` }
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
            variants={{
              hidden  : { opacity: 0, y: 20 },
              visible : { opacity: 1, y: 0 },
            }}
          >
            <Skeleton className="w-full aspect-3/4 overflow-hidden" />
          </MotionDiv>

        ))
      }
    </div>
  );
}
