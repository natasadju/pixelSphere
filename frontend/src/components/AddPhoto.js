import {useContext, useState} from 'react'
import {Navigate} from 'react-router';
import {UserContext} from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [error, setError] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', file);
        try {
            const res = await fetch('http://localhost:3001/photos', {
                method: 'POST',
                credentials: 'include',
                body: formData
            });
            if (!res.ok) {
                throw new Error('Failed to upload photo');
            }
            setUploaded(true);
        } catch (error) {
            setError(error.message || 'An error occurred while uploading the photo.');
        }
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login"/> : ""}
            {uploaded ? <Navigate replace to="/"/> : ""}
            <input type="text" className="form-control" name="ime" placeholder="Ime slike" value={name}
                   onChange={(e) => {
                       setName(e.target.value)
                   }}/>
            <textarea className="form-control" name="opis" placeholder="Opis slike" value={description}
                      onChange={(e) => {
                          setDescription(e.target.value)
                      }}/>
            <label>Izberi sliko</label>
            <input type="file" id="file" onChange={(e) => {
                setFile(e.target.files[0])
            }}/>
            <input className="btn btn-primary" type="submit" name="submit" value="Naloži"/>
        </form>
    )
}

export default AddPhoto;