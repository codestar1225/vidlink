"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveVideoS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const saveVideoS3 = (file, videoLink) => __awaiter(void 0, void 0, void 0, function* () {
    let finalVideoLink = videoLink;
    if (file) {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `videos/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: client_s3_1.ObjectCannedACL.public_read,
        };
        console.log("Starting S3 upload...");
        const upload = new lib_storage_1.Upload({
            client: s3Client,
            params: params,
        });
        try {
            const s3Response = yield upload.done();
            console.log("S3 upload successful");
            finalVideoLink = s3Response.Location || "";
        }
        catch (error) {
            console.error("Error uploading to S3:", error);
            throw new Error("Failed to upload video to S3");
        }
    }
});
exports.saveVideoS3 = saveVideoS3;
