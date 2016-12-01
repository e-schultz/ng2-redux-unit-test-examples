import { HelloComponent } from './hello.component';
import { NgRedux } from 'ng2-redux';
import { TestBed, async } from '@angular/core/testing';
let defaultReducer = (state, action) => state;

let provideRedux = (state, reducer = defaultReducer) => {
  let store = new NgRedux();
  store.configureStore(reducer, state);
  return store;
};

describe('the hello component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelloComponent,
      ],
    });
  });

  /*
    Tests without needing TestBed 
  */

  it('should display the message from the state', () => {
    provideRedux({ message: 'Yup' });
    let component = new HelloComponent();
    component.message$.subscribe(message => {
      expect(message).toEqual('Yup');
    });

  });

  it('should add the values of x and y from the state', () => {
    provideRedux({ message: 'Yup', x: 1, y: 2 });
    let component = new HelloComponent();
    component.ngOnInit();
    expect(component.xy).toEqual(3);
  });

  /*
    Tests using test-bed 
  */
  it('should render title in a h1 tag', async(() => {
    provideRedux({ message: 'Yup', x: 1, y: 2 });
    let fixture = TestBed.createComponent(HelloComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Yup');
    expect(compiled.querySelectorAll('li')[0].textContent).toContain('x - 1');
    expect(compiled.querySelectorAll('li')[1].textContent).toContain('y - 2');
    expect(compiled.querySelectorAll('li')[2].textContent).toContain('xy - 3');

  }));
});
