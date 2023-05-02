import * as React from 'react';
import { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';

const RadioSelection = ({ formLabel, options, setSelectedChecked }) => {

    const handleCheck = (e) => {
        setSelectedChecked(e.target.value)
    }
    return (
        <div style={{ marginLeft: '2%', marginTop: '0.5%', marginBottom: '0.5%', width: '98%' }}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label"><strong>{formLabel}</strong></FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    {/* <p><strong>{formLabel}</strong></p> */}
                    {options.map((option) => (
                        <>
                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} onChange={handleCheck} />
                        </>
                    ))}
                </RadioGroup>
            </FormControl>
        </div>

    )
}

export default RadioSelection;
