<script>
   	/** @type {import('./$types').PageData} */
	export let data;
</script>

<section class="card w-full">
    <div class="p-4 space-y-6">
        <button class="btn variant-filled-primary">Edit</button>
    </div>
	<div class="p-4 space-y-4">
        {#if data?.title}
        <h1 class="text-6xl">{data?.title}</h1>
        {:else}
        <div class="placeholder animate-pulse h-16" />
        {/if}
		<div class="grid grid-cols-3 gap-8">
			<div class="placeholder" />
			<div class="placeholder" />
			<div class="placeholder" />
		</div>
		<div class="grid grid-cols-4 gap-4">
			<div class="placeholder" />
			<div class="placeholder" />
			<div class="placeholder" />
			<div class="placeholder" />
		</div>
	</div>
</section>

