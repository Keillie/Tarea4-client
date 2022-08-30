import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      //reference: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      customer_email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dpi: new FormControl('', Validators.required)
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
    this.clientService.create(client).subscribe((res:any) => {
      Swal.fire(
        'Exito',
        res.message,
        'success'
      )
         this.router.navigateByUrl('client/index');
    })
  }

}
