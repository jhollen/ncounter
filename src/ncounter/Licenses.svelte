<div>
    {#each licenses as license}
    <header>
        <h1>{license.name}{#if license.author}&nbsp;by {license.author}{/if}</h1>
        <div>Source: <a href="{license.repository}" target="_blank">{license.repository}</a></div>
    </header>
    <pre>{license.licenseText}</pre>
    {/each}
    {#if !licenses}
    <progress></progress>
    {/if}
</div>
<script>
let licenses = [];

(async () => {
    licenses = await fetch('oss-licenses.json')
                        .then(response => {
                            if(response.ok)
                                return response.json();
                        });
})();
</script>
<style>
header {
    margin-top: 12px;
}

header h1 {
    font-weight: 600;
}

pre {
    margin: 5px;
    padding: 5px;
    white-space: pre-wrap;
    background-color: var(--background-alternate);
    color: var(--text-primary);
    overflow-wrap: break-word;
}
</style>