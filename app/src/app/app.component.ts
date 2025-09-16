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
  roleName: string = 'tech-A';
  formsLoaded = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  loadForms() {
    this.http
      .get(`http://localhost:3000/form-group/1?role=${this.roleName}`)
      .subscribe((data: any) => {
        data.forms.forEach((form: any) => {
          this.fieldsByForm[form.formName] = form.fields;
          this.formGroups[form.formName] = this.buildForm(form.fields);
        });

        this.formsLoaded = true;
      });
  }

  buildForm(fields: any[]): FormGroup {
    const group: { [key: string]: any } = {};
    fields.forEach((field) => {
      const disabled = !field.canEdit || !field.canRead;

      group[field.name] = [{ value: field.value || '', disabled }];
    });

    return this.fb.group(group);
  }

  getField(formName: string, fieldName: string): any {
    return this.fieldsByForm[formName]?.find((f) => f.name === fieldName);
  }
}
