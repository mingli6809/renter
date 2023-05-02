import { InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material';

const InputTextField = ({ fieldSize, inputLabel, inputValue, handleInput }) => {
    const sizes = {
        'sm': '23%',
        'md': '54%',
        'lg': '96.5%'
    }
    const handleChange = (event) => {
        handleInput(event.target.value)
    }
    return (
        <FormControl fullWidth sx={{ m: 1, maxWidth: sizes[fieldSize] }}>
            <InputLabel htmlFor="outlined-adornment">{inputLabel}</InputLabel>
            <OutlinedInput
                id="outlined-adornment"
                value={inputValue}
                onChange={handleChange}
                // startAdornment={<InputAdornment position="start">{inputLabel}: </InputAdornment>}
                label={inputLabel}
            />
        </FormControl>
    )
}

export default InputTextField