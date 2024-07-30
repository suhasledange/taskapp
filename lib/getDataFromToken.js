import jwt from 'jsonwebtoken'

export const getDataFromToken = async (request) => {

    try {
        const token = await request.cookies.get("token")?.value || '';

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken)
        return decodedToken.email;

    } catch (error) {
        throw new Error(error.message)   
    }
}