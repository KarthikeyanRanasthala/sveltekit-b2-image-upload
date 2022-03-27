<script lang="ts">
	import axios from 'axios';

	import Upload from '../components/Upload.svelte';
	import Uploading from '../components/Uploading.svelte';
	import Uploaded from '../components/Uploaded.svelte';

	const views = {
		UPLOAD: 'UPLOAD',
		UPLOADING: 'UPLOADING',
		UPLOADED: 'UPLOADED'
	};

	const viewDimens = {
		[views.UPLOAD]: 'w-[402px] h-[434px]',
		[views.UPLOADING]: 'w-[402px] h-[143px]',
		[views.UPLOADED]: 'w-[402px] h-[434px]'
	};

	let currentView = views.UPLOAD;

	let progressPercent = 0;

	let imgUrl = null;

	const uploadImage = async (file: File) => {
		progressPercent = 0;
		currentView = views.UPLOADING;

		try {
			const response = await axios.post('/api/upload', { fileName: file.name });

			const s3Response = await axios.put(response.data.signedUrl, file, {
				onUploadProgress: (progressEvent) => {
					progressPercent = (progressEvent.loaded / progressEvent.total) * 100;
				},
				headers: {
					'Content-Type': file.type
				}
			});

			const imgUrlObject = new URL(s3Response.config.url);

			imgUrl = `${imgUrlObject.origin}${imgUrlObject.pathname}`;

			currentView = views.UPLOADED;
		} catch (error) {
			currentView = views.UPLOAD;
		}
	};
</script>

<div
	class={`${viewDimens[currentView]} text-center bg-white shadow-[0px_4px_12px_0px_#0000001A] rounded-[12px] p-[36px] transition-all`}
>
	{#if currentView === views.UPLOAD}
		<Upload {uploadImage} />
	{/if}

	{#if currentView === views.UPLOADING}
		<Uploading {progressPercent} />
	{/if}

	{#if currentView === views.UPLOADED}
		<Uploaded {imgUrl} />
	{/if}
</div>
