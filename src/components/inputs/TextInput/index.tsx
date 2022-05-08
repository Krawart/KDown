import { Box, FormControl, IconButton, InputLabel, OutlinedInput } from '@mui/material'
import { ContentPaste } from '@mui/icons-material'

type TextInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormControl variant={'outlined'} fullWidth>
        <InputLabel htmlFor={`input-${label}`}>{label}</InputLabel>
        <OutlinedInput
          id={'input-background-url'}
          endAdornment={
            <IconButton onClick={() => navigator.clipboard.readText().then(onChange)}>
              <ContentPaste />
            </IconButton>
          }
          fullWidth
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
        />
      </FormControl>
    </Box>
  )
}
