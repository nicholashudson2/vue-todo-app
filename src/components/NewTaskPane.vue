<template>
  <div class="task-dialog form-group">
    <div class="btn-toolbar mb-1 float-right">
      <b-button class="btn btn-danger fa-window-close-o float-right btn-close" @click="cancel()">X</b-button>
    </div>
    <b-form @submit.stop.prevent="onSubmit" @submit.prevent="onSubmit" class="col-12 input-form">
      <b-form-group id="title-input-group" class="form-group" label="Title" label-for="title-input">
        <b-input
          id="title-input"
          type="text"
          class="row text-input"
          v-model="$v.form.taskName.$model"
          :state="validateState('taskName')"
          aria-describedby="input-1-live-feedback"
        />
        <b-form-invalid-feedback id="input-1-live-feedback">This is a required field.</b-form-invalid-feedback>
        <ul
          class="autocomplete-results"
          v-if="suggestions.length >= 1 && $v.form.taskName.length != 0"
        >
          <li
            class="autocomplete-result"
            v-for="(data, index) in suggestions"
            :key="index"
            @click="setResult(data)"
          >{{ data }}</li>
        </ul>
      </b-form-group>

      <b-form-group
        id="description-input-group"
        class="form-group"
        label="Description"
        label-for="description-input"
      >
        <b-input
          id="description-input"
          type="text"
          class="row text-area"
          v-model="form.taskDescription"
        />
      </b-form-group>

      <b-form-group
        id="date-input-group"
        class="form-group row-md"
        label="Due Date"
        label-for="date-input"
      >
        <b-input
          class="date-select"
          type="date"
          id="due-date-input"
          v-model="form.taskDueDate"
          :state="validateState('taskDueDate')"
          aria-describedby="date-input-live-feedback"
        />
        <b-form-invalid-feedback id="date-input-live-feedback">Due date cannot be in the past.</b-form-invalid-feedback>
      </b-form-group>
    </b-form>
    <div class="btn-toolbar mr-4 float-right">
      <b-button class="btn btn-danger" @click="cancel()">Cancel</b-button>
      <b-button class="btn btn-success" @click="submit()">Submit</b-button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import moment from "moment";

const minDate = date => (date ? moment(date).format('MM/DD/YYYY') >= moment(new Date()).format('MM/DD/YYYY') : true);

export default {
  mixins: [validationMixin],
  name: "NewTaskPane",
  props: {
    task: Object
  },
  data() {
    return {
      form: {
        taskName: this.$props.task ? this.$props.task.taskName : "",
        taskDescription: this.$props.task
          ? this.$props.task.taskDescription
          : "",
        taskDueDate: this.$props.task ? this.$props.task.taskDueDate : "",
        completed: this.$props.task ? this.$props.task.completed : false
      },
      suggestions: [],
      isOpen: false
    };
  },
  methods: {
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      var searchURL =
        "https://www.google.com/complete/search?q=" +
        this.form.taskName +
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
      this.form.taskName = result;
      this.isOpen = false;
      this.suggestions = [];
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.$emit("submitted", {
        taskName: this.form.taskName,
        taskDescription: this.form.taskDescription,
        taskDueDate: moment(this.form.taskDueDate).format("MM/DD/YYYY"),
        completed: this.completed ? this.completed : false
      });
      this.form.taskName = "";
      this.form.taskDescription = "";
    },
    cancel() {
      this.$emit("cancelled", "User cancelled task creation.");
      this.form.taskName = "";
      this.form.taskDescription = "";
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    minDate(date) {
      return date >= new Date();
    }
  },
  validations: {
    form: {
      taskName: {
        required
      },
      taskDueDate: {
        minDate
      }
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
  background-color: darkgray;
  opacity: 1;
  height: 50%;
  width: 50%;
  margin: 0;
}

.text-input,
.text-area,
.date-select {
  width: 100%;
  border: 0;
  border-radius: 0.3em;
  padding: 0.7em;
  font-size: 1.2em;
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

b-button {
  border-radius: 0.3em;
}

.btn-close {
  z-index: 1;
}

.input-form {
  z-index: 0;
}
</style>