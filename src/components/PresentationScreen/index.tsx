import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { customFormatDuration } from '../../utils/time-utils'
import { useCountdown } from '../../hooks/useCountdown'
import { pulseAnimation } from '../../styles/animations'

type PresentationScreenProps = {
  title: string
  finishText: string
  eventDateTime: Date
  onClose: () => void
}

function PresentationScreen({ title, finishText, eventDateTime, onClose }: PresentationScreenProps) {
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
              fontSize={{ xs: '5rem', sm: '8rem', md: '12rem', lg: '15rem' }}
              fontWeight={500}
            >
              {isFinished && finishText !== '' ? finishText : customFormatDuration(remainingTime)}
            </Typography>
          )}

          {!isFinished && (
            <Typography variant={'h2'} fontSize={{ xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' }}>
              {title}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

export default PresentationScreen
