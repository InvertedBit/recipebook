<script>
    
    /** @type {import('./$types').ActionData} */
    export let form;

</script>

<div class="w-full h-full flex flex-col justify-center content-center justify-items-center flex-wrap">
    <div class="card p-8 flex flex-col w-1/2">

        <h1 class="text-4xl my-5">Register</h1>
    
        <form method="post" action="?/register">
            {#if form?.success}
                <h3 class="text-2xl my-8">Welcome {form?.username}!</h3>
                <p class="text-lg">A confirmation E-Mail will be sent to {form?.email}</p>
            {:else}
                {#if form?.error}
                    <div class="alert variant-filled-warning">
                        <div class="alert-message">
                            <p>{form?.error}</p>
                        </div>
                    </div>
                {/if}
                <input type="text" name="username" placeholder="Username" class="input mt-3" class:input-error="{form?.usernameMissing}" value="{form?.username ?? ''}" />
                <input type="email" name="email" autocomplete="email" placeholder="E-Mail" class="input mt-3" class:input-error="{form?.emailMissing}" value="{form?.email ?? ''}" />
                <input type="password" name="password" placeholder="Password" class="input mt-3"class:input-error="{form?.passwordError}"  />
                <input type="password" name="password2" placeholder="Confirm password" class="input mt-3" class:input-error="{form?.password2Error}" />
                <button type="submit" formaction="?/register" class="btn variant-filled-primary mt-8">Register</button>
            {/if}
        </form>
    </div>
</div>

