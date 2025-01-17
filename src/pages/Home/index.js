import React, { useState, useEffect } from 'react';
import './styles.css';
import Post from '../Post/index';
import { db, auth } from '../../services/firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from '@material-ui/core';
import ImageUpload from '../../services/imageUpload';
import InstagramEmbed from 'react-instagram-embed';

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

function App() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [posts, setPosts] = useState([]);

    const [openSignIn, setOpenSignIn] = useState(false)
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // logado
                setUser(authUser);
            } else {
                // deslogado
                setUser(null)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user, username]);


    useEffect(() => {
        db.collection('post').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
           
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        });

    }, []);

    const signUp = async (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));
    }
    const signIn = async (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => { alert(error.message); return false })

        setOpenSignIn(false)
    }

    return (
        <div className="App">

            {/* Caption Iput */}
            {/* File picker */}
            {/* post button */}



            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center className="modal__form">

                            <TextField
                                label="Usuário"
                                type="text"
                                value={username}
                                onChange={e => { setUsername(e.target.value) }}
                                variant="outlined"
                                m={2}
                                className={classes.p10}
                            />

                            <TextField
                                label="E-mail"
                                type="text"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <Button variant="contained" color="primary" onClick={signUp}
                                className={classes.p10}
                                type="submitt"
                            >
                                Registrar
                        </Button>
                        </center>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center className="modal__form">

                            <TextField
                                label="E-mail"
                                type="text"
                                value={email}
                                onChange={e => { setEmail(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value) }}
                                variant="outlined"
                                className={classes.p10}
                            />

                            <Button variant="contained" color="primary" onClick={signIn}
                                className={classes.p10}
                                type="submitt"
                            >
                                Login
                        </Button>
                        </center>
                    </form>
                </div>
            </Modal>
            <div className="app__header">

                <img
                    className="app__headerImage"
                    src="https://www.paulostucchi.com.br/wp-content/uploads/2018/07/instagram-logo.png" alt="" />
                {
                    user ? <Button onClick={() => auth.signOut()}>Logout</Button>
                        :
                        <div className="app__loginContainer">
                            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
                            <Button onClick={() => setOpen(true)}>Registrar</Button>
                        </div>

                }


            </div>

            <div className="app__posts">
                <div className="app_postsLeft">
                    {
                        posts.map(({ id, post }) => (
                            <Post key={id} postId={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
                        ))
                    }
                </div>
            </div>

            <div className="app_postsRight">
                <InstagramEmbed
                    url='https://www.instagram.com/p/B_uf9dmAGPw/'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => { }}
                    onSuccess={() => { }}
                    onAfterRender={() => { }}
                    onFailure={() => { }}
                />
            </div>



            {user?.displayName ? (
                <ImageUpload username={user.displayName} />
            )
                :
                (<h3>Faca login para upload</h3>)
            }
        </div>
    );
}

export default App;
