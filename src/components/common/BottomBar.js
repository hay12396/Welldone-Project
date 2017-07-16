import { Link, IndexLink } from 'react-router';
import bottomStyle from './styles/BottomStyle';
import React from 'react';


const BottomBar = () => {
    return (
        <nav className="navbar navbar-default" role="navigation" style={bottomStyle}>
            <IndexLink to="/locations" activeClassName="active">
                {/*<button type="button" className="btn btn-info">*/}
                    <span className="glyphicon glyphicon-road" /> Locations
                {/*</button>*/}
            </IndexLink>
            {"  "}
            <Link to="/categories" activeClassName="active">
                {/*<button type="button" className="btn btn-info">*/}
                    <span className="glyphicon glyphicon-th-list ml-16" /> Categories
                {/*</button>*/}
            </Link>
        </nav>
    );
};

export default BottomBar;
