export const percentDifference = (assetPrice, coinPrice) => {
    return +(100 * Math.abs((assetPrice - coinPrice) / ((assetPrice + coinPrice) / 2))).toFixed(2)
}

export const capitalize = (word) => {

    return word.charAt(0).toUpperCase() + word.substr(1)

}