# Angular Material TabGroup Gesture

This library provide a simple directive to enable gesture behaviors for the MatTabGroup component on top of @angular/material library.

####Gesture features :

- Scroll tab header with your finger IF there are too much tabs to show it all on your screen
- Swipe between tabs by swiping the tab content from left to right (or right to left)

## Getting started

Install the library from `npm`

`npm i --save @aloysius-software-factory/mat-tab-nav-gesture`

Next, import the MatTabGroupGestureModule in your app's module

<b>app.module.ts</b>

```ts
import { MatTabNavGestureModule } from 'mat-tab-group-gesture';
...
@NgModule({
  ...
  imports: [
    ...
    MatTabNavGestureModule,
  ],
  ...
})
export class AppModule { }
```

After that, you will be able to add gesture directive to mat-tab-group :

```html
<mat-tab-group matTabNavGesture [swipeLimitWidth]="80"> ... </mat-tab-group>
```

## API Documentation

#### MatTabGroupGesture

Directive responsible for managing gesture behaviors

Selector: `matTabNavGesture`

#### Properties

| Name            | Default value | Description                                                              |
| --------------- | ------------- | ------------------------------------------------------------------------ |
| swipeLimitWidth | 80            | The minimum length of the "swipe" gesture to trigger the tabs navigation |
