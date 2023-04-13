<script>
    export let  name;
    export let top;
</script>

<div class="pl-2  text {top??'pt-2'}">{name}</div>

<style>
    .text {
  display: block;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>