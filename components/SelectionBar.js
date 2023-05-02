import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectionBar = ({ size, options, setSelectedOption, selectedOption, inputLabel }) => {
    const sizes = {
        'sm': '23%',
        'md': '54%',
        'lg': '96.5%'
    }
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <FormControl fullWidth sx={{ m: 1, maxWidth: sizes[size] }}>
            <InputLabel id="simple-select-label">{inputLabel}</InputLabel>
            <Select
                labelId="simple-select-label"
                id="simple-select"
                value={selectedOption}
                label={inputLabel}
                onChange={handleChange}
            >
                {options.map(option =>
                    (<MenuItem value={option.value} key={option.key}>{option.label}</MenuItem>)
                )}
            </Select>
        </FormControl>
    );
}

export default SelectionBar
