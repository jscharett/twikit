import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    const appService: AppService = jasmine.createSpyObj('AppService', {
      upload: {
        subscribe: jasmine.createSpy('subscribe')
      }
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: AppService,
        useValue: appService
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
});

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set fileToUpload when change event fired with file', () => {
    component.onFileChange({
      target: {
        files: [1]
      } as any
    } as Event);

    expect(component.fileToUpload).toBe(1);
  });

  it('should NOT set fileToUpload when change event fired without file', () => {
    component.onFileChange({
      target: {
        files: []
      } as any
    } as Event);

    expect(component.fileToUpload).toBeUndefined();
  });

  it('should call appSerive and get data', inject([AppService], (service: AppService) => {
    const response = [['1', '2', '3'], [1, 2, 3]];
    (<jasmine.Spy>service.upload).and.returnValue({
      subscribe: (s, e, c) => {
        s(response);
        c();
      }
    });

    component.fileToUpload = 3;
    component.onSubmit();

    expect(service.upload).toHaveBeenCalledWith(3);
    expect(component.currentFile).toBe(3);
    expect(component.errorMessage).toBeUndefined();
    expect(component.data).toEqual(response);
    expect(component.fileToUpload).toBeUndefined();
  }));

  it('should call appSerive and get error', inject([AppService], (service: AppService) => {
    const err = new Error('test');
    (<jasmine.Spy>service.upload).and.returnValue({
      subscribe: (s, e, c) => {
        e(err);
        c();
      }
    });
    spyOn(console, 'error');

    component.fileToUpload = 3;
    component.onSubmit();

    expect(service.upload).toHaveBeenCalledWith(3);
    expect(component.currentFile).toBeUndefined();
    expect(component.errorMessage).toBe('An error has occurred! Please check the console for more details.');
    expect(console.error).toHaveBeenCalledWith(err);
    expect(component.fileToUpload).toBeUndefined();
  }));
});
