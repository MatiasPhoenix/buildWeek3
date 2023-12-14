import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:2Amadre/src/app/Pages/auth/logout/logout.component.spec.ts
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutComponent);
========
import { UserPageComponent } from './user-page.component';

describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPageComponent);
>>>>>>>> d766331e907b3aa35b27342045ca4ebf90e11ad2:2Amadre/src/app/Pages/user-page/user-page.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
