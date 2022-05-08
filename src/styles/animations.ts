import { SxProps } from '@mui/material'

export const pulseAnimation: SxProps = {
  '@keyframes pulse': {
    '35%': {
      transform: 'scale(1)',
    },
    '40%': {
      transform: 'scale(0.85)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '60%': {
      transform: 'scale(0.95)',
    },
    '66%': {
      transform: 'scale(1)',
    },
  },
  animation: 'pulse 2s infinite',
}

export const slowZoomInOutBackgroundAnimation: SxProps = {
  '@keyframes slowZoomInOutBackground': {
    '0%': {
      backgroundSize: '100vw',
    },
    '50%': {
      backgroundSize: '108vw',
    },
    '100%': {
      backgroundSize: '100vw',
    },
  },
  animation: 'slowZoomInOutBackground 120s infinite',
}
