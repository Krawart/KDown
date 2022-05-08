import { Box, Button, Card, CardContent, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AvTimer } from '@mui/icons-material'
import PresentationScreen from './PresentationScreen'
import defaultBackground from './assets/bg-01.jpg'
import TextInput from './components/inputs/TextInput'

function App() {
  const [eventTitle, setEventTitle] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState(defaultBackground)
  const [finishText, setFinishText] = useState('')
  const [eventDateTime, setEventDateTime] = useState<Date | null>(null)
  const [isPresenting, setIsPresenting] = useState<boolean>(false)

  function handlePresentationStart(e: FormEvent) {
    e.preventDefault()
    setIsPresenting(true)
  }

  function handleChangeBackground(url: string) {
    setBackgroundUrl(url.length > 0 ? url : defaultBackground)
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
        backgroundSize: 'cover',
      }}
    >
      <CssBaseline />
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
                  <TextInput
                    label={'Title'}
                    value={eventTitle}
                    onChange={setEventTitle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    label={'Background url'}
                    value={backgroundUrl === defaultBackground ? '' : backgroundUrl}
                    onChange={handleChangeBackground}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    label={'Finish text'}
                    value={finishText}
                    onChange={setFinishText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField variant={'outlined'} label={'Event date'} fullWidth {...props} />
                    )}
                    label='Event Date Time'
                    value={eventDateTime}
                    onChange={(newEventDate) => {
                      setEventDateTime(newEventDate)
                    }}
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
                  >
                    Run countdown
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Container>

      {isPresenting && (
        <PresentationScreen
          title={eventTitle}
          finishText={finishText}
          backgroundImage={backgroundUrl}
          eventDateTime={eventDateTime ?? new Date(new Date().getMilliseconds() + 1000)}
          onClose={() => setIsPresenting(false)}
        />
      )}
    </Box>
  )
}

export default App
