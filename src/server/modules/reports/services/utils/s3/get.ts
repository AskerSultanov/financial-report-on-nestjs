import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

var getFile = async (Key: string): Promise<Base64URLString | null> => {
  try {
    var client = new S3Client(JSON.parse(process.env.S3_CLIENT_OPTIONS!));
    var command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key,
    });
    var { Body } = await client.send(command);
    var base64 = Body!.transformToString('base64');
    return base64;
  } catch {
    return null;
  }
};

export default getFile;
