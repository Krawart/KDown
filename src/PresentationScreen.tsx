import { Box, CircularProgress, IconButton, SxProps, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { customFormatDuration } from './time-utils'
import { useCountdown } from './hooks/useCountdown'

type PresentationScreenProps = {
  title: string
  finishText: string
  backgroundImage: string | undefined
  eventDateTime: Date
  onClose: () => void
}

const pulseAnimation: SxProps = {
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

function PresentationScreen({ title, finishText, backgroundImage, eventDateTime, onClose }: PresentationScreenProps) {
  const { isFinished, remainingTime } = useCountdown(eventDateTime)
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            background: 'radial-gradient(rgba(0,0,0,0.70) 20%, transparent)',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              opacity: 0.3,
              '&:hover': {
                opacity: 1,
                transition: 'opacity .15s',
              },
            }}
          >
            <Close sx={{ fontSize: '2rem' }} />
          </IconButton>
          {remainingTime === undefined ? (
            <CircularProgress size={'12rem'} />
          ) : (
            <Typography
              sx={{
                padding: 5,
                ...(isFinished ? pulseAnimation : null),
              }}
              variant={'h1'}
              fontSize={'14rem'}
              fontWeight={500}
            >
              {isFinished && finishText !== '' ? finishText : customFormatDuration(remainingTime)}
            </Typography>
          )}

          <Typography variant={'h2'}> {title}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default PresentationScreen
