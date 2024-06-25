# Navigation in einer React App

Nachdem ich in part 1 dieses Tutorials eine React App als Static Web App (SWA) eingerichtet und in part 2 die grundlegende Struktur eingerichtet habe, möchte ich nun etwas zur Navigation in einer React App schreiben. Ich finde diesen Teil, für das, was ich machen möchte, recht wichtig, denn mir ist in einem privaten Projekt aufgefallen, dass die Navigation icht ganz so einfach funktioniert, wie gedacht.

## Static Web App unter Azure

Das angesprochene private Projekt wurde ine Zeit lang als GitHub Page gehostet. Der Umzug nach Azure führte zu einem negativen Seiteneffekt, der sehr schnell gelöst werden konnte. Nur leider war die Dokumenatation nicht so, dass ich sie verstanden habe.
Das Probelm ist, dass einen Static Web App mit React im Grunde eine dynamische Seite ist und ein sogenannter Deep Link, also ein Link, mit einem Pfad führt im Grunde ins Leere, da es die eigentliche Seite ja gar nicht richtig gibt. Okay, jetzt klinge ich genauso kompliziert, wie die SWA Doku. Ich mache es einfacher.

Stell dir vor, du hast eine Webseite, die unter der Domain https://myPage.org zu finden ist. Diese Seite hat ein Home, ein Impressum und einen GDPR Hinweis. Das sind im Grunde drei Seiten, die über die jeweilige Domain https://myPage.org mit den Pfaden /home, /imprint und /gdpr besucht werden kann. Unter React werden die Seiten meistens als Komponente angelegt und später in der App über einen 'Router' aufgerufen.

Hier ein Beispiel:

```
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Imprint from '../pages/Imprint';
import GDPR from '../pages/GDPR';


function Pages() {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Home" exact element={<Home />} />
            <Route path="/Imprint" exact element={<Imprint />} />
            <Route path="/GDPR" exact element={<GDPR />} />
        </Routes>
    )
}

export default Pages;
```

Diese 'Pages' Komponente ist in der App registriert und läd die jeweile Komponente, je nach aufgerufener Route. Zu dumm nur, dass die generierte App nichts von diesen Routen weiß, der zu Grunde liegende Webserver auch nicht und HTML Seiten gibt es ebenfalls nicht. Das führt dazu, dass diese Deep Links /home, /imprint und /gdpr zu einer 404 Seite führen.

Gelöst wird dies in einer SWA super einfach, indem in das root Verzeichnis der App eine Datei mit dem Namen 'staticwebapp.config.json' gelegt wird und dort der Eintrag:

```
    "navigationFallback": {
        "rewrite": "/index.html"
    }
```

eingefügt wird. Nun sind alle Routen, die in der Pages Komponente konfiguriert sind, erreichbar.
Ich finde das super einfach, im Vergleich, was bei den GitHub Pages nötig war.

Es lohnt sich übrigens die [Dokumentation](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration) zu dieser SWA Config anzuschauen. Es gibt noch viel mehr Möglichkeiten der Konfiguration.

## Navigation der App hinzufügen

Meine Beispielapp wird neben der Seitennavigation auch Sektionen auf der Hauptseite haben, die angesprungen werden können. Das sieht dann im Konzept folgendermaße aus.

Home -> Page (Footer, NavigationBar)
GDPR -> Page (Footer)
Tickets -> Section (NavigationBar)

Die Navigation erfolgt über Links. Diese sind jedoch in ihren Typen unterschiedlich. Einmal, wenn es um die Sektionen geht, dann handelt es sich um einen sogenannten Hashlink, ansonsten sind es klassische Links. Für die App bedeutet das, dass ein weitere Packages benötigt werden. Ich installiere sie mit:

`> npm install --save react-router-dom`
`> npm install --save react-router-hash-link`

Jetzt steht mir die BrowserRouter Komponente von React zur Verfügung. Diese Komponente benötige ich in meiner Pages und der App Komponente. Die App Komponente erweitere ich um diesen BrowserRouter wie folgt:

```
...
import { BrowserRouter as Router } from 'react-router-dom';
...

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Hero />
        <Tickets />
        <Footer />
      </Router>
    </>
  );
}

```

Bitte übernimm siede Änderungen noch nicht, ich bin mit der App.js Datei noch nicht fertig. Denn noch sind NavigationBar, Hero, Tickets und Footer hier enthalten. Die Komponenten sortiere ich noch um, sodass eine bessere Struktur entsteht.

Der Router übernimmt nun die Aufgabe, den Pfad in der URL oder den HashLink zu verstehen, um dann das korrekte Routung zu machen.

### Seitennavigation

Ersteinmal richte ich mir meine Seitennavigation ein. Das bedeutet, dass im Footer zwei Links zu Unterseiten führen und bei den Unterseiten möchte ich, dass im Menü zur Hauptseite zurücknavigiert werden kann.

Footer -> Imprint
Footer -> GDPR
Imprint -> Home
GDPR -> Home

(Hinweis. Ich habe tailwindcss zum Projekt hinzugefügt, damit ich auf einfachem Weg Styling betreiben kann. :D

Hier findest du die Anleitung, die ich ausgeführt habe: [css mit tailwind](https://tailwindcss.com/docs/guides/create-react-app))

Wie oben schon im Beispiel zu sehen, lege ich mir eine Pages Komponente an, um die Routen für die Unterseiten zu verwalten.

```
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Imprint from '../pages/Imprint';
import GDPR from '../pages/GDPR';


function Pages() {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Home" exact element={<Home />} />
            <Route path="/Imprint" exact element={<Imprint />} />
            <Route path="/GDPR" exact element={<GDPR />} />
        </Routes>
    )
}

export default Pages;
```

Du siehst, hier wird eine Home Page aufgerufen, wenn jemand die Webseite oder die den /Home Pfad aufruft. Diese Home Page übernimmt nun die Aufgabe der App Komponente und sieht so aus:

```
import Hero from "../components/Hero";
import NavigationBar from "../components/NavigationBar";
import Tickets from "../components/Tickets";

function Home() {
    return (
        <>
            <NavigationBar />
            <Hero />
            <Tickets />
        </>
    );
}

export default Home;
```

Und die App Komponente sieht nun so aus:

```
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Pages from './components/Pages';

function App() {
  return (
    <>
      <Router>
        <Pages />
        <Footer />
      </Router>
    </>
  );
}

export default App;
```

In der App werden nun Pages und der Footer angezeigt. Die Pages können Home, GDPR oder Imprint sein.

### Hashnavigation

Wenn ich nur auf einer Seite zwischen den Sektionen navigieren möchte, richte ich mir eine Hashnavigation ein, die auf Elemente mit einer passenden ID verweist. Das sind für die Home Page in der Navigation die Menüitems Home und Tickets.

In der NavigationBar habe ich ein div-Tag mit der ID '#top'. Darauf verweise ich mit einem HashLink:

```
<HashLink smooth to="#top">
    <div id="mnu-home" className="...">
        Home
    </div>
</HashLink>
```

Dank des BrowserRouter weiß die App nun, dass ich auf der gleichen Seite zum element 'top' navigieren möchte und das smooth. ;) Das gleiche mache ich für die Ticket Sektion.

```
<HashLink id="mnu-tickets" smooth to="#tickets" className="...">
    Tickets
</HashLink>
```

Die ID zu dieser Sektion ist natürlich in der Tickets Komponente.

```
...
    <section id="tickets" className="bg-gray-300">
...
```

Was aber nicht funktioniert, ist dass in den Pages die gleiche NavigationBar, wie in der Home Page verwendet wird. Der Grund ist einfach. Die HashLinks funktionieren nicht seitenübergreifend, daher brauche ich für die Pages eine eigene NavigationBar. Dafür habe ich mir eine Kopie von NavigationBar als PageNavigationBar angelegt und den HashLink zur Home Page in einen Link umgewandelt sowie den Ticket Item aus der NavigationBar gelöscht.

Als Finale füge ich die PageNavigationBar in meine Pages ein.

```
Imprint.js:

import PageNavigationBar from "../components/PageNavigationBar";

function Imprint() {
    return (
        <>
            <PageNavigationBar />
            ...


GDPR.js:
import PageNavigationBar from "../components/PageNavigationBar";

function GDPR() {
    return (
        <>
            <PageNavigationBar />
            ...
```

Ich hoffe dir hat dieses Tutorial gefallen. Im nächsten und letzten Teil geht es um die Anbindung einer API meiner Static Web App.
