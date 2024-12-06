import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';


@Component({
    selector: 'radio-contact-page',
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.css'],
    standalone: false
})
export class ContactPageComponent {

  form: FormGroup = this.fb.group({
    from_name: '',
    from_correo: '',
    subject: '',
    message: '',
  })

  constructor(private fb: FormBuilder){}

  async sendEmail(){
    emailjs.init('v9Jc6E1WTzypPNxUz');
    let response = await emailjs.send("service_pjz1w01","template_3cvwgrg",{
      from_name: this.form.value.from_name,
      from_correo: this.form.value.from_correo,
      subject: this.form.value.subject,
      message: this.form.value.message,
    });
    alert('Se ha enviado su mensaje.')
    this.form.reset;
  }
}
