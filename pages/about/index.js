import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SelectionBar from '../../components/SelectionBar';
import styles from '../../styles/All.module.css';
import Input from '@mui/material/Input';
import { maxWidth } from '@mui/system';
import { Button } from '@mui/material';


const Help = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ bgcolor: 'white', height: '80vh', marginTop: '10vh', marginLeft: '30%' }} >
                <div class="w3-container w3-content w3-padding-64" style={{ maxWidth: "800px", display: "inline-block", textAlign: "center" }} id="contact" >
                    <div>
                        <h2 class="w3-wide w3-center">CONTACT</h2>
                        <p class="w3-opacity w3-center"><i>If you have any question please contact me</i></p>
                    </div>

                    <div>
                        <div class="w3-col m6 w3-large w3-margin-bottom" style={{ float: "left", marginRight: "50px" }}>
                            <div><i class="fa fa-map-marker" style={{ width: "30px" }}></i> Vancouver, Canada</div>
                            <br />
                            <div><i class="fa fa-phone" style={{ width: "30px" }}></i> Phone: +1604-123-1234</div>
                            <br />
                            <div><i class="fa fa-envelope" style={{ width: "30px" }}> </i> Email: guozo@oregonstatue.edu</div>
                            <br />
                        </div>
                        <div class="w3-col m6" style={{ float: "left" }}>
                            <form action="/action_page.php" target="_blank">
                                <div class="w3-row-padding" style={{ margin: "0 -16px 8px -16px" }}>
                                    <div class="w3-half">
                                        <Input class="w3-input w3-border" type="text" placeholder="Name" required name="Name" />
                                    </div>
                                    <div class="w3-half">
                                        <Input class="w3-input w3-border" type="text" placeholder="Email" required name="Email" />
                                    </div>
                                    <div class="w3-half">
                                        <Input class="w3-input w3-border" type="text" placeholder="Message" required name="Message" />
                                    </div>
                                    <div class="w3-half">
                                        <Button class="w3-button w3-black w3-section w3-right" type="submit">SEND</Button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </Box>
        </Container>

    )
}

export default Help