import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CaptchaService } from './services/captcha.service';
import {
  CancelResponse,
  CaptchaResponse
} from './services/captcha.service.types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  token: string;
  callbackURL: string;

  constructor(
    private route:ActivatedRoute,
    private captchaService:CaptchaService) {
    this.token = "";
    this.callbackURL = "";
  }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.callbackURL = params.callbackURL;
      this.captchaService.setcallbackURL(this.callbackURL);
    });
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    let response: CaptchaResponse = {status:"success",token:this.token};
    this.captchaService.sendResponse(response).subscribe();
  }

  public cancel():void {
    let response: CancelResponse = {status:"cancel"};
    this.captchaService.sendResponse(response).subscribe({
      next:(response: any) => {
        window.open('','_self',''); window.close();
      }
      
    });
  }

  
  
}
