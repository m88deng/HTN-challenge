import { Link, useNavigate } from 'react-router-dom';
import './../style/App.css';

export default function ProfileIcon({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout(true);
        navigate("/");
    };

    if (isLoggedIn) {
        return (
            <div className='App__header-pfp'>
                <div className='App__header-pfp-icon' onClick={handleLogout}>M</div>
            </div>
        );
    } else {
        return (
            <Link to='/login'>
                <div className='App__header-link'>LOGIN</div>
            </Link>
        );
    }
}