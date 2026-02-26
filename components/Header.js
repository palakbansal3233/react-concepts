import { useState } from 'react';
import { Link } from 'react-router';
import logo from 'url:../assets/images/logo.png';

const Header = () => {
	const [buttonName, setButtonName] = useState('Login')

	const handleToggle = () => {
		buttonName === 'Login' ? 	setButtonName('Logout') : setButtonName('Login');
	}

	return (
		<header className="header">
			<div className="header-inner">
				<div className="logo-container">
					<img className="logo" src={logo} alt="Logo" width={50} height={50} />
				</div>
				<nav className="nav-items">
					<Link to="/" className="nav-link">Home</Link>
					<Link to="/about" className="nav-link">About Us</Link>
					<Link to="/contact" className="nav-link">Contact Us</Link>
					<Link to="#" className="nav-link cart-link">🛒 Cart</Link>
					<button className="header-btn" onClick={handleToggle}>{buttonName}</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;