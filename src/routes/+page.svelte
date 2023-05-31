<script lang="ts"> 
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<h1 class="is-size-1">Blocks</h1>

<table class="table">
    <thead>
        <tr>
            <th>Number</th>
            <th>Hash</th>
        </tr>
    </thead>
    <tbody>
        {#each data.blocks as block}
            <tr>
                <td>{block.number}</td>
                <td>{block.hash}</td>
            </tr>
        {/each}
    </tbody>
</table>
