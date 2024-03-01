import { uploadToAWS } from "./AWSUpload";

async function handler(request, response) {
    const { name, file } = request.body;

    try {
        const res2 = await uploadToAWS(name[0], file[0]);
        console.log("res2", res2);
        return response.status(200).json({ msg: "OK", userData: res2 });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

export default handler;
