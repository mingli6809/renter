import React from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import {
    IconButton,
    ImageListItem,
    ImageListItemBar,
} from '@mui/material';
function Image({ image, setImages }) {
    const handleDelete = (image) => {
        const deleteImageId = image.id;
        setImages((current) => current.filter((image) => image.id !== deleteImageId));
    }
    return (
        <div>
            <ImageListItem >
                <img alt='' src={image.src} key={image.id} />
                <ImageListItemBar
                    position="top"
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                    }}
                    actionIcon={
                        <IconButton
                            sx={{ color: 'white' }}
                            onClick={() => handleDelete(image)}
                        >
                            <CancelIcon />
                        </IconButton>
                    }
                ></ImageListItemBar>
            </ImageListItem>
        </div>
    );
}
export default Image;