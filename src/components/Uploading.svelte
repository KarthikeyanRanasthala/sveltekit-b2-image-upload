<script lang="ts">
	export let progressPercent: number;
</script>

<h1 class="text-[#4F4F4F] text-left">Uploading...</h1>
<div class="relative w-full h-[6px] rounded-[8px] bg-[#F2F2F2] mt-[30px]">
	<div
		style={`width: ${progressPercent}%;`}
		class={`absolute bg-[#2F80ED] h-[6px] rounded-[8px] transition-all`}
	/>
</div>
