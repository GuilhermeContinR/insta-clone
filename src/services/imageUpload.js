import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { storage, db } from './firebase'
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
    },
    p10: {
        margin: theme.spacing(1),
    },
}));
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


function ImageUpload(){

    const classes = useStyles();

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState();
    const [progress, setProgress] = useState(0);


    const handleChange = async (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = async (e) => {

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                // progress
                 const progress = Math.round(
                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                 );
                 setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then( url => {
                    db.collection("post").add({
                        
                    })
                })
            }
        )
    }

    return(
        <div>
            <TextField
                label="Caption"
                type="text"
                value={caption}
                onChange={e => { setCaption(e.target.value) }}
                variant="outlined"
                m={2}
                className={classes.p10}
            />
            <input
                type="file"
                value={image}
                onChange={handleChange}
                className={classes.p10}
            />
            <Button variant="contained" color="primary" onClick={handleUpload}
                className={classes.p10}
                type="submitt"
            >
                Upload
            </Button>
        </div>
    )


}

export default ImageUpload;