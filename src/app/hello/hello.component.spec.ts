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

  it('should respond to changes', () => {
    let reducer = (state, action) => {
      switch (action.type) {
        case 'SET_X':
          return Object.assign({}, state, { x: action.payload });
        case 'SET_Y':
          return Object.assign({}, state, { y: action.payload });
        default:
          return state;
      }
    };

    let store = provideRedux({ message: 'Yup', x: 1, y: 2 }, reducer);
    let fixture = TestBed.createComponent(HelloComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li')[0].textContent).toContain('x - 1');
    expect(compiled.querySelectorAll('li')[1].textContent).toContain('y - 2');
    expect(compiled.querySelectorAll('li')[2].textContent).toContain('xy - 3');

    store.dispatch({ type: 'SET_X', payload: 2 });
    store.dispatch({ type: 'SET_Y', payload: 3 });

    fixture.detectChanges();

    expect(compiled.querySelectorAll('li')[0].textContent).toContain('x - 2');
    expect(compiled.querySelectorAll('li')[1].textContent).toContain('y - 3');
    expect(compiled.querySelectorAll('li')[2].textContent).toContain('xy - 5');
  });
});
