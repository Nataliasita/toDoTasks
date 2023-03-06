import { Injectable, Input } from '@angular/core';
import { Interface_tasks } from '../models/Interface_tasks';
import { Observable , Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  tasks!:Interface_tasks[];
  myTaks!:any;

  allTask$!:Subject<Interface_tasks[]>;

  constructor() {
    this.tasks = [];
    this.allTask$ = new Subject();
  }

  getTaks$(): Observable<Interface_tasks[]>{
    return this.allTask$.asObservable();
  }

  addNewTask( task: Interface_tasks){
    if(!task.id) task.id = this.tasks.length + 1;
    if(!task.categories) task.categories = "Low";
    this.tasks.push(task);
    localStorage.setItem('initTaks', JSON.stringify(this.tasks));
    this.allTask$.next(this.tasks);
  }

  updateTask(data:Interface_tasks, pos:any)
  {
    let editPos = pos;
    for (let i = 0; i < this.tasks.length; i++){
      if(i == editPos){
        this.tasks[i] = data;
        localStorage.setItem('initTaks', JSON.stringify(this.tasks));
      }
    }
  }

  deleteTask(id:any){
    this.tasks = this.tasks.filter((item) => item.id !== id) 
    this.allTask$.next(this.tasks);
  }

  getTasksByWord(){
    const database= JSON.parse(localStorage.getItem("initTaks") || "[]");
    return database;
  }



}
