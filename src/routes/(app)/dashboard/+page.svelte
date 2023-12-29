<script>
    export let data;
</script>

{#if data?.user}

    <h1 class="text-5xl">Dashboard for {data?.user?.username}</h1>

{:else}

    <h1 class="text-5xl">Dashboard</h1>

{/if}