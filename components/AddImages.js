import { Button, Paper } from '@mui/material'
import React, { useState, useCallback } from 'react'
//import { useDropzone } from 'react-dropzone';
//import { storage } from "../firebase/config";
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";
import ShowImage from './ShowImage';
import DropBox from './DropBox';
import { storage } from '../firebase/config';
import LoopIcon from '@mui/icons-material/Loop';





const AddImages = ({ setImageUrls }) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImages((prevState) => [
                    ...prevState,
                    { id: index, src: e.target.result },
                ]);
            };
            reader.readAsDataURL(file);
            return file;
        });
    }, []);


    const uploadPictures = async () => {

        let imageUrls = [];
        setIsLoading(true);
        for (let i = 0; i < images.length; i++) {
            const storageRef = ref(storage, `images/${v4()}`);
            uploadString(storageRef, images[i].src, 'data_url')
                .then((snapshot) => {
                    getDownloadURL(storageRef).then((url) => {
                        let imageUrlsObj = {};
                        imageUrlsObj['id'] = i;
                        imageUrlsObj['imageUrl'] = url;
                        imageUrls.push(imageUrlsObj);
                        setImageUrls(JSON.stringify(imageUrls));
                    })
                        .catch((error) => {
                            switch (error.code) {
                                case 'storage/object-not-found':
                                    // File doesn't exist
                                    break;
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;
                                case 'storage/canceled':
                                    // User canceled the upload
                                    break;
                                case 'storage/unknown':
                                    // Unknown error occurred, inspect the server response
                                    break;
                            }
                        })
                })
        }
        setIsLoading(false);
    };
    return (
        <div >
            <DropBox onDrop={onDrop} />
            <ShowImage images={images} setImages={setImages} />
            {isLoading ?
                <LoopIcon />
                :
                <Button variant="contained" onClick={uploadPictures}>Insert</Button>
            }
        </div>
    );
}

export default AddImages