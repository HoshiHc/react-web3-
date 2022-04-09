import axios from 'axios'

interface DataForNftProps {
  start: number
  limit?: number
  sort?: string
  desc?: boolean
  period?: number
}
// start:0,limit:10,ort:'volume',desc:true,period:1
export async function getDataForNft(obj: DataForNftProps) {
  return await axios.get(
    'https://api.coinmarketcap.com/data-api/v3/nft/collections',
    {
      params: obj,
    }
  )
}

export async function getEthPrice() {
  return await axios.get(
    'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=ethereum&start=1&limit=1&category=spot&sort=cmc_rank_advanced'
  )
}
