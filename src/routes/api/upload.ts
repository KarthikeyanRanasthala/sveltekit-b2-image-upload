import 'dotenv/config';
import path from 'path';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { nanoid } from 'nanoid';

import type { RequestHandler } from '@sveltejs/kit';

const client = new S3Client({
	endpoint: process.env.B2_ENDPOINT,
	region: process.env.B2_REGION,
	credentials: {
		accessKeyId: process.env.B2_ACCESS_KEY_ID,
		secretAccessKey: process.env.B2_SECRET_ACCESS_KEY
	}
});

export const post: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const command = new PutObjectCommand({
		Bucket: process.env.B2_BUCKET,
		Key: `${nanoid()}${path.extname(body.fileName)}`
	});

	const signedUrl = await getSignedUrl(client, command, {
		expiresIn: 300
	});

	return {
		body: {
			signedUrl
		}
	};
};
