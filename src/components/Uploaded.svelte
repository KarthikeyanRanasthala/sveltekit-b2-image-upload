<script lang="ts">
	export let imgUrl: string;

	const copyBtnStates = {
		copy: 'Copy Link',
		copied: 'Copied!'
	};

	let copyBtnText = copyBtnStates.copy;

	const onCopy = () => {
		navigator.clipboard.writeText(imgUrl);
		copyBtnText = copyBtnStates.copied;

		setTimeout(() => {
			copyBtnText = copyBtnStates.copy;
		}, 1000);
	};
</script>

<h1 class="text-[#4F4F4F]">Uploaded Successfully!</h1>
<div class="flex justify-center mt-[26px]">
	<img src={imgUrl} class="h-[224px] rounded-[12px]" alt="" />
</div>
<div class="flex mt-[26px] rounded-[8px] bg-[#F6F8FB] border border-[#E0E0E0]">
	<input
		type="text"
		class="flex-1 text-[8px] leading-[1.5] truncate my-0 px-[8px] bg-inherit rounded-[8px] outline-0"
		value={imgUrl}
		readonly
	/>
	<button class="btn m-[2px] w-[91px]" on:click={onCopy}>{copyBtnText}</button>
</div>
