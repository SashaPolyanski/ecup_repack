import {FC} from 'react'
import {Box, useMediaQuery} from "@mui/material";
import ContentLoader from "react-content-loader"
import {MEDIA_QUERY_SM} from "@/constants/breackpoints.ts";

type SkeletonLoaderProps = {}
const skeletonArray = Array.from({length: 6}, (_, index) => index + 1)
export const SkeletonLoader: FC<SkeletonLoaderProps> = () => {
  const isSmallScreen = useMediaQuery(`(max-width: ${MEDIA_QUERY_SM}px)`)
  return skeletonArray.map((_, index) => {
    return <Box sx={{position: 'relative'}}> <Box key={index}>
      <ContentLoader
        speed={2}
        width={isSmallScreen ? 350 : 440}
        height={isSmallScreen ? 400 : 470}
        viewBox={isSmallScreen ? "0 0 350 400" : "0 0 440 470"}
        backgroundColor="#252a40"
        foregroundColor="#171c26"
      >
        <rect x="0" y="0" rx="20" ry="20" width={isSmallScreen ? "350" : "440"} height={isSmallScreen ? "400" : "470"}/>
      </ContentLoader>

    </Box>
      <Box sx={{position: 'absolute', bottom: '20px', left: '20px'}}>
        <ContentLoader
          speed={2}
          width={160}
          style={{boxShadow: '0px 0px 0px 1px #171c26, 0px 1px 0px 0px #171c26', borderRadius: '8px'}}
          height={36.5}
          viewBox="0 0 130 36.5"
          backgroundColor='transparent'
          foregroundColor='transparent'
        >
          <rect x="0" y="0" rx="20" ry="20" width="160" height="36.5"/>
        </ContentLoader>
      </Box>
      <Box sx={{position: 'absolute', bottom: '75px', left: '20px'}}>
        <ContentLoader
          speed={2}
          width={isSmallScreen ? 310 : 400}
          style={{boxShadow: '0px 0px 0px 1px #171c26, 0px 1px 0px 0px #171c26', borderRadius: '8px'}}
          height={6}
          viewBox="0 0 400 4"
          backgroundColor='transparent'
          foregroundColor='transparent'
        >
          <rect x="0" y="0" rx="20" ry="20" width={isSmallScreen ? "310" : "400"} height="6"/>
        </ContentLoader>
      </Box>
      <Box sx={{position: 'absolute', bottom: '100px', left: '20px'}}>
        <ContentLoader
          speed={2}
          width={isSmallScreen ? 310 : 400}
          style={{boxShadow: '0px 0px 0px 1px #171c26, 0px 1px 0px 0px #171c26', borderRadius: '8px'}}
          height={35}
          viewBox="0 0 400 35"
          backgroundColor='transparent'
          foregroundColor='transparent'
        >
          <rect x="0" y="0" rx="20" ry="20" width={isSmallScreen ? "310" : "400"} height="35"/>
        </ContentLoader>
      </Box>
      <Box sx={{position: 'absolute', bottom: '155px', left: '20px'}}>
        <ContentLoader
          speed={2}
          width={50}
          style={{boxShadow: '0px 0px 0px 1px #171c26, 0px 1px 0px 0px #171c26', borderRadius: '50px'}}
          height={30}
          viewBox="0 0 50 30"
          backgroundColor='transparent'
          foregroundColor='transparent'
        >
          <rect x="0" y="0" rx="50" ry="50" width="40" height="30"/>
        </ContentLoader>
      </Box>
      <Box sx={{position: 'absolute', bottom: '155px', right: '20px'}}>
        <ContentLoader
          speed={2}
          width={180}
          style={{boxShadow: '0px 0px 0px 1px #171c26, 0px 1px 0px 0px #171c26', borderRadius: '50px'}}
          height={30}
          viewBox="0 0 150 30"
          backgroundColor='transparent'
          foregroundColor='transparent'
        >
          <rect x="0" y="0" rx="50" ry="50" width="180" height="30"/>
        </ContentLoader>
      </Box>
    </Box>
  })
};
