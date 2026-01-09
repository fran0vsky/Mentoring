# Style
- Always use inject function to inject dependencies (Never use constructor parameters)

# Architecture

## Service
- must have @Injectable({providedIn: 'root'}) decorator
- file must have .service.ts suffix
- name must have Service suffix
- Must inject HttpClient

### Methods
- name methods like Repository operations: getOne, getAll, addOne, removeOne, updateOne

## Model
- File must have .model.ts suffix
- name must have Model suffix

### Properties
- All properties must be immutable by having readonly scope
- All properties must have type definition

### Method
- Must not contain any methods


## Component
- must have @Component decorator
- must inject services
- avoid life cycle hooks in favor of signals: computed, effect
- always use reactive programming over imperative and never set properties in subscribe callbacks

### Properties
- all properties should be signal based
- when creating signal property from external service that works with Observable - prefer toSignal() helper function


### Template
- avoid iniline styles - always use bootstrap utility classes
- always use control flow like: @if / @for / @switch (Never use *ngIf *ngFor *ngSwitch)
- in case of @if - always use 'as' microsyntax e.g.
```html
@if(data(); as data) {
  <!-- Template here -->
}
```

## Tests
- avoid writing tests