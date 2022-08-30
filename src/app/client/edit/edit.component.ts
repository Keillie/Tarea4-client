import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  client_id!: number;
  client: Client = new Client();
  form!: FormGroup;

  constructor(
    public clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client_id = this.route.snapshot.params['clientId'];
    this.clientService.find(this.client_id).subscribe((data: Client)=>{
      this.client = data;
    }); 
       
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      customer_email: new FormControl('', [Validators.required]),
      //reference: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      address: new FormControl('', Validators.required),
      dpi: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    if (!this.form.valid) {
      return;
    }
    let client: Client = this.form.value;
    this.clientService.update(this.client_id, client).subscribe((res:any) => {         
         this.router.navigateByUrl('client/index');
    })
  }

}
