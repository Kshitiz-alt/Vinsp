import axios from "axios"

const api = async (query:string,limit:number) => {
    try {
        const TopSongs = await axios.get(`https://saavn.dev/api/search/songs?query=${query}&limit=${limit}`)
        const { data } = TopSongs.data
        console.log(data)
        return {data}
    } catch (error) {
        console.error("Couldn't fetch data", error)
    }
}

export default api