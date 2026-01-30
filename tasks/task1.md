1. Setup bootstrap in your project: https://getbootstrap.com/docs/5.3/getting-started/introduction/
2. Provide HttpClient to your application. The best choice is to add provideHttpClient to providers in main.ts.
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import 'zone.js';
import { provideHttpClient } from '@angular/common/http';
bootstrapApplication(AppComponent, { providers: [provideHttpClient()]}).catch((err) =>
  console.error(err)
);
```
&nbsp;
### API
---
```
GET https://catfact.ninja/fact
```
### Requirements
---
```
Given I am under the root route: */*
Then I should see a random cat fact displayed
```
```
Given I am under the root route: */*
When I refresh the page
Then I should see a new random cat fact displayed
```
### Design Specs
---
- Page:
    - Background color
    - Center content vertically
    - Center content horizontally
- Card:
    - Use Bootstrap Card Template
    - Rounded corners
    - Border color
    - Background color
    - Padding
    - Text color
    - Text size and style
### Architecture
---
- Component
- Model
- HttpClient
- No Routing needed
### Preview
---
Try to make it looks exactly like on the screen below:
![Preview](./1-page-1-loaded-1.png "preview")
getbootstrap.com
Get started with Bootstrap
Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.
https://getbootstrap.com/docs/5.3/getting-started/introduction/

