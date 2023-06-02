<script lang="ts">
import type { PageData } from '../$houdini';
export let data: PageData;
    
$: ({ GetBlock } = data)

$: block = $GetBlock.data?.block || $GetBlock.data?.blockByNumberWithTransactions

$: transactions = block && "transactions" in block && block.transactions as any[];

$: previous = block && block.number - 1;
$: next = block && block.number + 1;

</script>

<p>
Hash: {block?.hash}
</p>

<p>
Number: {block?.number}
</p>

{#if transactions}
    {#each transactions as transaction}
    <p><a href={`/tx/${transaction.hash}`}>{transaction.hash}</a></p>
    {/each}
{/if}


{#if previous}
<p>
    <a href={`/block/${previous}`}>previous</a>
</p>
{/if}

<p>
    <a href={`/block/${next}`}>next</a>
</p>
