<script lang="ts">
    import type { PageData } from './$houdini';
    export let data: PageData;
    
    $: ({ GetBlocksPaginated } = data);
    
    </script>
    
    <h1 class="is-size-1">Blocks</h1>
    
    {#if !$GetBlocksPaginated.data || $GetBlocksPaginated.fetching}
        Fetching...
    {:else}
    <table class="table">
        <thead>
            <tr>
                <th>Number</th>
                <th>Hash</th>
            </tr>
        </thead>
        <tbody>
        {#each $GetBlocksPaginated.data.blocks as block}
        <tr>
            <td>{block.number}</td>
            <td><a href={`/block/${block.hash}`}>{block.hash}</a></td>
        </tr>
        {/each}
    </tbody>
    </table>
    <button on:click={() => GetBlocksPaginated.loadNextPage()}>
        load next
    </button>
    {/if}