<template>
  <div class="holder">
    <b-button size="sm" class="btn btn-success" @click="editTask(data)">Create New Task</b-button>
    <div class="new-task-container" v-if="createTask == true">
      <NewTaskPane
        class="new-task-pane"
        v-bind:task="currentTask"
        @submitted="onTaskSubmitted"
        @cancelled="onTaskCancelled"
      />
    </div>

    <div class="task-list-columns-panel">
      <div class="task-list-column">
        <h3>Open Tasks:</h3>
        <ul class="incomplete-task-list">
          <li
            v-for="(data) in incompleteTasks"
            :key="data.taskName"
            :class="{'warning-yellow': new Date(data.taskDueDate) < new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 5), 'warning-none': new Date(data.taskDueDate) >= new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 5)}"
          >
            <div class="task">
              <input type="checkbox" v-model="data.completed" />
              <div class="task-details">
                <b>{{ data.taskName }}</b>
                {{ data.taskDescription }}
                <br />
                {{ data.taskDueDate }}
              </div>
              <b-button class="btn-success" @click="editTask(data)">Edit</b-button>
              <b-button class="btn-danger" @click="deleteTask(data)">X</b-button>
            </div>
          </li>
        </ul>
      </div>

      <div class="task-list-column right-column">
        <h3>Completed Tasks:</h3>
        <ul class="completed-task-list">
          <li v-for="(data) in completedTasks" :key="data.taskName" class="warning-done">
            <div class="task">
              <input type="checkbox" v-model="data.completed" />
              <div class="task-details">
                <b>{{ data.taskName }}</b>
                {{ data.taskDescription }}
                <br />
                {{ data.taskDueDate }}
              </div>
              <b-button class="btn-danger" @click="deleteTask(data)">X</b-button>
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
      currentTask: null,
      tasks: [],
      createTask: false
    };
  },
  components: {
    NewTaskPane
  },
  methods: {
    deleteTask(task) {
      if (confirm("Are you sure you want to delete this task?")) {
        this.removeTaskFromList(task);
      }
    },
    editTask(task) {
      this.currentTask = task;
      this.createTask = true;
    },
    removeTaskFromList(task) {
      this.tasks.filter((value, index) => {
        if (
          value.taskName == task.taskName &&
          value.taskDescription == task.taskDescription
        ) {
          this.tasks.splice(index, 1);
        }
      });
    },
    onTaskSubmitted(newTask) {
      if (this.currentTask != null) {
        this.removeTaskFromList(this.currentTask);
        this.tasks.push(newTask);
      } else {
        this.tasks.push(newTask);
      }
      this.createTask = false;
    },
    onTaskCancelled() {
      this.createTask = false;
    }
  },
  computed: {
    incompleteTasks: function() {
      return this.tasks
        .filter(task => task.completed == false)
        .sort((a, b) => (a.taskDueDate > b.taskDueDate ? 1 : -1));
    },
    completedTasks: function() {
      return this.tasks
        .filter(task => task.completed == true)
        .sort((a, b) => (a.taskDueDate > b.taskDueDate ? 1 : -1));
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
}

.new-task-pane {
  opacity: 1;
  padding: 5px;
  border-radius: 0.3em;
}

.task-list-columns-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  height: 100%;
}

.task-list-column {
  display: flex;
  flex: auto;
  flex-direction: column;
  flex-basis: 1 1 auto;
  margin: 1em;
}

.right-column {
  border-left: 1px solid #cccccc;
}

.task {
  display: flex;
  flex-direction: row;
  flex-basis: 1 1 auto;
  align-items: center;
}

.task-details {
  display: flex;
  flex-direction: column;
  flex: auto;
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
  border-radius: 0.3em;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

h3 {
  width: 100%;
  text-align: center;
}

.container {
  box-shadow: 0px 0px 40px lightgray;
}

.warning-yellow {
  border-color: yellow;
}

.warning-done {
  border-color: lightgreen;
}
</style>