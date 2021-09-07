const todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function (position) {
        const todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        const totalTodos = this.todos.length;
        let completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        })
    }
};

const handlers = {
    addTodo: function () {
        const addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function (position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function (position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    }
};

const view = {
    displayTodos: function () {
        const todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        todoList.todos.forEach(function (todo, position) {
            const todoLi = document.createElement('li');
            let todoTextWithCompletion = '';

            todoTextWithCompletion = todo.todoText;

            if (todo.completed === true) {
                todoLi.classList.toggle('toggle');
            } else {
            }

            todoLi.id = position;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createToggleButton());
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function () {
        let deleteButton = document.createElement('i');
        deleteButton.className = 'deleteButton far fa-trash-alt';
        return deleteButton;
    },
    createToggleButton: function () {
        let toggleButton = document.createElement('button');
        toggleButton.className = 'toggleButton btn';
        toggleButton.textContent = 'done';
        return toggleButton;
    },
    createChangeButton: function () {
        let createButton = document.createElement('button');
        createButton.className = 'createButton btn';
        createButton.textContent = 'change';
        return createButton;
    },
    createChangeInput: function () {
        let createInput = document.createElement('input');
        createInput.className = 'changeInput';
        return createInput;
    },
    setUpEventListeners: function () {
        const todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            let elementClicked = event.target;

            if (elementClicked.className === 'toggleButton btn') {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'changeInput btn') {
                handlers.changeTodo(parseInt(elementClicked.parentNode.id));
            } else if (elementClicked.className === 'deleteButton far fa-trash-alt') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListeners();