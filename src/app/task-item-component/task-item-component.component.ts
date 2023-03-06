import { Component , Input} from '@angular/core';
import { Interface_tasks } from '../models/Interface_tasks'

@Component({
  selector: 'app-task-item-component',
  templateUrl: './task-item-component.component.html',
  styleUrls: ['./task-item-component.component.scss']
})
export class TaskItemComponentComponent {
  @Input() item!: Interface_tasks;

  priority1:boolean=false;
  priority2:boolean=false;
  priority3:boolean=false;

}
