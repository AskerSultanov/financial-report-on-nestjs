import * as s3 from '../s3/index.js';

export var getImagesAsBase64 = async (
  userId: string,
  skus: { skuName: string }[],
): Promise<{ skuImages: { skuName: string; base64: string | null }[] }> => {
  var skuImages = [];

  for (var { skuName } of skus) {
    var objectKey: string = 'skuname=' + skuName + ';' + 'userId=' + userId;

    var base64: string | null = await s3.getFile(objectKey);
    skuImages.push({ skuName, base64 });
  }

  return { skuImages };
};
