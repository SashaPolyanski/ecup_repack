import {FC, lazy, Suspense} from 'react'

const Page = lazy(() => import('./Page'))

export const Component: FC = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page {...props} />
  </Suspense>
)
