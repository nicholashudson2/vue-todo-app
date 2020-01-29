<template>
  <div class="holder">
    <button size="sm" class="btn btn-success" @click="newTask()">Create New Task</button>
    <div class="new-task-container" v-if="createTask == true">
      <NewTaskPane class="new-task-pane" @submitted="onTaskSubmitted" @cancelled="onTaskCancelled" />
    </div>

    <div class="task-list-columns-panel">
      <div class="task-list-column">
        <h3 v-if="incompleteTasks.length >= 1">Open Tasks:</h3>
        <ul class="incomplete-task-list">
          <li v-for="(data) in incompleteTasks" :key="data.taskName">
            <div class="task">
              <input type="checkbox" v-model="data.completed" />
              <div class="task-details">
                <b>{{ data.taskName }}</b>
                {{ data.taskDescription }}
                <br />
                {{ data.taskDueDate }}
              </div>
              <button class="btn-danger" @click="deleteTask(data)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <div class="task-list-column">
        <h3 v-if="completedTasks.length >= 1">Completed Tasks:</h3>
        <ul class="completed-task-list">
          <li v-for="(data) in completedTasks" :key="data.taskName">
            <div class="task">
              <input class="form-check-input" type="checkbox" v-model="data.completed" />
              <div class="task-details">
                <b>{{ data.taskName }}</b>
                {{ data.taskDescription }}
                <br />
                {{ data.taskDueDate }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import NewTaskPane from "./NewTaskPane.vue";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [],
      createTask: false
    };
  },
  components: {
    NewTaskPane
  },
  methods: {
    newTask() {
      this.createTask = true;
    },
    deleteTask(data) {
      this.tasks.filter((value, index) => {
        if (
          value.taskName == data.taskName &&
          (value.taskDescription = data.taskDescription)
        ) {
          this.tasks.splice(index, 1);
        }
      });
    },
    onTaskSubmitted(newTask) {
      this.tasks.push(newTask);
      this.createTask = false;
    },
    onTaskCancelled() {
      this.createTask = false;
    }
  },
  computed: {
    incompleteTasks: function() {
      return this.tasks.filter(task => task.completed == false);
    },
    completedTasks: function() {
      return this.tasks.filter(task => task.completed == true);
    }
  }
};
</script>


<style scoped>
.holder {
  background: #fff;
  height: 100%;
  width: 100%;
  margin: 0;
}

.new-task-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  opacity: 0.9;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
}

.new-task-pane {
  opacity: 1;
}

.task-list-columns-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
}

.task-list-column {
  display: flex;
  flex-direction: column;
  flex-basis: 1 0 auto;
  margin: 0;
}

.task {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
}

.task-details {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

.container {
  box-shadow: 0px 0px 40px lightgray;
}
</style>
