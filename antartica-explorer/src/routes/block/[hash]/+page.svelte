<script lang="ts">
import type { PageData } from '../$houdini';
export let data: PageData;
    
$: ({ GetBlock } = data)
</script>

<p>
Hash: {$GetBlock.data?.block.hash}
</p>

<p>
Number: {$GetBlock.data?.block.number}
</p>