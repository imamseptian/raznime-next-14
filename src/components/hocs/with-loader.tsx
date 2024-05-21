import { RefreshCcw } from 'lucide-react';
import { Suspense } from 'react';

/**
 * Higher-order component that adds a loader to a given component.
 *
 * @param {React.ComponentType<P>} WrappedComponent - The component to be wrapped with a loader.
 * @param {React.ComponentType<P>} [Loader] - Optional custom loader component. Defaults to a spinning refresh icon.
 * @returns {React.FC<P>} The wrapped component with a loader.
 */
export const withLoader = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  Loader?:  React.ComponentType<P>,
) => {
  function DefaultLoader() {
    return (
      <div className="flex justify-center items-center">
        <RefreshCcw className="text-primary animate-spin font-bold" />
      </div>
    );
  }

  const MyLoader = Loader || DefaultLoader;

  const WithLoaderComponent: React.FC<P> = function WithLoaderComponent(props) {
    return (
      <Suspense fallback={ <MyLoader { ...(props as P) } /> }>
        <WrappedComponent { ...(props as P) } />
      </Suspense>
    );
  };

  return WithLoaderComponent;
};
