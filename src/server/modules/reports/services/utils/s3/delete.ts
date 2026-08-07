import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

var deleteFile = async (Key: string): Promise<void> => {
  var client = new S3Client(JSON.parse(process.env.S3_CLIENT_OPTIONS!));
  var command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key,
  });
  await client.send(command);
};

export default deleteFile;
