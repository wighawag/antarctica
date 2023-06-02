<script lang="ts">
import type { PageData } from '../$houdini';
export let data: PageData;
    
$: ({ GetBlock } = data)

$: block = $GetBlock.data?.block || $GetBlock.data?.blockByNumber

$: previous = block && block.number - 1;
$: next = block && block.number + 1;
</script>

<p>
Hash: {block?.hash}
</p>

<p>
Number: {block?.number}
</p>


{#if previous}
<p>
    <a href={`/block/${previous}`}>previous</a>
</p>
{/if}

<p>
    <a href={`/block/${next}`}>next</a>
</p>
