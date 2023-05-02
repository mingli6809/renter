import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CheckboxSelection = ({ formLabel, options, setSelectedOptions, selectedOptions }) => {

    const handleChecked = (e) => {
        const selected = e.target.value;
        if (!selectedOptions.includes(selected)) { setSelectedOptions([...selectedOptions, selected]) }
        else { setSelectedOptions(selectedOptions => selectedOptions.filter(option => option !== selected)) }
    }

    return (
        <div style={{ marginLeft: '2%', marginTop: '0.5%', marginBottom: '0.5%', width: '98%' }}>
            <FormControl component="fieldset">
                <FormLabel component="legend"><strong>{formLabel}</strong></FormLabel>
                <FormGroup aria-label="position" row>
                    {/* <p><strong>{formLabel}</strong></p> */}
                    {options.map((option) => (
                        <>
                            <FormControlLabel
                                value={option.value}
                                control={<Checkbox />}
                                label={option.label}
                                labelPlacement={option.label}
                                onChange={handleChecked}
                            />
                        </>
                    ))}

                </FormGroup>
            </FormControl>
        </div>
    );
}
export default CheckboxSelection;