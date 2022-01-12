import './cryptoDetail.scss';
import { useParams } from 'react-router-dom';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useGetCoinQuery } from '../../services/cryptoAPI';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { Select } from 'antd';

const CryptoDetails = () => {
  const coinId = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const [coin, setCoin] = useState(null);
  const { data, isFetching } = useGetCoinQuery(Object.values(coinId)[0]);
  const cryptoDetails = data?.data?.coin;

  const { Option } = Select;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) {
    return 'Loading...';
  }

  return (
    <div className="coin_details_container">
      <div className="coin_heading_container">
        <h1>
          {cryptoDetails.name} ({cryptoDetails.symbol})
        </h1>
        <span>{cryptoDetails.name} </span>
        <small>
          live price in US Dollar (USD). View value statistics, market cap and
          supply.
        </small>
        <div className="break-line"></div>
        <div className="coin_timeperiod">
          <Select
            defaultValue="7d"
            className="select_timeperiod"
            placeholder="Select time period"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </div>
      </div>
      {/* {line chart} */}
      <div className="stats_container">
        <div className="stats_coin_value">
          <div className="stats_coin_value-heading">
            <h2>{cryptoDetails.name} Value Statistics</h2>
            <p>An overview showing the statistics of {cryptoDetails.name}</p>
          </div>
          <div className="stats_coin_statistic">
            {stats.map(({ title, value, icon }) => (
              <div className="coint_stats" key={title}>
                <div className="coin_stats_name">
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
                <div className="stats">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="stats_coin_value">
          <div className="stats_coin_value-heading">
            <h2>Other statistics</h2>
            <p>
              An overview showing the statistics of all crypto currencyrencies
            </p>
          </div>
          <div className="stats_coin_statistic">
            {genericStats.map(({ title, value, icon }) => (
              <div className="coint_stats" key={title}>
                <div className="coin_stats_name">
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
                <div className="stats">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="coin_desc">
        <div className="coin_desc_name">
          <h1>
            <span>What is</span> {cryptoDetails.name}
          </h1>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="coin_desc_links">
          <div className="coin_desc_name">
            <h1>{cryptoDetails.name} Links</h1>
          </div>
          <div className="coin_links">
            {cryptoDetails.links?.map((link, i) => (
              <div className="coin_link" key={i}>
                <h3>{link.type}</h3>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
