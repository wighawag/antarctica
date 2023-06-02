<script lang="ts">
    import type { PageData } from './$houdini';
    export let data: PageData;
    
    $: ({ GetTransactions } = data);
    
    </script>
    
    <h1 class="is-size-1">Blocks</h1>
    
    {#if !$GetTransactions.data || $GetTransactions.fetching}
        Fetching...
    {:else}
    <table class="table">
        <thead>
            <tr>
                <th>Hash</th>
                <th>Block Hash</th>
                <th>From</th>
            </tr>
        </thead>
        <tbody>
        {#each $GetTransactions.data.transactions as transaction}
        <tr>
            
            <td><a href={`/tx/${transaction.hash}`}>{transaction.hash}</a></td>
            <td><a href={`/block/${transaction.block_hash}`}>{transaction.block_hash}</a></td>
            <td>{transaction.from}</td>
        </tr>
        {/each}
    </tbody>
    </table>
    {/if}