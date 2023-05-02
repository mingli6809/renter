import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SelectionBar from '../../components/SelectionBar';
import styles from '../../styles/All.module.css';

const Help = () => {

    const questions = [
        {
            key: 1,
            label: "What is this application used for?",
            value: "This application is used for managing the rental listings, users can quickly create, update and delete the listings stored in database.",
        },
        {
            key: 2,
            label: "How to use this web app?",
            value: "Home page provides a main listing table for users to manage the listings, the table allows users to effectively sorting, searching, updating and filtering exsiting listings, which UI provides a clear instruction.",
        },
        {
            key: 3,
            label: "Are listings store in a database, will listings disapprear?",
            value: "Listings are storing in MongoDB database and the listings will not disappeared.",
        },

    ];
    const [selectedQuestion, setSelectedQuestion] = useState('');

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: 'white', height: '80vh', marginTop: '10vh' }} >
                    <div className={styles.selectorSection}>
                        <SelectionBar
                            options={questions}
                            setSelectedOption={setSelectedQuestion}
                            selectedOption={selectedQuestion}
                            inputLabel='Q&A?' />
                    </div>
                    <Box sx={{ bgcolor: 'white', height: '80vh', marginTop: '10vh' }}>
                        <div className={styles.answerSection}>{selectedQuestion}</div>
                    </Box>

                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Help