import Image from './Image';
import ImageList from '@mui/material/ImageList';
import All from '../styles/All.module.css';
const ShowImage = ({ images, setImages }) => {

    const show = (image) => {
        return <Image image={image} setImages={setImages} />;
    };

    return <ImageList
        sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr)) !important",
            gridAutoColumns: "minmax(200px, 1fr)"
        }}
    >{images.map(show)}</ImageList>;
};
export default ShowImage;