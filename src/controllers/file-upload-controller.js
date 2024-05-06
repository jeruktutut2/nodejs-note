import {fileTypeFromBuffer} from 'file-type';

const uploadFile = async (req, res, next) => {
    try {
        const files = req.files.undefined
        
        const buffer0 = files[0].data
        const fileType0 = await fileTypeFromBuffer(buffer0)
        console.log("fileType0:", files[0].name, fileType0);

        const buffer1 = files[0].data
        const fileType1 = await fileTypeFromBuffer(buffer1)
        console.log("fileType1:", files[1].name, fileType1);

        res.status(200).json({
            data: "successfully uploaded ",
            error: ""
        })
    } catch (error) {
        next(error)
    }
}

export default {
    uploadFile
}