import 'dotenv/config';
import { ListObjectsCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
	endpoint: process.env.B2_ENDPOINT,
	region: process.env.B2_REGION,
	credentials: {
		accessKeyId: process.env.B2_ACCESS_KEY_ID,
		secretAccessKey: process.env.B2_SECRET_ACCESS_KEY
	}
});

const res = await client.send(
	new ListObjectsCommand({
		Bucket: process.env.B2_BUCKET,
		Prefix: 'image-uploads'
	})
);

const deleteOperations = (res?.Contents || []).map((content) => {
	console.log(content);

	client.send(
		new DeleteObjectCommand({
			Bucket: process.env.B2_BUCKET,
			Key: content.Key
		})
	);
});

await Promise.all(deleteOperations);
