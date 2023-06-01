<script lang="ts"> 
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<h1 class="is-size-1">Transactions</h1>

<table class="table">
    <thead>
        <tr>
            <th>Hash</th>
            <th>block number</th>
        </tr>
    </thead>
    <tbody>
        {#each data.transactions as transaction}
            <tr>
                <td>{transaction.hash}</td>
                <td>{transaction.block_number}</td>
            </tr>
        {/each}
    </tbody>
</table>
