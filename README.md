# Movie Seat Booking – React + .NET REST API (Monorepo)

## Köra projektet lokalt

För att testa projektet räcker det att starta backend-API:t och sedan starta frontenden.  
Seed kör automatiskt vid start, så det finns testdata direkt.

## Beskrivning

Det här projektet är en seat booking-applikation där användaren bokar biostolar genom ett stegvis flöde:

**Välj film → välj visning → välj sittplatser → boka**

Utöver bokningsflödet finns en admin-del för att administrera filmer och deras visningar.

Projektet är byggt som ett monorepo (frontend + backend). Endast frontend är publicerad till GitHub Pages.

---

## Funktioner

### Bokningsflöde (User)

- Välja film
- Välja visning (kopplad till vald film)
- Välja sittplatser
  - `occupied` är redan bokade och går inte att klicka
  - lediga stolar kan togglas `selected`/ledig
  - text och totalpris uppdateras dynamiskt (antal säten \* filmpris)
- Boka via formulär:
  - namn + telefon
  - validering i klienten
  - POST till API för att spara bokning

#### Booking Stepper (navigering mellan steg)

Bokningsflödet har en stepper som gör det möjligt att navigera mellan tillgängliga steg, men bara när förutsättningarna för steget är uppfyllda.

- Steg som inte är "upplåsta" går inte att navigera till.
- Detta ger ett kontrollerat flöde utan att användaren kan hoppa förbi krav.

#### Confirmation page (skyddad navigation + state)

Bekräftelsesidan fungerar som en "slutstation":

- Den går inte att navigera till direkt via stepper.
- Den visas endast efter att en bokning har genomförts.

Samtidigt sparas nödvändig information i sessionStorage så att användaren kan:

- uppdatera sidan och ändå vara kvar på confirmation page (utan att tappa vy/state)

För att undvika att känslig information ligger kvar:

- sessionStorage rensas när användaren lämnar confirmation page.

---

### Admin

- CRUD på filmer
- Hantera visningar kopplade till film
  - lägga till visningar
  - ta bort visningar

---

## Teknikstack

- **Frontend:** React
- **Routing:** React Router
- **Server-state:** React Query (`useQuery`, `useMutation`)
- **UI-state:** URL som source of truth + sessionStorage + Context
- **Backend:** .NET REST API
- **Arkitektur backend:** Slice architecture
- **Arkitektur frontend:** Feature-baserad mappstruktur (vertical slices per feature)
- **Deploy:** GitHub Pages (endast frontend)

---

## Viktiga designval (motivering)

### URL som "source of truth"

Jag använder URL:en som sanningskälla för vilket steg användaren är i (vald film/visning osv). Det gör att applikationen känns sammanhängande även när man:

- uppdaterar sidan
- navigerar fram/bak i historiken

### React Query för hämtning & mutationer

Jag använder React Query för att hantera server-state på ett robust sätt:

- caching och refetch vid behov
- tydlig separation mellan server-data och UI-state
- enklare CRUD-flöden i admin via `mutations` + `invalidateQueries`

### sessionStorage + useContext för valda säten

Valda säten (som ännu inte är bokade) lagras i sessionStorage och exponeras via Context. Syftet är att användaren inte tappar sina val om sidan laddas om.

### Booking Stepper för kontrollerad navigering

Jag valde att implementera en stepper för att förbättra UX och göra flödet mer överskådligt. Stegvis navigation är "guarded", vilket innebär att användaren bara kan navigera till steg som är logiskt tillgängliga baserat på tidigare val.

### Confirmation page + sessionStorage med rensning

Confirmation page är medvetet byggd så att den inte kan nås i efterhand via navigation eller direktlänk. Den ska endast synas direkt efter bokning.  
För att ändå stödja refresh (t.ex. om användaren råkar uppdatera sidan) sparas nödvändigt state i sessionStorage. När man lämnar confirmation page rensas sessionStorage, för att minimera risken att känsliga uppgifter blir kvar i sessionen.

### Återanvändbara komponenter + feature-baserad struktur + layouts

Jag har lagt fokus på återanvändbara komponenter och en feature-baserad mappstruktur där varje feature har UI, pages, hooks och api-kod samlat. Jag använder också separata layouts för admin respektive bokningsflödet.

---

## Monorepo-struktur

Projektet är ett monorepo med både frontend och backend.

- **/frontend:** React-app med feature-baserad struktur (features per domän/område, t.ex. booking, admin, movies), där UI, API-koppling och state ligger samlat per feature.
- **/backend:** ASP.NET REST API byggt med slice architecture.

## Loggbok

### Dag 1 – 2026-01-26

- Planerade och bestämde hur flödet ska vara.
- Fixade React Vite boilerplate med React Router och gjorde om startprojektet till React-komponenter.
- Mappstruktur frontend.

### Dag 2 – 2026-01-27

- Skapade REST API (.NET) boilerplate.
- Valde SQLite för att enkelt kunna spara databasen lokalt (fokus på kursen är frontend).
- Backend följer en CQRS-inspirerad request/handler-pipeline (Handle-metod), med validering via decorator/pipeline behaviors.

### Dag 3 – 2026-01-28

- Fortsättning backend.
- Databas-modellering och började med CRUD för Movies.

### Dag 4 – 2026-01-29

- Fortsättning backend.
- Klar med CRUD för Movies.

### Dag 5 – 2026-01-30

- Fortsättning backend.
- Eftersom jag har visningar (screenings) känns det naturligt att ha priset där, men jag följer krav-specen och har `price` på `Movie`.

### Dag 6 – 2026-02-02

- Börjat med fetch för filmer och visningar.
- Gjorde det först med hjälp av Context för att låta komponenter dela på state utan propdrilling.
- Har en BookingContext som omsluter hela bokningsflödet.
- Vid hämtning mappar jag movies till `Movie`-objekt (klass), enligt kravspecen.

### Dag 7 – 2026-02-03

- Kompletterade backend med fler endpoints.
- Nu även för screening och seats som jag fortsatt hämtar med hjälp av BookingContext.

### Dag 8 – 2026-02-04

- Lade till BookingStepper.
- Började med att skapa breadcrumbs men tyckte att det inte passade applikationen.
- Tyckte att det var mer användarvänligt att kunna se flödet och var i processen man befinner sig.

### Dag 9 – 2026-02-05

- Nästan helt frångått Context då jag vill göra flödet stabilt (det går säkert, men jag tyckte det var svårt).
- För hämtningar kör jag nu React Query (`useQuery`) och låter URL vara source of truth.
- När användaren laddar om sidan hämtas alltid det som behövs till aktuell sida, med hjälp av `movieId` eller `screeningId`.

### Dag 10 – 2026-02-06

- Bokningsflödet är klart.
- Lade till validering i checkout.
- Har börjat med admin.
- Skapade en admin-feature med AdminLayout.
- I layouten hämtar jag filmerna (useQuery) och listar dem till vänster som länkar.
- Länkarna går till `/movies/:movieId` för att fortsatt låta URL vara "sanningen".

### Dag 11 – 2026-02-09

- Klar med CRUD för Movies.
- Mycket fanns redan på plats (hämtning av filmer och alla movie-endpoints).

### Dag 12 – 2026-02-10

- Lade till funktionalitet för att ta bort/lägga till visningar som är kopplade till filmerna.
- Sammanfattade i README.
