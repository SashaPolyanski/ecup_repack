import {FC, lazy, Suspense} from 'react'
import {Preloader} from "@shared";

const Page = lazy(() => import('./Page'))

export const Component: FC = (props) => (
  <Suspense fallback={<Preloader/>}>
    <Page {...props} />
  </Suspense>
)
