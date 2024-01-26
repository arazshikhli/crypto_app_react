import { cryptoAssets, cryptoData } from '../../data'

export function FetchCrypto() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 1500)
    })
}

export function FetchAssets() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2000)
    })
}