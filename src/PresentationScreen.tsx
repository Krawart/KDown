import { Box, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { customFormatDuration, getDurationString } from './time-utils'

type PresentationScreenProps = {
  title: string
  backgroundImage: string | undefined
  eventDateTime: Date
  onClose: () => void
}

function PresentationScreen({ title, backgroundImage, eventDateTime, onClose }: PresentationScreenProps) {
  const now = new Date()
  const timer = useRef(0)
  const [remainingTime, setRemainingTime] = useState(getDurationString(eventDateTime, now))

  useEffect(() => {
    timer.current = setInterval(() => {
      setRemainingTime(getDurationString(eventDateTime, now))
    }, 1000)
    return () => clearInterval(timer.current)
  }, [eventDateTime, now])

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
          backgroundImage: `url(${
            backgroundImage && backgroundImage !== ''
              ? backgroundImage
              : 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80'
          })`,
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
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <Close sx={{ fontSize: '3rem' }} />
          </IconButton>
          <Typography variant={'h1'} fontSize={'14rem'} fontWeight={500}>
            {customFormatDuration(remainingTime)}
          </Typography>
          <Typography variant={'h2'}> {title}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default PresentationScreen
