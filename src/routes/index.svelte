<script lang="ts">
	import Mountain from '../../static/mountain.svg';

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

	const onChoose = () => {
		currentView = views.UPLOADING;
	};

	const copyBtnStates = {
		copy: 'Copy Link',
		copied: 'Copied!'
	};

	let copyBtnText = copyBtnStates.copy;

	const onCopy = () => {
		navigator.clipboard.writeText('https://images.yourdomain.com/photo-1496950866446-325');
		copyBtnText = copyBtnStates.copied;

		setTimeout(() => {
			copyBtnText = copyBtnStates.copy;
		}, 1000);
	};

	const dropAreaStyles = {
		READY_TO_DROP: 'bg-[#F6F8FB]',
		DROPPING: 'bg-white'
	};

	let dropAreaBG = dropAreaStyles.READY_TO_DROP;

	const preventPropagation = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const onDragOver = (e: DragEvent) => {
		preventPropagation(e);
		dropAreaBG = dropAreaStyles.DROPPING;
	};

	const onDrop = (e: DragEvent) => {
		preventPropagation(e);
		dropAreaBG = dropAreaStyles.READY_TO_DROP;
		console.log(e.dataTransfer.files);
		onChoose();
	};

	const onDragLeave = (e: DragEvent) => {
		preventPropagation(e);
		dropAreaBG = dropAreaStyles.READY_TO_DROP;
	};

	const onChange = (e) => {
		console.log(e.target.files);
		onChoose();
	};
</script>

<div
	class={`${viewDimens[currentView]} text-center bg-white shadow-[0px_4px_12px_0px_#0000001A] rounded-[12px] p-[36px] transition-all`}
>
	{#if currentView === views.UPLOAD}
		<h1 class="text-[#4F4F4F]">Upload your image</h1>
		<div
			class={`${dropAreaBG} mt-[30px] h-[218px] rounded-[12px] border border-dashed border-[#97BEF4] relative`}
			on:drop={onDrop}
			on:dragover={onDragOver}
			on:dragleave={onDragLeave}
		>
			<div class="mt-[36px] flex justify-center">
				<Mountain />
			</div>
			<p class="text-[#BDBDBD] text-[12px] mt-[36px] leading-[1.5]">Drag & Drop your image here</p>
			<input type="file" accept="image/*" class="invisible" id="file-input" on:change={onChange} />
		</div>
		<p class="text-[#BDBDBD] text-[12px] leading-[1.5] mt-[18px]">or</p>
		<label for="file-input" class="btn mt-[20px] inline-block hover:cursor-pointer">
			Choose a file
		</label>
	{/if}

	{#if currentView === views.UPLOADING}
		<h1 class="text-[#4F4F4F] text-left">Uploading...</h1>
		<div class="relative w-full h-[6px] rounded-[8px] bg-[#F2F2F2] mt-[30px]">
			<div class="absolute bg-[#2F80ED] w-[50%] h-[6px] rounded-[8px]" />
		</div>
	{/if}

	{#if currentView === views.UPLOADED}
		<h1 class="text-[#4F4F4F]">Uploaded Successfully!</h1>
		<div class="flex justify-center mt-[26px]">
			<img src="/static/placeholder.jpg" class="h-[224px] rounded-[12px]" alt="" srcset="" />
		</div>
		<div class="flex mt-[26px] rounded-[8px] bg-[#F6F8FB] border border-[#E0E0E0]">
			<input
				type="text"
				class="flex-1 text-[8px] leading-[1.5] truncate my-0 px-[8px] bg-inherit rounded-[8px] outline-0"
				value="https://images.yourdomain.com/photo-1496950866446-325"
				readonly
			/>
			<button class="btn m-[2px] w-[91px]" on:click={onCopy}>{copyBtnText}</button>
		</div>
	{/if}
</div>
