import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const BASE_PREFIX = 'App-Craft';
const APPLET_FOLDER_PREFIX = `${BASE_PREFIX}/applets`;
const REGION = 'ap-south-1';
const BUCKET = 'whjr-prod-cocos-applet';
// const CDN = 'https://s3-whjr-prod-cocos-applet.whjr.online';

const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export async function getAppletData(id: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: `${APPLET_FOLDER_PREFIX}/${id}/data.json`,
    // Get latest, not cached version
    ResponseCacheControl: 'no-cache',
  });

  let response;
  try {
    response = await client.send(command);
  } catch (err) {
    return null;
  }
  // FIXME: Handle an error while streaming the response body
  if (response.Body == null) return null;

  const json = await response.Body.transformToString('utf8');
  return JSON.parse(json) as unknown;
}

export async function putAppletData(id: string, data: unknown) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: `${APPLET_FOLDER_PREFIX}/${id}/data.json`,
    Body: JSON.stringify(data),
  });

  await client.send(command);
}

// export function getAppletURL(id: string) {
//   return `${CDN}/${BASE_PREFIX}/index.html/${id}`;
// }
