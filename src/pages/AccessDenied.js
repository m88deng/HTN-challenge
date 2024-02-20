import background from "./../img/space-error.jpeg";
import "./../style/login.css"

export default function AccessDenied() {
    return(
        <div>
            <div className="AccessDenied-message"></div>
            <Link to="/login">
                <div className="Login__section-submit" >LOGIN</div>
            </Link>
        </div>
    );
};