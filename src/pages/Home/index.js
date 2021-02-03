import React, { useState, useEffect } from 'react';
import './styles.css';
import Post from '../Post/index';
import { db } from '../../services/firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
    },
}));
function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function App() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect( () => {
        db.collection('post').onSnapshot(snapshot => {
           
            setPosts(snapshot.docs.map(doc => ({
                id:doc.id,
                post:doc.data()
            })))
        });

    },[]);
    
       
    return (
        <div className="App">
            <Modal
            open={open}
            onClose={ () => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Modal</h2>
                </div>
            </Modal>
            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.paulostucchi.com.br/wp-content/uploads/2018/07/instagram-logo.png" alt="" />
                <span onClick={ () => setOpen(true)}>Login</span>
            </div>

            <h1>Insta-Clone</h1>
            {
                posts.map( ({id,post}) => (
                    <Post key={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
                )) 
            }
         
            {/* Header */}

            {/* Posts */}
            {/* Posts */}
        </div>
    );
}

export default App;
