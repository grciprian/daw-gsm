# GsmFrontend

## Description :floppy_disk:

  *GSM* reprezinta un proof of concept pentru o platforma prin care un magazin care repara diverse deviceuri isi poate administra *employees*, *customers* si interactiunea dintre acestia pe baza unor *gadgets* si a unor *contracts*.  

## How To :bulb:

  By default exista un superadmin care se poate autentifica cu username: superadmin si password: 123qweQWE!@#*  
  Superadminul poate adauga angajati, dar ii poate si sterge. Odata ce un angajat a fost adaugat cu anumite credentiale, acesta se poate autentifica.  
  Nu in ultimul rand, clientii se pot inregistra completand singuri un formular.  
  Interactiunea dintre clienti si angajati are loc astfel:  
  -> un client isi poate adauga in portofoliu gadgets  
  -> tot un client poate pentru un gadget sa creeze un contract prin care va spune ce este in neregula cu dispozitivul  
  -> unui angajat i se atribuie contractul respectiv dupa urmatoarea regula: daca niciun angajat nu are contracte, assignarea se va face aleatoriu, altfel se va alege angajatul cu numarul cel mai mic de contracte  
  -> angajatul vede contractul iar cand i se va aduce gadgetul pentru depanare si reparatie va putea seta data de sfarsit si un status pentru contract  
  -> la randul lui, clientul poate urmarii informatiile din contract pentru care data de final si statusul se pot schimba, astfel stiind cand poate sa ridice bunul personal  

## Observations :bell:

! Nu am tratat validari pe frontend; foarte putin in backend !  
O parola valida trebuie sa contina tot felul de tipuri de caractere, astfel ca una valida ar fi 123qweQWE!@#  
Campurile de parola le-am lasat intentionat in clar.
Pentru orice neintelegere, nu evita sa ma contactezi.  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.  

## Some screenshots :camera:

[Imgur](https://i.imgur.com/60OuIeI.png)

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
