<template>
  <div>
    <!-- Create Kanban -->
    <div id="createTodo" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add New</h4>
          </div>
          <div class="modal-body">
            <span class="input-label">Title</span>
            <input type="text" v-model="create.title">
            <span class="input-label">Description</span>
            <textarea name="name" v-model="create.content"></textarea>
            <span class="input-label">Points</span>
            <input type="number" v-model="create.points">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addNew" data-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Kanban -->
    <div id="editKanban" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit Kanban</h4>
          </div>
          <div class="modal-body">
            <span class="input-label">Title</span>
            <input type="text" v-model="edit.title">
            <span class="input-label">Description</span>
            <textarea name="name" v-model="edit.content"></textarea>
            <span class="input-label">Points</span>
            <input type="number" v-model="edit.points">
            <span class="input-label">Status</span>
            <span v-if="edit.status == 'todo'" class="status-content" style="color:#B69DC6;">Todo</span>
            <span v-else-if="edit.status == 'doing'" class="status-content" style="color:#8FE0E4;">Doing</span>
            <span v-else-if="edit.status == 'done'" class="status-content" style="color:#D4F9A5;">Done</span>
            <span class="input-label">Change Status</span>
            <div class="status-group-button">
              <button type="button" style="background-color:#B69DC6;" @click="changeStatus('todo')">Todo</button>
              <button type="button" style="background-color:#8FE0E4;" @click="changeStatus('doing')">Doing</button>
              <button type="button" style="background-color:#D4F9A5;" @click="changeStatus('done')">Done</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="deleteTask" class="btn btn-danger" data-dismiss="modal">Delete</button>
            <button type="button" @click="editTask" class="btn btn-primary" data-dismiss="modal">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default{
  props:["editModalData"],
  data:function(){
    return{
      create:{
        title:null,
        content:null,
        points:0
      },
      edit:{
        key:null,
        title:null,
        content:null,
        points:null,
        status:null
      }
    }
  },
  watch:{
    editModalData(){
      this.edit=this.editModalData;
    }
  },
  methods:{
    addNew(){
      this.$database.ref().push({
        title:this.create.title,
        content:this.create.content,
        points:this.create.points,
        status:"todo"
      });
    },
    changeStatus(status){
      this.$database.ref(`${this.edit.key}`).update({status:status});
      this.edit.status=status;
    },
    editTask(){
      this.$database.ref(`${this.edit.key}`).update({
        title:this.edit.title,
        content:this.edit.content,
        points:this.edit.points
      });
    },
    deleteTask(){
      this.$database.ref(`${this.edit.key}`).remove().then(function(){
        console.log("Success!");
      }).catch(function(error){
        console.log(`Error! ${error.message}`);
      });
    }
  }
}
</script>
<style lang="scss">
.input-label {
  display: block;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: "Roboto",sans-serif;
}
@mixin input {
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  font-family: "Roboto",sans-serif;
}
input[type="text"] {
  width: 100%;
  @include input;
}
input[type="number"] {
  width: 75px;
  @include input;
}
textarea {
  width: 100%;
  resize: none;
  height: 100px;
  line-height: 25px;
  @include input;
}
.status-content {
  font-size: 16px;
  font-weight: bold;
  font-family: "Roboto",sans-serif;
}
.status-group-button {
  overflow: hidden;
  border-radius: 10px;
  display: inline-block;
  button {
    color: #FFF;
    float: left;
    height: 40px;
    width: 100px;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: "Roboto",sans-serif;
  }
}
</style>
