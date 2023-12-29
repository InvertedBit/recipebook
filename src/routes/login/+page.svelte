<script>
    
    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('./$types').ActionData} */
    export let form;

</script>

<div class="w-full h-full flex flex-col justify-center content-center justify-items-center flex-wrap">
    <div class="card p-8 flex flex-col w-1/2">

        <h1 class="text-4xl my-5">Login</h1>
    
        <form method="post" action="?/login">
            {#if form?.success}
                <h3 class="text-2xl my-8">Welcome back {data?.username}!</h3>
            {:else}
                {#if form?.error}
                    <div class="alert variant-filled-warning">
                        <div class="alert-message">
                            <p>{form?.error}</p>
                        </div>
                    </div>
                {/if}
                <input type="text" name="username" placeholder="Username" class="input mt-3" class:input-error="{form?.usernameMissing}" value="{form?.username ?? ''}" />
                <input type="password" name="password" placeholder="Password" class="input mt-3"class:input-error="{form?.passwordError}"  />
                <button type="submit" formaction="?/login" class="btn variant-filled-primary mt-8">Login</button>
            {/if}
        </form>
    </div>
</div>

