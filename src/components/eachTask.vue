<template>
  <li>
    <span class="title">{{task.title}}</span>
    <span v-if="task.content.length > 100" class="desc-preview">{{task.content.substring(0,100)}}...</span>
    <span v-else class="desc-preview">{{task.content}}</span>
    <span class="points">Points : {{task.points}}</span>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editKanban" @click="emitEditTask">Edit</button>
  </li>
</template>
<script type="text/javascript">
export default{
  props:["task"],
  methods:{
    emitEditTask(){
      this.$emit("taskdata",this.task);
    }
  }
}
</script>
<style lang="scss">
li {
  list-style: none;
  span {
    color: #FFF;
    display: block;
    font-family: "Roboto",sans-serif;
  }
  button {
    margin-bottom: 10px !important;
  }
  .title {
    font-size: 25px;
    margin-top: 10px;
    font-weight: bold;
  }
  .desc-preview {
    font-size: 20px;
    font-weight: 300;
  }
  .points {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 10px;
  }
}
</style>
