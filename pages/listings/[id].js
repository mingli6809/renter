import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from '../../styles/All.module.css';
import { Box, Paper, TextField, Toolbar, Typography, Button, FormControl } from '@mui/material';
import InputTextField from '../../components/InputTextField';
import SelectionBar from '../../components/SelectionBar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ImagesUploader from '../../components/ImagesUploader';
import { cities, propertyTypes, statusList, numberList, facilityList, styleList, accessList, preferenceList } from '../../data/data';
import { useRouter } from 'next/router';
import MultiSelectionBar from '../../components/MultiSelectionBar';


const Update = () => {
    const [listingTitle, setListingTitle] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactWechat, setContactWechat] = useState();
    const [description, setDescription] = useState('');
    const [rentalStatus, setRentalStatus] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [livingrooms, setLivingrooms] = useState('');
    const [kitchens, setKitchens] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [rentalStyle, setRentalStyle] = useState('');
    const [privateAccess, setPrivateAccess] = useState('');
    const [tenantPreferences, setTenantPreferences] = useState([]);
    const [availableDate, setAvailableDate] = useState(dayjs(new Date()));
    const [imageUrls, setImageUrls] = useState([]);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const router = useRouter();
    const listingID = router.query.listingID;

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://18.222.121.41:3002/api/real-estate/${listingID}`);
            const json = await data.json();
            setListingTitle(json.listingTitle)
            setAddress(json.address);
            setPostalCode(json.postalCode)
            setCity(json.city)
            setPrice(json.price)
            setPropertyType(json.propertyType)
            setContactName(json.name)
            setContactEmail(json.email)
            setContactPhone(json.phone)
            setContactWechat(json.weChart)
            setDescription(json.description)
            setRentalStatus(json.rentalStatus)
            setBedrooms(json.bedrooms)
            setBathrooms(json.bathrooms)
            setLivingrooms(json.bathrooms)
            setKitchens(json.kitchens)
            setFacilities(json.facilities.split(","))
            setRentalStyle(json.rentalStyle)
            setPrivateAccess(json.privateAccess)
            setTenantPreferences(json.tenantPreferences.split(","))
            setAvailableDate(json.date)
            setImageUrls(json.imageUrls)
            setLat(json.lat)
            setLng(json.lng)
        }
        fetchData().catch(console.error);
    }, [listingID])


    const handleDateChange = (newValue) => {
        setAvailableDate(newValue);
    }

    const handleClear = () => {
        setListingTitle('')
        setAddress('')
        setPostalCode('')
        setCity('')
        setPrice('')
        setPropertyType('')
        setContactName('')
        setContactEmail('')
        setContactPhone('')
        setContactWechat('')
        setDescription('')
        setRentalStatus('')
        setBedrooms('')
        setBathrooms('')
        setLivingrooms('')
        setKitchens('')
        setFacilities([])
        setRentalStyle('')
        setPrivateAccess('')
        setTenantPreferences([])
        setAvailableDate('')
        setImageUrls('')
        setLat(null)
        setLng(null)
    }

    const handleSubmit = async () => {
        const body = {
            listingTitle: listingTitle,
            address: address,
            city: city,
            postalCode: postalCode,
            price: price,
            propertyType: propertyType,
            description: description,
            rentalStatus: rentalStatus,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            livingrooms: livingrooms,
            kitchens: kitchens,
            facilities: facilities.toString(),
            rentalStyle: rentalStyle,
            privateAccess: privateAccess,
            tenantPreferences: tenantPreferences.toString(),
            date: availableDate,
            name: contactName,
            email: contactEmail,
            phone: contactPhone,
            weChart: contactWechat,
            imageUrls: imageUrls,
            lat: lat,
            lng: lng
        }
        const response = await fetch(`http://18.222.121.41:3002/api/real-estate/${listingID}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);
        if (response.status === 200) {
            handleClear();
            router.push('/listings/all')
        }
    }


    return (
        <div className={styles.datagrid}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', minWidth: '600px' }}>
                <Paper sx={{ width: '100%', mb: 2 }} elevation={3}>
                    <Toolbar
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },

                        }}
                    >
                        <Typography
                            sx={{ flex: '1 1 50%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Create New Listing
                        </Typography>

                        <Button variant="contained" color="error" sx={{ marginRight: '2%' }} onClick={handleClear}>Clear</Button>

                        <Button variant="contained" color="success" sx={{ marginRight: '5%' }} onClick={handleSubmit}>Create</Button>

                        <ImagesUploader />


                    </Toolbar>


                    <Paper sx={{ width: '90%', mb: 2, marginLeft: '5%', marginTop: '2%' }} elevation={24}>
                        <InputTextField
                            fieldSize='lg'
                            inputLabel='Title'
                            inputValue={listingTitle}
                            handleInput={setListingTitle} />

                        <InputTextField
                            fieldSize='lg'
                            inputLabel='Address'
                            inputValue={address}
                            handleInput={setAddress} />

                        <SelectionBar
                            size='sm'
                            options={cities}
                            setSelectedOption={setCity}
                            selectedOption={city}
                            inputLabel='City' />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Postal Code'
                            inputValue={postalCode}
                            handleInput={setPostalCode} />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Price'
                            inputValue={price}
                            handleInput={setPrice} />

                        <SelectionBar
                            size='sm'
                            options={propertyTypes}
                            setSelectedOption={setPropertyType}
                            selectedOption={propertyType}
                            inputLabel='Property Type' />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Description'
                            inputValue={description}
                            handleInput={setDescription} />

                        <SelectionBar
                            size='sm'
                            options={statusList}
                            setSelectedOption={setRentalStatus}
                            selectedOption={rentalStatus}
                            inputLabel='Rental Status' />

                        <SelectionBar
                            size='sm'
                            options={numberList}
                            setSelectedOption={setBedrooms}
                            selectedOption={bedrooms}
                            inputLabel='Bedrooms' />

                        <SelectionBar
                            size='sm'
                            options={numberList}
                            setSelectedOption={setBathrooms}
                            selectedOption={bathrooms}
                            inputLabel='Bathrooms' />

                        <SelectionBar
                            size='sm'
                            options={numberList}
                            setSelectedOption={setLivingrooms}
                            selectedOption={livingrooms}
                            inputLabel='Living Rooms' />

                        <SelectionBar
                            size='sm'
                            options={numberList}
                            setSelectedOption={setKitchens}
                            selectedOption={kitchens}
                            inputLabel='Kitchens' />


                        <SelectionBar
                            size='sm'
                            options={styleList}
                            setSelectedOption={setRentalStyle}
                            selectedOption={rentalStyle}
                            inputLabel='Rental Style' />

                        <SelectionBar
                            size='sm'
                            options={accessList}
                            setSelectedOption={setPrivateAccess}
                            selectedOption={privateAccess}
                            inputLabel='Private Access' />

                        <MultiSelectionBar
                            size='md'
                            options={facilityList}
                            setSelectedOption={setFacilities}
                            selectedOption={facilities}
                            inputLabel='Facilities'
                        />

                        <MultiSelectionBar
                            size='md'
                            options={preferenceList}
                            setSelectedOption={setTenantPreferences}
                            selectedOption={tenantPreferences}
                            inputLabel='Tenant Preferences'
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <FormControl fullWidth sx={{ m: 1, maxWidth: '23%' }}>
                                <MobileDatePicker
                                    label="Date mobile"
                                    inputFormat="MM/DD/YYYY"
                                    value={availableDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>

                        </LocalizationProvider>

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Lat'
                            inputValue={lat}
                            handleInput={setLat} />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Lng'
                            inputValue={lng}
                            handleInput={setLng} />
                    </Paper>


                    <Paper sx={{ width: '90%', mb: 2, marginLeft: '5%', marginTop: '2%' }} elevation={24}>
                        {/* Contact */}

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Name'
                            inputValue={contactName}
                            handleInput={setContactName} />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Email'
                            inputValue={contactEmail}
                            handleInput={setContactEmail} />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Phone'
                            inputValue={contactPhone}
                            handleInput={setContactPhone} />

                        <InputTextField
                            fieldSize='sm'
                            inputLabel='Wechat'
                            inputValue={contactWechat}
                            handleInput={setContactWechat} />

                    </Paper>

                    {/* Save */}




                </Paper>
            </Box>
        </div>

    )
}

export default Update