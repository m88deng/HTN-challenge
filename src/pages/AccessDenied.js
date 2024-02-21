import { Link } from "react-router-dom";
import "./../style/login.css"

export default function AccessDenied() {
    return (
        <div className="AccessDenied">
            <div className="AccessDenied-message">This is a private event. <br /> Please login to see it.</div>
            <Link to="/login" className="AccessDenied-Login ">
                <div className="Login__section-submit" >LOGIN</div>
            </Link>
        </div>
    );
};