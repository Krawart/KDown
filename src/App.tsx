import { Box, Button, Card, CardContent, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AvTimer } from '@mui/icons-material'

function App() {
  const [eventTitle, setEventTitle] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState('')
  const [eventDateTime, setEventDateTime] = useState<Date | null>(null)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container maxWidth={'sm'} sx={{ textAlign: 'center' }}>
        <Typography mb={3} variant={'h1'}>
          <AvTimer sx={{ fontSize: '4rem' }} /> Down
        </Typography>
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography mb={5} variant={'h2'}>
              Set your event
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={'Title'}
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={'Background url'}
                  value={backgroundUrl}
                  onChange={(e) => setBackgroundUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  renderInput={(props) => <TextField fullWidth {...props} />}
                  label='EventDateTime'
                  value={eventDateTime}
                  onChange={(newEventDate) => {
                    setEventDateTime(newEventDate)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button sx={{ my: 3 }} color={'primary'} size={'large'} fullWidth variant={'contained'}>
                  Run countdown
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default App
