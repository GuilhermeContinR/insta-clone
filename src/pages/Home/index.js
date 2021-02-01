import './styles.css';
import Post from '../Post/index';
import { useState } from 'react';


function App() {

    const [posts, setPosts] = useState([
        {
            username:"guilherme", 
            imageUrl:"//www.gstatic.com/mobilesdk/171005_mobilesdk/discovery-cards-crashlytics.png" ,
            caption:" Wowo first =)",
        },
        {
            username: "guilherme",
            imageUrl: "//www.gstatic.com/mobilesdk/171005_mobilesdk/discovery-cards-crashlytics.png",
            caption: " Wowo first =)",
        },
    ]);
    
    return (
        <div className="App">

            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.paulostucchi.com.br/wp-content/uploads/2018/07/instagram-logo.png" alt="" />
            </div>

            <h1>Insta-Clone</h1>
            {
                posts.map( (post, value) => {
                    return(
                        <Post
                            username={post.username}
                            imageUrl={post.imageUrl}
                            caption={post.caption}
                        />
                    )
                }) 
            }
         
            

            {/* Header */}

            {/* Posts */}
            {/* Posts */}
        </div>
    );
}

export default App;
