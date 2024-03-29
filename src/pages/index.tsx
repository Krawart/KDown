import { useCountdownSettings } from '../hooks/useCountdownSettings'
import { FormEvent } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import PresentationScreen from '../components/PresentationScreen'
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { AvTimer } from '@mui/icons-material'
import TextInput from '../components/inputs/TextInput'
import defaultBackground from '../assets/bg-01.jpg'
import { DateTimePicker } from '@mui/x-date-pickers'

function RootPage() {
  const {
    eventTitle,
    setEventTitle,
    backgroundUrl,
    setBackgroundUrl,
    finishedText,
    setFinishedText,
    eventDate,
    setEventDate,
    isPresenting,
    setIsPresenting,
    isAnimated,
    setIsAnimated,
  } = useCountdownSettings()

  function handlePresentationStart(e: FormEvent) {
    e.preventDefault()
    setIsPresenting(true)
  }

  return (
    <AnimatedBackground isAnimated={isAnimated} backgroundUrl={backgroundUrl}>
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
                      onChange={setBackgroundUrl}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextInput label={'Finish text'} value={finishedText} onChange={setFinishedText} />
                  </Grid>
                  <Grid item xs={12}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          sx={{ button: { mr: 0 } }}
                          variant={'outlined'}
                          label={'Event date'}
                          fullWidth
                          {...props}
                        />
                      )}
                      label='Event Date Time'
                      value={eventDate}
                      onChange={(newEventDate) => setEventDate(newEventDate)}
                      onError={() => setEventDate(null)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel control={<Switch
                      sx={{ my: 3 }}
                      checked={isAnimated}
                      color={'primary'}
                      onChange={() => setIsAnimated(checked => !checked)}
                    />} label='Animated background' />
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
    </AnimatedBackground>
  )
}

export default RootPage
