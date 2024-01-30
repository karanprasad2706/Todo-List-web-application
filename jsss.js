document.addEventListener("DOMContentLoaded", function () {
  // Get the current date and time
  var currentDate = new Date();
  var formattedDate = currentDate.toDateString() + " " + currentDate.toLocaleTimeString();

  // Display the current date and time in the HTML
  document.getElementById("currentDateTime").innerHTML = formattedDate;

  // Function to add a new task
  window.addTask = function () {
    var newTaskInput = document.getElementById("newTask");
    var taskText = newTaskInput.value.trim();

    if (taskText !== "") {
      // Create a new list item
      var li = document.createElement("li");

      // Checkbox
      var checkboxContainer = document.createElement("div");
      checkboxContainer.className = "checkbox-container";
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // Add event listener to the checkbox
      checkbox.addEventListener("change", function () {
        var taskTextElement = li.querySelector("span"); // Find the corresponding span element

        if (checkbox.checked) {
          // If checkbox is checked, apply a style to strike through the task text
          taskTextElement.style.textDecoration = "line-through";
        } else {
          // If checkbox is unchecked, remove the style to revert the strike-through
          taskTextElement.style.textDecoration = "none";
        }

        if (checkbox.checked) {
          // If checkbox is checked, move the task to completed tasks
          moveTaskToCompleted(li);
        } else {
          // If checkbox is unchecked, remove the task from completed tasks
          removeTaskFromCompleted(li);
        }
      });

      checkboxContainer.appendChild(checkbox);
      li.appendChild(checkboxContainer);

      // Task text
      var taskTextElement = document.createElement("span");
      taskTextElement.appendChild(document.createTextNode(taskText));
      li.appendChild(taskTextElement);

      // Delete icon
      var deleteIcon = document.createElement("i");
      deleteIcon.className = "fa fa-trash";
      deleteIcon.onclick = function() { deleteTask(this); };
      li.appendChild(deleteIcon);

      // Append the new list item to the task list
      document.getElementById("taskList").appendChild(li);

      // Clear the input field after adding the task
      newTaskInput.value = "";
    }
  };

  // Function to delete a task
  window.deleteTask = function (element) {
    var taskItem = element.parentNode;
    taskItem.parentNode.removeChild(taskItem);
  };

  // Function to move a task to completed tasks
  function moveTaskToCompleted(taskItem) {
    document.getElementById("completedTaskList").appendChild(taskItem);
  }

  // Function to remove a task from completed tasks
  function removeTaskFromCompleted(taskItem) {
    document.getElementById("taskList").appendChild(taskItem);
  };

  // Function to show/hide completed tasks
  window.toggleCompletedTasks = function () {
    var completedTaskContainer = document.getElementById("completedTaskContainer");
    var toggleButton = document.getElementById("toggleCompletedTasksBtn");

    if (completedTaskContainer.style.display === "none") {
      completedTaskContainer.style.display = "block";
      toggleButton.textContent = "Hide Completed Tasks";
    } else {
      completedTaskContainer.style.display = "none";
      toggleButton.textContent = "Show Completed Tasks";
    }
  };

  // Function to clear all tasks
  window.clearTasks = function () {
    document.getElementById("taskList").innerHTML = "";
    document.getElementById("completedTaskList").innerHTML = "";
  };
});
