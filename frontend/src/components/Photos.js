import { useState, useEffect } from 'react';
import Photo from './Photo';
import {Col, Container, Row} from "react-bootstrap";

function Photos(){
    const [photos, setPhotos] = useState([]);
    useEffect(function(){
        const getPhotos = async function(){
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);

    return(
        <Container>
            <Row>
                {photos.map(photo => (
                    <Col xs={16} sm={6} md={4} lg={2} key={photo._id}>
                        <Photo photo={photo} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Photos;