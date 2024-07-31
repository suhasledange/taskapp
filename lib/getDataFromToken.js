import jwt from 'jsonwebtoken'

export const getDataFromToken = async (request) => {

    try {
        const token = await request.cookies.get("token")?.value || '';

        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decodedToken.email;

    } catch (error) {
        throw new Error("invalid token or token expired")   
    }
}