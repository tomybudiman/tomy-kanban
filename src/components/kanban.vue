<template>
  <div class="wrapper">
    <button type="button" class="add-new glyphicon glyphicon-plus" data-toggle="modal" data-target="#createTodo"></button>
    <Modal :editModalData="editModalData"/>
    <div class="row">
      <div class="col-xs-6 col-sm-4 each-category">
        <div class="kanban-header" style="background-color: #B69DC6">
          <span>Todo</span>
        </div>
        <ul class="kanban-content" style="background-color: #C7AAD9">
          <div v-if="todo.length > 0">
            <EachTask @taskdata="setEditModal" v-for="(task,index) in todo" :task="task" :key="index"/>
          </div>
          <div v-else class="empty-task">
            <span>Empty</span>
          </div>
        </ul>
      </div>
      <div class="col-xs-6 col-sm-4 each-category">
        <div class="kanban-header" style="background-color: #8FE0E4">
          <span>Doing</span>
        </div>
        <ul class="kanban-content" style="background-color: #97EFF4">
          <div v-if="doing.length > 0">
            <EachTask @taskdata="setEditModal" v-for="(task,index) in doing" :task="task" :key="index"/>
          </div>
          <div v-else class="empty-task">
            <span>Empty</span>
          </div>
        </ul>
      </div>
      <div class="col-xs-6 col-sm-4 each-category">
        <div class="kanban-header" style="background-color: #D4F9A5">
          <span>Done</span>
        </div>
        <ul class="kanban-content" style="background-color: #E0F6C4">
          <div v-if="done.length > 0">
            <EachTask @taskdata="setEditModal" v-for="(task,index) in done" :task="task" :key="index"/>
          </div>
          <div v-else class="empty-task">
            <span>Empty</span>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "@/components/modal";
import EachTask from "@/components/eachTask";
export default {
  components:{
    Modal,
    EachTask
  },
  data(){
    return{
      todo:[],
      doing:[],
      done:[],
      editModalData:null
    }
  },
  created(){
    this.getAllTask()
  },
  methods:{
    getAllTask(){
      this.$database.ref().on("value",function(snapshot){
        this.todo=[];
        this.doing=[];
        this.done=[];
        snapshot.forEach(function(list){
          const data=list.val();
          data.key=list.key;
          if(data.status == "todo"){
            this.todo.push(data);
          }else if(data.status == "doing"){
            this.doing.push(data);
          }else{
            this.done.push(data);
          }
        }.bind(this));
      }.bind(this));
    },
    setEditModal(payload){
      this.editModalData=payload;
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  margin: auto;
  max-width: 1024px;
  position: relative;
  .add-new {
    right: 0;
    top: 15px;
    padding: 0;
    width: 40px;
    height: 40px;
    outline: none;
    color: #8FE0E4;
    font-size: 15px;
    position: absolute;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
    border: 2px solid #8FE0E4;
    background-color: transparent;
  }
  .row {
    top: 70px;
    margin: 0;
    position: relative;
    .each-category {
      padding: 0;
    }
    .kanban-header {
      text-align: center;
      box-sizing: border-box;
      padding: 10px 20px 10px 20px;
      span {
        color: #FFF;
        font-size: 40px;
        font-weight: bold;
        font-family: "Amatic SC",fantasy;
      }
    }
    .kanban-content {
      padding: 20px;
      margin-bottom: 50px;
      box-sizing: border-box;
      .empty-task {
        text-align: center;
        span {
          color: #FFF;
          font-size: 30px;
          font-weight: bold;
          font-family: "Amatic SC",fantasy;
        }
      }
    }
  }
}
</style>
