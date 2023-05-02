import React, { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import showcase from '../../styles/Showcase.module.css';
import Image from 'next/image';
import banner_1 from '../../asset/img/banner_1.jpeg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Xiaohongshu from '../../components/icons/Xiaohongshu';
import Wechat from '../../components/icons/Wechat';
import WechatVideo from '../../components/icons/WechatVideo';
import { LinkedIn } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BedIcon from '@mui/icons-material/Bed';
import PetsIcon from '@mui/icons-material/Pets';
import OpacityIcon from '@mui/icons-material/Opacity';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import TvIcon from '@mui/icons-material/Tv';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import KitchenIcon from '@mui/icons-material/Kitchen';
import BathroomIcon from '@mui/icons-material/Bathroom';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import GridViewIcon from '@mui/icons-material/GridView';


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    }
]

const facilityList = {
    internet: {
        index: 0,
        icon: <WifiIcon />,
        value: "光纤网络"
    },
    parking: {
        index: 1,
        icon: <LocalParkingIcon />,
        value: "停车位"
    },
    carpets: {
        index: 2,
        icon: <GridViewIcon />,
        value: "房间地毯"
    },
    snow_removal: {
        index: 3,
        icon: <AcUnitIcon />,
        value: "铲雪"
    },
    water: {
        index: 4,
        icon: <OpacityIcon />,
        value: "水费"
    },
    electricity: {
        index: 5,
        icon: <ElectricBoltIcon />,
        value: "电费"
    },
    natural_gas: {
        index: 6,
        icon: <PropaneTankIcon />,
        value: "煤气"
    },
    heat: {
        index: 7,
        icon: <FireplaceIcon />,
        value: "暖气"
    },
    furniture: {
        index: 8,
        icon: <BedIcon />,
        value: "全套家具"
    },
    storage: {
        index: 9,
        icon: <WarehouseIcon />,
        value: "存储室"
    },
    cablevision: {
        index: 10,
        icon: <TvIcon />,
        value: "电视"
    },
    garbage_collection: {
        index: 11,
        icon: <DeleteIcon />,
        value: "垃圾回收"
    },
    free_laundry: {
        index: 12,
        icon: <LocalLaundryServiceIcon />,
        value: "洗衣机"
    },
    refrigerator: {
        index: 13,
        icon: <KitchenIcon />,
        value: "冰箱"
    },
    dishwasher: {
        index: 14,
        icon: <BathroomIcon />,
        value: "洗碗机"
    },
    dishwasher: {
        index: 15,
        icon: <MicrowaveIcon />,
        value: "煮食炉"
    }
};

const preferenceList = {
    no_pet: {
        index: 0,
        icon: <PetsIcon />,
        value: "不能养宠"
    },
    no_smoke: {
        index: 1,
        icon: <SmokeFreeIcon />,
        value: "不能吸烟"
    },
};

const contactInfos = [
    {
        key: 1,
        icon: <Xiaohongshu />,
        text: "@邻里房源"
    },
    {
        key: 2,
        icon: <Wechat />,
        text: "@海外瑞安句居邻里达人说"
    },
    {
        key: 3,
        icon: <WechatVideo />,
        text: "@小普拉看房记"
    },
    {
        key: 4,
        icon: <LinkedIn />,
        text: "@Realtoracess"
    },
    {
        key: 5,
        icon: <LanguageIcon />,
        text: "@linlitalk.com"
    }
];

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 49.13415,
    lng: -123.1365
};

const Showcase = () => {
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
    const listingID = router.query.id;

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://18.222.121.41:3002/api/real-estate/${listingID}`)
            const json = await data.json()
            setListingTitle(json.listingTitle)
            setAddress(json.address)
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
            setImageUrls(JSON.parse(json.imageUrls))
            setLat(json.lat)
            setLng(json.lng)
        }
        if (listingID !== undefined) {
            fetchData().catch(console.error);
        }
    }, [listingID])



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const facilityComponent = (icon, primary) => {
        return (
            <div>
                <Divider sx={{ width: "200px", border: "0.5px solid #b1b3b5" }} />
                <div >
                    <ListItem   >
                        <ListItemIcon>
                            {/* <PetsIcon fontSize='large' className={showcase.facility_color} /> */}
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={primary} primaryTypographyProps={{ color: "#4CB648", fontSize: "25px" }} />
                    </ListItem>
                </div>
                <Divider sx={{ width: "200px", border: "0.5px solid #b1b3b5" }} />
            </div>
        )
    }

    return (
        <>
            <div className={showcase.container}>
                <div className={showcase.banners}>
                    <Image src={banner_1} width={500} height={100} alt="banner1" className={showcase.banner} />
                    <Image src={banner_1} width={500} height={100} alt="banner2" className={showcase.banner} />
                </div>
                <div className='listing-title'>
                    <p className={showcase.title}>{listingTitle}</p>
                </div>
                <div className='listing-brief-section'>
                    <p><h4>{capitalizeFirstLetter(propertyType)}  |  {capitalizeFirstLetter(rentalStyle)}  |   2 Days Ago</h4></p>
                    <p><h4>{bedrooms} 睡房  |  {bathrooms} 卫生间</h4></p>
                </div>
                <div className='picture-sction'>
                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr)) !important",
                            gridAutoColumns: "minmax(260px, 1fr)"
                        }}
                    >
                        {imageUrls.map((image) => (
                            <ImageListItem key={image.id}>
                                <img src={image.imageUrl} />
                                {/* <ImageListItemBar title={image.title} /> */}
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div className='listing-detail'>
                    <p className={showcase.listing_big_title}>${price}/月</p>
                    <Divider sx={{ width: "180px", border: "5px solid #4CB648" }} />
                    <p className={showcase.listing_big_title}>简介:</p>
                    <p className={showcase.listing_detail_main}>{description}</p>
                </div>
                <div className={showcase.furnitures_pets}>
                    {facilities.includes("furniture") && facilityComponent(<BedIcon fontSize='large' className={showcase.facility_color} />, "全套家具")}
                    {!tenantPreferences.includes("no_pet") && facilityComponent(<PetsIcon fontSize='large' className={showcase.facility_color} />, "可养宠物")}
                </div>

                <div>
                    <p className={showcase.listing_big_title}>包括:</p>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {facilities.map((facility) => {
                            if (facilityList.hasOwnProperty(facility))
                                return (
                                    <Grid item xs={2} sm={4} md={4} key={facilityList[facility]?.index}>
                                        <div className={showcase.facility_flex}>{facilityList[facility]?.icon}<p className={showcase.facility_info2}>{facilityList[facility]?.value}</p></div>
                                    </Grid>
                                )
                        }
                        )}
                    </Grid>
                </div>

                <div className={showcase.listing_caution}>
                    <p className={showcase.listing_big_title}>注意:</p>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {tenantPreferences.map((preference) => {
                            if (preferenceList.hasOwnProperty(preference))
                                return (
                                    <Grid item xs={2} sm={4} md={4} key={preferenceList[preference]?.index}>
                                        <div className={showcase.facility_flex}>{preferenceList[preference]?.icon}<p className={showcase.facility_info2}>{preferenceList[preference]?.value}</p></div>
                                    </Grid>
                                )
                        })}
                    </Grid>
                </div>

                <div className={showcase.listing_map}>
                    <Divider sx={{ width: "180px", border: "5px solid #4CB648" }} />
                    <div className='listing-map-address'>
                        <p className={showcase.listing_big_title2}>{capitalizeFirstLetter(city)}</p>
                        <p className={showcase.listing_map_street}>{address}</p>
                    </div>
                    <div className='listing-map-main'>
                        <LoadScript
                            googleMapsApiKey="AIzaSyBiVLDWIST62iywvIYJW_cfYnpl5lM1MeY"
                        >
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{ lat: lat, lng: lng }}
                                zoom={15}
                            >
                                { /* Child components, such as markers, info windows, etc. */}
                                <></>
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>

                <div className={showcase.listing_contact_us}>
                    <Divider sx={{ width: "180px", border: "5px solid #4CB648" }} />
                    <div className='listing-map-address'>
                        <p className={showcase.listing_big_title2}>关注我们</p>
                    </div>
                    <div className={showcase.contact_details}>
                        <List disablePadding>
                            {contactInfos.map((contactInfo) => (
                                <ListItem disablePadding key={contactInfo.key} >
                                    <ListItemIcon>
                                        {contactInfo.icon}
                                    </ListItemIcon>
                                    <a href='https://www.google.ca'>
                                        <ListItemText className={showcase.contact_detail_style} primary={contactInfo.text} />
                                    </a>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        </>
    )
}

Showcase.displayName = 'Showcase'

export default Showcase