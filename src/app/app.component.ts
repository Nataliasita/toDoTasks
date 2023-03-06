import { Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Interface_tasks } from './models/Interface_tasks'
import { TaskServiceService } from './services/task-service.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  activateFormTask: boolean = false;
  activeBtnsItems: boolean = true;
  position:any;
  newTask: boolean = true;
  updateTask: boolean = false;
  formTask!:FormGroup;
  tasks!: Interface_tasks[];

  constructor(private taskServiceService:TaskServiceService,
              private fb: FormBuilder ){}

  ngOnInit(): void {
    this.taskServiceService.getTaks$().subscribe(allTask =>{
      this.tasks = allTask;
    })
    this.initForm();
  }

  initForm(){
    this.formTask = this.fb.group({
      id:'',
      name:['', [
        Validators.required,
        Validators.minLength(4),
      ],],
      description:['', [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
      categories:[''],
      date_end:[''],
      status:[false],
    });
  }
  

  onAddTask(){
    this.activateFormTask = true;
  }

  onCancelTask(){
    this.activateFormTask = false;
    this.formTask.reset();
    this.newTask = true;
    this.updateTask = false;
  }

  OntaskActive(){
    this.taskServiceService.addNewTask(this.formTask.value);
    this.onCancelTask();
  }

  editTaks(id:any, data:Interface_tasks){
    this.position = id;
    this.newTask = false;
    this.updateTask = true;
    this.activateFormTask = true;

    this.formTask.setValue({
      id:data.id,
      name:data.name,
      description:data.description,
      categories:data.categories,
      date_end:data.date_end,
      status:data.status,
    })
  }

  OntaskUpdate(){
    this.taskServiceService.updateTask(this.formTask.value, this.position);
    this.onCancelTask();
    
  }

  deleteTaks(id:any)
  { 
    this.taskServiceService.deleteTask(id);
    this.onCancelTask();
  }

  onSearchTask(tasksSearch:string){
    const dataEnter = tasksSearch.trim().toLowerCase();

    if(dataEnter.length > 1){
      let mySearch = this.tasks.filter((x) => x.name == dataEnter ) 
      this.tasks = mySearch;
    }
    if(dataEnter == ''){
      this.tasks = this.taskServiceService.getTasksByWord();
    }
  }

  onChangepriority(dat:any) {
    const filterSelect = dat;
    
    if (filterSelect !== 'default') {
      this.tasks = this.taskServiceService.getTasksByWord();
      for (let i = 0; i < this.tasks.length; i++){
        if(this.tasks[i].categories == filterSelect){
          
          let selectFil= this.tasks.filter(x => x.categories == filterSelect);
          this.tasks= selectFil;
        }
    }
    }else{
      this.tasks=[];
    }
    if (filterSelect === 'default') {
        this.tasks = this.taskServiceService.getTasksByWord();
    }
    
  }

  taksComplete(event:any){
    console.log(event.checked,'event')
    let valueSelect = event.checked;
    if(valueSelect == true){
      this.activeBtnsItems = false;
    }else{
      this.activeBtnsItems = true;
    }
    
  }

  

  
}
