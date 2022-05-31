# QR CAFFE - BACKEND

Ovo je back-end porcija projekta, samim tim ovdje se nalaze svi potrebni fajlovi za pokretanje back-enda.

## Tehnologija koristena

Programski jezik koji je koristen za pravljenje ovog projekta jeste primarno JavaScript, tacnije njegov framework po imenu Node.js.

  - [Node.js](https://nodejs.org)
  - [Express.js](https://expressjs.com)
  - [MySQL](https://mysql.com/)
  - [Socket.io](https://socket.io/)
  - [JWT](https://jwt.io/)

## Pokretanje projekta

Projekt se pokrece veoma jednostavno, sve sto trebate uraditi jeste klonirati repository i upisati sljedece komande u terminal: 
  
Prva komanda je: 


  ```npm install```
  
Ona ce da se preuzme sve dependency-e koji su potrebni za pokretanje i razvijanje ovog projekta.

Druga komanda je:

```npm run start```

Ova komanda ce da pokrene Node.js aplikaciju i da je servira na vas lokalni host, ukoliko se automatski ne otvori aplikacija u vasem browseru mozete pronaci istu na linku: 

```http://localhost:1337```

Nakon pokretanja ove aplikacije dobiti ce te error iz razloga sto nemate pokrenutu databazu na vasem lokalnom hostu. Sljedece sto ce te uraditi je uci ce te na lokalni
phpmyadmin link i napraviti ce te novu databazu sa imenom ```qrcaffe``` i u nju ce te importovati ```db.sql``` fajl. Nakon toga resetujte aplikaciju i vas back-end je uspjesno
pokrenut.

## Rute

Kako front-end ima svoje rute tako i back-end mora imati svoje kojih ima znacajno vise:

  - Caffes:
    - (GET) Dobijanje svih kafica: localhost:1337/caffes
    - (GET) Dobijanje specificnog kafica: localhost:1337/caffes/caffe/:caffeId
    - (PUT) Update specificnog kafica: localhost:1337/caffes/caffe
    - (POST) Kreiranje novog kafica: localhost:1337/caffes
    - (DELETE) Brisanje specificnog kafica: localhost:1337/caffes/caffe/:caffeId
  - Login: 
    - (POST) Prijava na admin panel: localhost:1337/login/admin
    - (POST) Prijava na caffe panel: localhost:1337/login/:caffeId 
  - Orders: 
    - (POST) Kreiranje nove narudzbe: localhost:1337/orders
    - (GET) Dobijanje svih narudzba jednog kafica: localhost:1337/orders/statement/:caffeId
    - (GET) Dobijanje svih nezavrsenih narudzbi jednog kafica: localhost:1337/orders/:caffeId
    - (PUT) Promjena statusa iz nezavrsene u zavrsenu narudzbu odredjenog kafica: localhost:1337/orders/:caffeId
    - (GET) Dobijanje imena i ip-a odredjenog kafica: localhost:1337/orders/user/:caffeId

## Napomena:
  Front-end ne moze funkcionisati ukoliko back-end nije upaljen.
