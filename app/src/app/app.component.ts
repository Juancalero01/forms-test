import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  formGroups: { [formName: string]: FormGroup } = {};
  fieldsByForm: { [formName: string]: any[] } = {};
  roleName: string = 'admin';
  formsLoaded = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loadFormsAndData();
  }

  buildForm(fields: any[]): FormGroup {
    const group: { [key: string]: any } = {};
    fields.forEach((field) => {
      const disabled = !field.canEdit || !field.canRead;

      group[field.name] = [{ value: field.value || null, disabled }];
    });

    return this.fb.group(group);
  }

  getField(formName: string, fieldName: string): any {
    return this.fieldsByForm[formName]?.find((f) => f.name === fieldName);
  }

  saveForm() {
    const formGroup = this.formGroups['support'];
    const changedValues: any = {};

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control?.dirty) changedValues[key] = control.value;
    });

    console.log('Changed Values to Save:', changedValues);
  }

  cancelForm() {
    this.formGroups['support'].reset();
  }

  openBitrixTask() {
    const bitrixUrl = this.formGroups['support'].get('bitrixUrl')?.value;
    window.open(bitrixUrl, '_blank');
  }

  loadFormsAndData() {
    this.http
      .get(`http://localhost:3000/form-group/1?role=${this.roleName}`)
      .pipe(
        switchMap((formConfig: any) => {
          formConfig.forms.forEach((form: any) => {
            this.fieldsByForm[form.formName] = form.fields;
            this.formGroups[form.formName] = this.buildForm(form.fields);
          });
          return this.http.get('../assets/data.json');
        }),
        tap((data: any) => {
          this.formGroups['support']?.patchValue(data);
          this.formsLoaded = true;
        })
      )
      .subscribe({
        next: () => console.log('Formularios y datos cargados exitosamente'),
        error: (err) => console.error('Error en la carga secuencial:', err),
      });
  }
}
