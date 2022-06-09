import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {

  }

}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos
  message
  // [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Visit Space', false, new Date()),
  //   new Todo(3, 'Learn to Sing', false, new Date())
  // ]

  // todo = {
  //   id : 1,
  //   description : 'Learn to Dance'
  // }

  constructor(
    private todoService:TodoDataService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('hello').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id) {
      console.log(`delete todo ${id}`)
      this.todoService.deleteTodo('hello',id).subscribe(
        response => {
          console.log(response);
          this.message = `Delete of Todo ${id} Successful!`;
          this.refreshTodos();
        }
      );
  }

  updateTodo(id) {
    console.log(`update ${id}`)
    this.router.navigate(['todo',id])
  }

  addTodo() {
    this.router.navigate(['todo',-1])
  }

}
