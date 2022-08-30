import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  clients: Client[] = [];
  constructor(
    public postService: ClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Client[])=>{
      this.clients = data;
    })  
  }

  viewClient(id:number){
    this.router.navigateByUrl('client/' + id + '/view');
  }

  editClient(id:number){
    this.router.navigateByUrl('client/' + id + '/edit');
  }

  deleteClient(id:number){
    this.postService.delete(id).subscribe(res => {
         this.clients = this.clients.filter(item => item.client_id !== id);
         console.log('Post deleted successfully!');
    })
  }

}
