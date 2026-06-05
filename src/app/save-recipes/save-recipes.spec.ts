import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecipes } from './save-recipes';

describe('SaveRecipes', () => {
  let component: SaveRecipes;
  let fixture: ComponentFixture<SaveRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
