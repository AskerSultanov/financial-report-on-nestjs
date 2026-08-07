import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

var uploadFile = async (
  Key: string,
  Body: Buffer,
): Promise<{ httpStatusCode: number | undefined }> => {
  var client = new S3Client(JSON.parse(process.env.S3_CLIENT_OPTIONS!));
  var command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key,
    Body,
    ContentType: 'image/png',
  });
  var res = await client.send(command);
  return { httpStatusCode: res['$metadata'].httpStatusCode };
};

export default uploadFile;
