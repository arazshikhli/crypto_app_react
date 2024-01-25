import { cryptoAssets, cryptoData } from '../../data'

export function FetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1000)
    })
}

export function FetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 1000)
    })
}