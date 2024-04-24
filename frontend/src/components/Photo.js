import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const photoContainerStyle = {
    width: '100%', // Adjust the width as needed
    margin: '10px', // Add some margin between photos
};

const imageStyle = {
    width: '100%', // Adjust the width as needed
    height: 'auto', // Keep the aspect ratio of the image
    marginBottom: '5px', // Add some space between image and title
    borderRadius: '10px', // Make the edges of the photo soft
};

const titleStyle = {
    display: 'flex', // Use flexbox for layout
    justifyContent: 'space-between', // Space evenly between items
    alignItems: 'center', // Align items vertically
    textAlign: 'left', // Align text to the left
};

const usernameStyle = {
    marginLeft: '10px',
    textDecoration: 'underline', // Add underline to indicate clickable
    cursor: 'pointer', // Change cursor to pointer to indicate clickable
};

function Photo(props) {
    return (
        <div style={photoContainerStyle}>
            <img src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name} style={imageStyle}/>
            <div style={titleStyle}>
                <h5>{props.photo.name}</h5>
                {/* Wrap the username in a Link component */}
                <Link to={`/profile/${props.photo.postedBy.username}`} style={usernameStyle}>
                    {props.photo.postedBy.username}
                </Link>
            </div>
        </div>
    );
}

export default Photo;
