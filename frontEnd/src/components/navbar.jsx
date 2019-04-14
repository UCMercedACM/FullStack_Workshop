import React, {Component} from "react";
import { Link} from 'react-router-dom';

class NavBar extends Component{
    render(){
        return(
            <React.Fragment>
                <nav className = "navbar is-primary">
                    <div className = "navbar-end">
                        <Link  className = "navbar-item" to = "/status">
                             <span>Truck Status</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/mechanic">
                             <span>Mechanic Fix</span>
                        </Link>
                        <Link  className = "navbar-item" to = "/pending">
                            <span>Pending To be Fixed</span>
                        </Link>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default NavBar;