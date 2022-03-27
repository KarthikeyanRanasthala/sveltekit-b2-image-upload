<script lang="ts">
	import Mountain from '../../static/mountain.svg';

	export let uploadImage: (file: File) => Promise<void>;

	const dropAreaStyles = {
		READY_TO_DROP: 'bg-[#F6F8FB]',
		DROPPING: 'bg-white'
	};

	let dropAreaBG = dropAreaStyles.READY_TO_DROP;

	const preventPropagation = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const onDragOver: svelte.JSX.DragEventHandler<HTMLDivElement> = (e) => {
		preventPropagation(e);
		dropAreaBG = dropAreaStyles.DROPPING;
	};

	const onDrop: svelte.JSX.DragEventHandler<HTMLDivElement> = (e) => {
		preventPropagation(e);
		dropAreaBG = dropAreaStyles.READY_TO_DROP;
		uploadImage(e.dataTransfer.files[0]);
	};

	const onDragLeave: svelte.JSX.DragEventHandler<HTMLDivElement> = (e) => {
		preventPropagation(e);
		dropAreaBG = dropAreaStyles.READY_TO_DROP;
	};

	const onChange = (e) => {
		uploadImage(e.target.files[0]);
	};
</script>

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
