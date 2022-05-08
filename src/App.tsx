import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { FormEvent, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AvTimer, ContentPaste } from '@mui/icons-material'
import PresentationScreen from './PresentationScreen'
import defaultBackground from './assets/bg-01.jpg'

function App() {
  const [eventTitle, setEventTitle] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState(defaultBackground)
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
                  <FormControl fullWidth>
                    <InputLabel htmlFor='input-title'>Title</InputLabel>
                    <OutlinedInput
                      id={'input-title'}
                      label={'Title'}
                      endAdornment={
                        <IconButton
                          onClick={() => navigator.clipboard.readText().then((value) => setEventTitle(value))}
                        >
                          <ContentPaste />
                        </IconButton>
                      }
                      fullWidth
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl variant={'outlined'} fullWidth>
                      <InputLabel htmlFor='input-background-url'>Background url</InputLabel>
                      <OutlinedInput
                        id={'input-background-url'}
                        label={'Background url'}
                        endAdornment={
                          <IconButton
                            onClick={() => navigator.clipboard.readText().then(handleChangeBackground)}
                          >
                            <ContentPaste />
                          </IconButton>
                        }
                        fullWidth
                        value={backgroundUrl === defaultBackground ? '' : backgroundUrl}
                        onChange={(e) => handleChangeBackground(e.target.value)}
                      />
                    </FormControl>
                  </Box>
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
          backgroundImage={backgroundUrl}
          eventDateTime={eventDateTime ?? new Date(new Date().getMilliseconds() + 1000)}
          onClose={() => setIsPresenting(false)}
        />
      )}
    </Box>
  )
}

export default App
