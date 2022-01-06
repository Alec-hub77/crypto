import './news.scss'
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import moment from 'moment';


const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: 'Cryptocurrency',
    count: simplified ? 6 : 12,
  });
  

  if(isFetching) {
      return 'Loading...'
  }

  return (
      <div className="crypto_news">
          <div className="news_card-container">
          { cryptoNews?.value?.map((news, i) => (
                <div className="news_card" key={i}>
                    <a href={news.url} target="_blank" rel="noreferrer">
                        <div className="news_image_container">
                            <h3 className="news_title">{news.name}</h3>
                            <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news-img" />
                        </div>
                        <div className="news_description">
                            <p>
                            {news.description > 100 
                                ? news.description.substring(0, 100) + '...'
                                : news.description
                            }
                            </p>
                        </div>
                        <div className="provider_container">
                            <div className="provider_container-title">
                            <img src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news" width={25} height={25} />
                            <div className="provider_name">{news.provider[0]?.name}</div>

                            </div>
                        <small className="date">{moment(news.datePublished).startOf('ss').fromNow()}</small>
                        </div>
                    </a>
                </div>
              ))}
        </div>
      </div>
  );
};

export default News;
