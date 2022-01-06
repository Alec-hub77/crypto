import './cryptocurrencies.scss'
import { useState, useEffect } from "react"
import { useGetCryptosQuery } from "../../services/cryptoAPI"
import { Link } from 'react-router-dom'
import millify from 'millify'
import {SearchOutlined} from '@ant-design/icons/lib/icons'



const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {  
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptoList, searchTerm])

    if(isFetching) {
        return 'Loading...'
    }

    return (
        <>
        { !simplified && (
              <div className="search-crypto">
              <div className="search-crypto-container">
                  <SearchOutlined />
                  <input type="text" placeholder="Search cryptocurrency..." onChange={e => setSearchTerm(e.target.value)}/>
              </div>
          </div>
        )}
      
        <div className="cryptocurrencies">
            <div className="crypto_card_container">
                { cryptos?.map(crypto => (
                <Link to={`/cryptos/${crypto.uuid}`} key={crypto.uuid}>
                <div className="crypto_card" >
                <div className="crypto_card_title" >
                    <h4>{crypto.rank}. {crypto.name}</h4>
                    <img src={crypto.iconUrl} alt="crypto-logo" with={30} height={30}/>
                </div>
                <div className="break-line"></div>
                <div className="crypto_card_content">
                    <div className="crypto_card_desc">
                        <span className="crypto_card_span">Price:</span> <span>{millify(crypto.price)}</span>
                    </div>
                    <div className="crypto_card_desc">
                        <span className="crypto_card_span">Market Cap:</span> <span>{millify(crypto.marketCap)}</span>
                    </div>
                    <div className="crypto_card_desc">
                        <span className="crypto_card_span">Daily Change:</span> <span>{millify(crypto.change)}</span>
                    </div>
                    <div className="crypto_card_desc">
                        <span className="crypto_card_span">Symbol:</span> <span>{crypto.symbol}</span>
                    </div>
                </div>
                </div>
                </Link>

                ))}
            </div>
        </div>
        </>
    )
}

export default Cryptocurrencies
