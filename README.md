Adatbázis: Mongodb Atlas, bejelentkezési url biztosítva van a server mappa index.ts fájljában

Telepítés:
- kicsomagolás
- VS Code-ban Open folder -> PRF-main (a belső)
- (VS Code-on belül) új terminalban cd server
- npm install -> npm run build -> npm run start
- új terminalban cd client/my-first-project
- npm install -> npm run build -> npm run start

Használati útmutató:
- a program funkcióinak egy része használható frissen regisztrált felhasználóval, de alapértelmezetten ezek 'guest' szereppel rendelkeznek
- az admin funkciók az "admin" url beírásával érhetők el, ezek szándékosan el vannak rejtve a vendégek elől
- ezután megjelenik a navigációs sávban egy "Admin tools" menüpont, innen elérhetőek az admin jogosultsághoz kötött műveletek (pl. a CRUD)
- admin belépés: admin@admin.com, adminpw
- minden admin funkcióhoz jogosultság szükséges, ezek le vannak kezelve szerver- és kliensoldalon is
