import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!window.gapi.client) navigate('/sign-in');
    }, []);
    return <div>Main</div>;
}
