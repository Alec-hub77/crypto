import './home.scss'
import { useGetCryptosQuery } from '../../services/cryptoAPI';
import millify from 'millify';
import { Link } from 'react-router-dom'
import Cryptocurrincies from '../Cryptocurrencies/Cryptocurrencies'
import News from './../News/News';


const Home = () => {

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;



  if(isFetching) {
    return 'Loading...'
  }

  return (
    <div className="homePage">
      <h2>Global Crypto Stats</h2>
      <div className="heading">
        <div className="heading_block">
          <small>Total Cryptocurrincies</small>
          <span>{globalStats.total}</span>
        </div>
        <div className="heading_block">
          <small>Total Market Cap</small>
          <span>{millify(globalStats.totalMarketCap)}</span>
        </div>
        <div className="heading_block">
          <small>Total Markets</small>
          <span>{globalStats.totalMarkets}</span>
        </div>
        <div className="heading_block">
          <small>Total Exchanges</small>
          <span>{globalStats.totalExchanges}</span>
        </div>
        <div className="heading_block">
          <small>Total 24h Volume</small>
          <span>{millify(globalStats.total24hVolume)}</span>
        </div>
      </div>
      <div className="home_heading_container">
        <div className="home_heading-title">
          <h2>Top 10 Cryptocurrincies in the World</h2>
          <h3><Link to="/cryptocurrencies">Show more</Link></h3>
        </div>
      </div>
      <Cryptocurrincies simplified/>
      <div className="home_heading_container">
        <div className="home_heading-title">
          <h2>Latest Crypto News</h2>
          <h3><Link to="/news">Show more</Link></h3>
        </div>
      </div>
      <News simplified/>
    </div>
  );
};

export default Home;
