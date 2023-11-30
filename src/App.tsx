import {renderPages} from "@utils";
import {pages} from "@pages";
import Cookie from 'cookie-universal'

export const App = () => {
  const cookies = Cookie()
  return renderPages(pages)
}

