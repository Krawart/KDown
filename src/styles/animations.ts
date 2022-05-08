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

export const slowZoomInOutAnimation: SxProps = {
  '@keyframes slowZoomInOut': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.5)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  animation: 'slowZoomInOut 180s infinite',
}
