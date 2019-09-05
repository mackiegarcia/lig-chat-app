# LigChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#Overview

This is the simple chat Web application.
It is like Messanger in facebook and Direct message in twitter.

#sign-up.psd

##When a user clicks "Sign up / Log in" button
If a user has no account, he can create own account.
And his username and password are recorded in DB.

If a user has own account, he can log in the chat app and transfer to the chat page.

If values in inputs are blank or aren't correct, error messages are shown.

#chat.psd

##When a user clicks "Log out" button
A user can log out and transfer to the sign-up page.

##When a user clicks "send" button
Texts in the input is outputted in the chat contents area.

If the input is blank, no thing happens.

##the chat contents area
All messages are stored in the DB and displayed in the component.
New messages are added at the bottom and the component automatically scrolls down.

If other users have already sent messages, they are recorded in DB and shown with thir name.

And please use Web socket if you can know about it.

#Rules
+ Please have to use either Angular.js or React.js
+ Please create from scrach and without UI tools like Bootstrap, foundation, jQuery UI, Onsen UI, etc...
+ But you can use any libraries like jQuery, Angular, React, etc...
+ Regarding Backend, please use Node.js or PHP.
+ Regarding DB, please use MySQL or MongoDB.

#Evaluation criterion
+ Any tiny difference from the design, even a few pixel difference, may cause a score deduction.
+ The source code is beautiful or not
+ Security measures is comprised or not
+ Modern technologies like follows are used or not
 + Modern JavaScript libraries like Angular or React
 + CSS architecture like OOCSS, SMACSS or BEM
 + Compiler languages like TypeScript, Jade and Sass