# RuleEngine

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.8.<br>
The purpose of `rule-engine` is to create multiple rules and filter out data based on the given filter by the user.<br>
A user can combine multiple subrules by giving the any`(|)` or all`(&)` condition to make a single set of rules.<br>
User will be able to see the rules in the python readable format.

## Functionality of RuleEngine
The first thing is the user has to enter a filter name of their choice and click on `done` button to enable the form.<br>
Once the form is enabled, the next step is to select input, select data type, select condition and enter a valid value.<br>
To save the subrule and create a new row/subrule, a user has to click on add button.<br>
After clicking on add button, the existed subrules will be disabled. If a user wants to make any changes they need to click on `edit` button and click on `update` button to save the changes.<br>
A user can also delete any particular subrule using the `delete` button.<br>
To combine the multiple subrules into a single rule the user can select `any` or `all` condition and click on `add rule` button.<br>
The user will be able to see the single just rule below the form in a python readable format.<br>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
