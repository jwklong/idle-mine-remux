<script>
    export let full = false;
    export let disabled = false;
</script>

<button on:click on:dblclick on:mouseenter on:mouseleave {disabled}
class:w-full={full}
class="btn"><slot/></button>