import axios from "axios";

export const getCSRF = async () => {
    try{
         await axios.get(`http://localhost:8000/sanctum/csrf-cookie `,
            { withCredentials: true });
    }catch (error) {
        console.error(error);
    }

}