import { Constants } from './../infra/constants';
import { AccountService } from './../infra/account.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from './../infra/alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    // Previne quando se tenta entrar no login já logado
    if (this.accountService.userValue) {
      this.router.navigate(['/'.concat(Constants.ALUNOS_LIST)]);
      return;
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        async (data) => {
          this.loading = false;
          await this.router.navigate([Constants.ALUNOS_LIST]);
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  novoUsuario(): Promise<boolean>{
    return this.router.navigate(['/'.concat(Constants.USER_NEW)]);
  }

}
