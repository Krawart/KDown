import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AvTimer } from '@mui/icons-material'
import PresentationScreen from './PresentationScreen'
import defaultBackground from './assets/bg-01.jpg'
import TextInput from './components/inputs/TextInput'
import { slowZoomInOutBackgroundAnimation } from './styles/animations'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const onDebounced = useDebounce()
  const [searchParams, setSearchParams] = useSearchParams()
  const [eventTitle, setEventTitle] = useState((searchParams.get('event-title') as string) ?? '')
  const [backgroundUrl, setBackgroundUrl] = useState(
    (searchParams.get('background-url') as string) ?? defaultBackground,
  )
  const [finishedText, setFinishedText] = useState((searchParams.get('finished-text') as string) ?? '')
  const [eventDate, setEventDate] = useState<Date | null>(
    searchParams.get('event-date') ? new Date(searchParams.get('event-date') as string) : null,
  )
  const [isPresenting, setIsPresenting] = useState<boolean>(false)

  useEffect(() => {
    onDebounced(() => {
      const params = new URLSearchParams()
      if (eventTitle.length > 0) params.append('event-title', eventTitle)
      if (finishedText.length > 0) params.append('finished-text', finishedText)
      if (backgroundUrl.length > 0 && backgroundUrl !== defaultBackground)
        params.append('background-url', backgroundUrl)
      if (eventDate !== null) params.append('event-date', eventDate.toISOString())
      setSearchParams(createSearchParams(params))
    })
  }, [eventTitle, finishedText, backgroundUrl, eventDate])

  function handlePresentationStart(e: FormEvent) {
    e.preventDefault()
    setIsPresenting(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundUrl})`,
        ...slowZoomInOutBackgroundAnimation,
      }}
    >
      {isPresenting ? (
        <PresentationScreen
          title={eventTitle}
          finishText={finishedText}
          eventDateTime={eventDate ?? new Date(new Date().getMilliseconds() + 1000)}
          onClose={() => setIsPresenting(false)}
        />
      ) : (
        <Container maxWidth={'sm'} sx={{ textAlign: 'center' }}>
          <Card>
            <form noValidate onSubmit={(e) => handlePresentationStart(e)}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography mb={3} variant={'h1'}>
                  <AvTimer sx={{ fontSize: '4rem' }} /> Down
                </Typography>
                <Typography mb={5} variant={'h2'}>
                  Set your event
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextInput label={'Title'} value={eventTitle} onChange={setEventTitle} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput
                      label={'Background url'}
                      value={backgroundUrl === defaultBackground ? '' : backgroundUrl}
                      onChange={(value) => setBackgroundUrl(value.length > 0 ? value : defaultBackground)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput label={'Finish text'} value={finishedText} onChange={setFinishedText} />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField variant={'outlined'} label={'Event date'} fullWidth {...props} />
                      )}
                      label='Event Date Time'
                      value={eventDate}
                      onChange={(newEventDate) => setEventDate(newEventDate)}
                      onError={() => setEventDate(null)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{ my: 3 }}
                      color={'primary'}
                      size={'large'}
                      fullWidth
                      variant={'contained'}
                      type={'submit'}
                      disabled={!eventDate}
                    >
                      Run countdown
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Container>
      )}
    </Box>
  )
}

export default App
