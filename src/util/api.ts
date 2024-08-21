const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) throw new Error("Giphy API Key is missing");

export default API_KEY;
