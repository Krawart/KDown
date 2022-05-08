import { slowZoomInOutAnimation } from '../../styles/animations'
import { Box, Fade } from '@mui/material'
import { ReactElement, useEffect, useState } from 'react'
import defaultBackground from '../../assets/bg-01.jpg'
import { useDebounce } from '../../hooks/useDebounce'

type AnimatedBackgroundProps = {
  children: ReactElement
  backgroundUrl: string
}

function AnimatedBackground({ children, backgroundUrl }: AnimatedBackgroundProps) {
  const onDebounced = useDebounce()
  const [debouncedBackgroundUrl, setDebouncedBackgroundUrl] = useState(backgroundUrl)
  useEffect(() => {
    onDebounced(() => setDebouncedBackgroundUrl(backgroundUrl), 300)
  }, [backgroundUrl])

  return (
    <Fade in timeout={3000}>
      <Box sx={{
        border: '1px solid transparent',
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
      }}>
        <Box
          sx={{
            position: 'relative',
            backgroundImage: `url(${debouncedBackgroundUrl.length !== 0 ? debouncedBackgroundUrl : defaultBackground})`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            minWidth: '100vw',
            ...slowZoomInOutAnimation,
          }}
        ></Box>
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </Fade>
  )
}

export default AnimatedBackground
