import { Link } from 'react-router-dom'
import './footer.scss'


const Footer = () => {
    return (
        <div className="footer">
            <h4>Cryptoverse</h4>
            <h4>All rights reserved</h4>
            <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
            </div>
        </div>
    )
}

export default Footer
