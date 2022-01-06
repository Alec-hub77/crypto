import './news.scss';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import moment from 'moment';
import { Select } from 'antd';
import { useState } from 'react';
import { useGetCryptosQuery } from '../../services/cryptoAPI';

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const { Option } = Select;

  if (isFetching, !data) {
    return 'Loading...';
  }

  return (
    <>
      {!simplified && (
        <div className="select_news_container">
          <Select
            showSearch
            className="select_news"
            style={{width: '240px'}}
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) =>  (
                <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </div>
      )}
      <div className="crypto_news">
        <div className="news_card-container">
          {cryptoNews?.value?.map((news, i) => (
            <div className="news_card" key={i}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news_image_container">
                  <h3 className="news_title">{news.name}</h3>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news-img"
                  />
                </div>
                <div className="news_description">
                  <p>
                    {news.description > 100
                      ? news.description.substring(0, 100) + '...'
                      : news.description}
                  </p>
                </div>
                <div className="provider_container">
                  <div className="provider_container-title">
                    <img
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                      width={25}
                      height={25}
                    />
                    <div className="provider_name">
                      {news.provider[0]?.name}
                    </div>
                  </div>
                  <small className="date">
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </small>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
