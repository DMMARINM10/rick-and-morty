import axios from "axios";

// global request settings
const baseUrl = import.meta.env.VITE_BACKEND_URL_GRAPHQL
axios.defaults.method = 'post'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const request = async(query: string): Promise<object> => {
    const config = {
        method: 'POST',
        url: baseUrl,
        data: JSON.stringify({ query }) 
    }
    try {
        const resp = await axios(config)
        const result = resp.data.data
        return result
    } catch (error) {
        throw new Error((error as Error).message)
    }
}