import {useContext} from "react";
import {UserContext} from "../userContext";
import {Link} from "react-router-dom";

function Header(props) {
    const userContext = useContext(UserContext);
    const username = userContext.user ? userContext.user.username : "";

    return (
        <header className="mb-5">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="https://i.imgur.com/5hqFNND.png" width="35" height="30"
                             className="d-inline-block align-top" alt="Icon"/>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <UserContext.Consumer>
                                {context => (
                                    context.user ?
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/publish">Publish</Link>
                                            </li>
                                            <li className="nav-item ml-auto">
                                                <Link className="nav-link" to={`/profile`}>Profile</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/logout">Logout</Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Log in</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/register">Register</Link>
                                            </li>
                                        </>
                                )}
                            </UserContext.Consumer>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
