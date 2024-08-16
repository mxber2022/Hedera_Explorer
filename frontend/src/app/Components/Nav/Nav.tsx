"use client";
import "./Nav.css";

function Nav() {
    return (
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__left">
                    <div className="nav__logo">
                        HederaScan
                    </div>
                </div>
                <div className="nav__right">
                    <div className="nav__right-content">
                        {/* Future elements or buttons go here */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
