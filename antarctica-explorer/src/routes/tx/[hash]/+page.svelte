<script lang="ts">
import type { PageData } from './$houdini';
export let data: PageData;
    
$: ({ GetTransaction } = data)
</script>

<p>
Hash: {$GetTransaction.data?.transaction.hash}
</p>

<p>
From: {$GetTransaction.data?.transaction.from}
</p>

<p>
To: {$GetTransaction.data?.transaction.to}
</p>