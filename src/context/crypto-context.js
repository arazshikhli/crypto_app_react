import { createContext, useState, useEffect } from "react";
import { FetchAssets, FetchCrypto } from '../components/Layout/Api';
import { percentDifference, capitalize } from '../utils'
const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false
})

export const CryptoContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        setLoading(true)
        async function preload() {
            const { result } = await FetchCrypto()
            const assets = await FetchAssets()
            setAssets(assets.map(asset => {
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    return <CryptoContext.Provider value={{}}>
        {children}
    </CryptoContext.Provider>
}