<template>
  <div class="task-dialog form-group">
    <div class="btn-toolbar mb-1 float-right">
      <button class="btn btn-danger fa-window-close-o float-right" @click="cancel()">X</button>
    </div>
    <form @submit.prevent="addTask" class="col-15">
      <input
        class="form-group row text-input mb-1"
        type="text"
        placeholder="Title"
        v-model="taskName"
        @input="onChange"
      />
      <ul class="autocomplete-results" v-if="suggestions.length >= 1 && taskName.length != 0">
        <li
          class="autocomplete-result"
          v-for="(data, index) in suggestions"
          :key="index"
          @click="setResult(data)"
        >{{ data }}</li>
      </ul>
      <input
        class="form-group row text-area"
        type="text"
        placeholder="Description"
        v-model="taskDescription"
      />
      <div class="form-group row-md">
        <label for="due-date-input">Due Date</label>
        <br />
        <input
          class="form-control date-select"
          type="date"
          id="due-date-input"
          v-model="taskDueDate"
        />
      </div>
    </form>
    <div class="btn-toolbar mr-4 float-right">
      <button class="btn btn-danger" @click="cancel()">Cancel</button>
      <button class="btn btn-success" @click="submit()">Submit</button>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "NewTaskPane",
  data() {
    return {
      taskName: "",
      taskDescription: "",
      taskDueDate: "",
      suggestions: [],
      isOpen: false
    };
  },
  methods: {
    addTask() {
      var windowConsole = window.console;
      windowConsole.log(this.taskName);
      this.tasks.push({
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDueDate: this.taskDueDate,
        completed: false
      });
      this.taskName = "";
    },
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      var searchURL =
        "https://www.google.com/complete/search?q=" +
        this.taskName +
        "&cp=1&client=psy-ab";
      axios({ method: "GET", url: searchURL }).then(result => {
        this.suggestions = [];
        if (result && result.data && result.data.length) {
          result.data[1].reduce((acc, curr) =>
            this.suggestions.push(
              curr[0].replace("<b>", "").replace("</b>", "")
            )
          );
        } else {
          this.suggestions.push("Unable to load suggestions.");
        }
      });
    },
    setResult(result) {
      this.taskName = result;
      this.isOpen = false;
      this.suggestions = [];
    },
    submit() {
      var windowConsole = window.console;
      windowConsole.log(this.task);
      this.$emit("submitted", {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDueDate: this.taskDueDate,
        completed: false
      });
      this.taskName = "";
      this.taskDescription = "";
    },
    cancel() {
      this.$emit("cancelled", "User cancelled task creation.");
      this.taskName = "";
      this.taskDescription = "";
    }
  }
};
</script>


<style scoped>
form,
input {
  opacity: 1;
  margin: 0;
}

.task-dialog {
  /* position: absolute; */
  background-color: white;
  opacity: 1;
  height: 50%;
  width: 50%;
  margin: 0;
}

.text-input {
  width: 100%;
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #eeeeee;
  color: #323333;
  opacity: 1;
  margin: 0;
}

.text-area {
  width: 100%;
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #eeeeee;
  color: #323333;
  opacity: 1;
  margin: 0;
}

.date-select {
  width: 100%;
  border: 0;
  font-size: 1.3em;
  background-color: #eeeeee;
  color: #323333;
  opacity: 1;
  margin: 0;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  opacity: 1;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  margin: 0;
  cursor: pointer;
  opacity: 1;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
  opacity: 1;
}

.mr-4 > button {
  margin: 5px;
}
</style>