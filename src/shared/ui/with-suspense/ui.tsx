import { Suspense as BaseSuspense } from 'react';

import { FullScreenLoader } from '../full-screen-loader';

// eslint-disable-next-line react-refresh/only-export-components
const Suspense: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <BaseSuspense fallback={<FullScreenLoader />}>{children}</BaseSuspense>;
};

export const withSuspense = (Component: React.FC) => {
  return () => (
    <Suspense>
      <Component />
    </Suspense>
  );
};
