<template>
  <div class="holder">
    <b-button size="sm" class="btn btn-success" @click="editTask(null)">Create New Task</b-button>
    <div class="new-task-container" v-if="this.$store.state.createTask == true">
      <NewTaskPane
        class="new-task-pane"
        v-bind:task="this.$store.state.currentTask"
        @submitted="onTaskSubmitted"
        @cancelled="onTaskCancelled"
      />
    </div>

    <div class="task-list-columns-panel">
      <div class="task-list-column">
        <h3>Open Tasks:</h3>
        <ul class="incomplete-task-list">
          <li
            v-for="(incompleteTask) in incompleteTasks"
            :key="incompleteTask.taskName"
            :class="{'warning-yellow': new Date(incompleteTask.taskDueDate) < new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 5), 'warning-none': new Date(incompleteTask.taskDueDate) >= new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 5)}"
          >
            <div class="task">
              <input type="checkbox" v-model="incompleteTask.completed" />
              <div class="task-details">
                <b>{{ incompleteTask.taskName }}</b>
                {{ incompleteTask.taskDescription }}
                <br />
                {{ incompleteTask.taskDueDate }}
              </div>

              <b-button-group class="task-button-panel">
                <b-button class="btn-success" @click="editTask(incompleteTask)">Edit</b-button>
                <b-button class="btn-danger" @click="deleteTask(incompleteTask)">X</b-button>
              </b-button-group>
            </div>
          </li>
        </ul>
      </div>

      <div class="task-list-column right-column">
        <h3>Completed Tasks:</h3>
        <ul class="completed-task-list">
          <li
            v-for="(completedTask) in completedTasks"
            :key="completedTask.taskName"
            class="warning-done"
          >
            <div class="task">
              <input type="checkbox" v-model="completedTask.completed" />
              <div class="task-details">
                <b>{{ completedTask.taskName }}</b>
                {{ completedTask.taskDescription }}
                <br />
                {{ completedTask.taskDueDate }}
              </div>
              <b-button class="btn-danger" @click="deleteTask(completedTask)">X</b-button>
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
    return {};
  },
  components: {
    NewTaskPane
  },
  methods: {
    deleteTask(task) {
      if (confirm("Are you sure you want to delete this task?")) {
        this.$store.commit("removeTask", { task: task });
      }
    },
    editTask(task) {
      this.$store.commit("setCurrentTask", { currentTask: task });
      this.$store.dispatch("beginCreateTask");
    },
    removeTaskFromList(task) {
      this.$store.commit("removeTask", { task: task });
    },
    onTaskSubmitted(newTask) {
      this.$store.dispatch("submitTask", { newTask: newTask });
    },
    onTaskCancelled() {
      this.$store.dispatch("finishCreateTask");
    }
  },
  computed: {
    incompleteTasks: function() {
      return this.$store.state.tasks
        .filter(task => task.completed == false)
        .sort((a, b) => (a.taskDueDate > b.taskDueDate ? 1 : -1));
    },
    completedTasks: function() {
      return this.$store.state.tasks
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
  align-items: unset;
  width: 50%;
}

.right-column {
  border-left: 1px solid #cccccc;
  padding-left: 2em;
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

.task-button-panel {
  justify-content: space-between;
}

.task-button-panel > button {
  margin: 0.3em;
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