let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('task');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const priorityInput = document.getElementById('priority');
const addTaskButton = document.getElementById('add-task');
const taskListContainer = document.getElementById('task-list');
const showAllButton = document.getElementById('show-all');
const showCompletedButton = document.getElementById('show-completed');
const showPendingButton = document.getElementById('show-pending');


addTaskButton.addEventListener('click', addTask);

showAllButton.addEventListener('click', () => displayTasks(taskList));
showCompletedButton.addEventListener('click', () => displayTasks(taskList.filter(task => task.completed)));
showPendingButton.addEventListener('click', () => displayTasks(taskList.filter(task => !task.completed)));

// Görev ekleme fonksiyonu
function addTask() {
    const taskText = taskInput.value.trim();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const priority = priorityInput.value;

    if (taskText === '') {
        alert('Görev adı boş olamaz!');
        return;
    }

    const newTask = {
        text: taskText,
        startDate: startDate,
        endDate: endDate,
        priority: priority,
        completed: false
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));

    taskInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
    priorityInput.value = 'Low';

    displayTasks(taskList);
}

// Görevleri listeleme fonksiyonu
function displayTasks(tasks) {
    taskListContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        
        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');
        
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        if (task.completed) taskText.classList.add('completed');
        taskText.textContent = task.text;

        const taskDates = document.createElement('span');
        taskDates.classList.add('task-dates');
        taskDates.textContent = `Başlangıç: ${task.startDate} | Bitiş: ${task.endDate}`;

        const taskPriority = document.createElement('span');
        taskPriority.classList.add('priority');
        taskPriority.textContent = `Öncelik: ${task.priority}`;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        
        const completedButton = document.createElement('button');
        completedButton.classList.add('completed-btn');
        completedButton.textContent = task.completed ? 'Yapıldı' : 'Tamamla';
        completedButton.addEventListener('click', () => toggleCompletion(index));
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Sil';
        deleteButton.addEventListener('click', () => deleteTask(index));

        buttonsContainer.appendChild(completedButton);
        buttonsContainer.appendChild(deleteButton);

        taskContent.appendChild(taskText);
        taskContent.appendChild(taskDates);
        taskContent.appendChild(taskPriority);
        
        taskElement.appendChild(taskContent);
        taskElement.appendChild(buttonsContainer);

        taskListContainer.appendChild(taskElement);
    });
}

// Tamamlanan görevleri işaretle
function toggleCompletion(index) {
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Görev silme fonksiyonu
function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Sayfa yüklendiğinde görevleri görüntüle
document.addEventListener('DOMContentLoaded', () => {
    displayTasks(taskList);
});
