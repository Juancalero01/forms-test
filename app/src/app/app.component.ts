import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  formGroups: { [formName: string]: FormGroup } = {};
  fieldsByForm: { [formName: string]: any[] } = {};
  roleName: string = 'admin';
  formsLoaded = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  loadForms() {
    this.http
      .get(`http://localhost:3000/form-group/1?role=${this.roleName}`)
      .subscribe((data: any) => {
        data.forms.forEach((form: any) => {
          const fields = form.fields.filter((f: any) => f.canRead);
          this.fieldsByForm[form.formName] = fields;
          this.formGroups[form.formName] = this.buildForm(fields);
        });

        this.formsLoaded = true;
      });
  }

  buildForm(fields: any[]): FormGroup {
    const group: { [key: string]: any } = {};
    fields.forEach((field) => {
      group[field.name] = [{ value: '', disabled: !field.canEdit }];
    });
    return this.fb.group(group);
  }

  getField(formName: string, fieldName: string): any {
    return this.fieldsByForm[formName]?.find((f) => f.name === fieldName);
  }
}
