import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"; // ES Modules import
import { FetchHttpHandler } from "@smithy/fetch-http-handler";
const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_IAM_USER_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_IAM_USER_SECRET,
};

export const s3download = async (fileName, bucketName, region) => {
  const config = {
    region,
    credentials,
  };

  const client = new S3Client(config);
  const input = {
    Bucket: bucketName,
    Key: fileName,
  };

  const command = new GetObjectCommand(input);
  console.log(command);
  const response = await client.send(command);
  console.log(response);
  const bytes = await response.Body.transformToByteArray();
  console.log(bytes);
  return bytes;
};
