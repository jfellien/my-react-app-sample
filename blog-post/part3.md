# Navigation in a React Static Web App
After setting up a React app as a Static Web App (SWA) in part 1 of this tutorial and setting up the basic structure in part 2, I would like to write about navigation in a React app. I find this part quite important because I noticed in a personal project that navigation with React is not as straightforward as expected.

To follow along with my changes, you will need to clone my [GitHub Repository](https://github.com/jfellien/my-react-app-sample) for this tutorial.

## Static Web App on Azure
The mentioned personal project was hosted as a GitHub Page for a while. Moving to Azure caused a negative side effect that was quickly resolved. Unfortunately, the documentation was not clear enough for me to understand.

The problem is that a Static Web App with React is essentially a dynamic page, and a deep link, which is a link with a path, leads to nowhere because there is no actual HTML page. Okay, now I sound as complicated as the SWA documentation. Let me simplify it.

Imagine you have a website that can be found at the domain https://myPage.org. This website has a home page, an imprint page, and a GDPR notice. These are essentially three pages that can be visited through the respective paths /home, /imprint, and /gdpr on the domain https://myPage.org. In React, these pages are usually created as components and later called through a 'Router' in the app.

Here's an example:

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

This 'Pages' component is registered in the app and loads the respective component based on the requested route. Unfortunately, the generated app doesn't know about these routes, the underlying web server doesn't know either, and there are no HTML pages. This leads to these deep links /home, /imprint, and /gdpr resulting in a 404 page.

This is easily solved in a SWA by placing a file named 'staticwebapp.config.json' in the root directory of the app and adding the following:

    "navigationFallback": {
        "rewrite": "/index.html"
    }

Now all the routes of the app are accessible. I find this much simpler compared to the GitHub Pages solution.

By the way, it's worth checking out the [documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration) for more configuration options for this SWA config.

## Adding App Navigation
In addition to the page navigation, my sample app will have sections on the main page that can be jumped to. Here's how it looks in the concept:

Home -> Page (Footer, NavigationBar)
GDPR -> Page (Footer)
Tickets -> Section (NavigationBar)

The navigation is done through links, but they have different types. When it comes to sections, they are called hash links, otherwise, they are classic links. For the app, this means that additional packages are required. I install them with:

`> npm install --save react-router-dom`
`> npm install --save react-router-hash-link`

Now I have access to the BrowserRouter component from React. I need to use this component in my Pages and App components. I will update the App component as follows:

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

Please do not apply these changes yet, as I am not finished with the App.js file. The NavigationBar, Hero, Tickets, and Footer components are still included here. I will rearrange the components to create a better structure.

The Router now takes care of understanding the path in the URL or the hash link and then routing correctly.

### Page Navigation
First, I will set up the page navigation. This means that in the footer, there will be two links to subpages, and on the subpages, I want the menu to navigate back to the main page.

Footer -> Imprint
Footer -> GDPR
Imprint -> Home
GDPR -> Home

(Note: I have added tailwindcss to the project to easily apply styling. :D
Here is the guide I followed: [css with tailwind](https://tailwindcss.com/docs/guides/create-react-app))

As seen in the example above, I create a Pages component to manage the routes for the subpages.

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

As you can see, a Home page is called when someone visits the website or the /Home path. This Home page now takes over the role of the App component and looks like this:

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

And the App component now looks like this:

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

The App component now displays Pages and the Footer. The Pages can be Home, GDPR, or Imprint.

### Hash Navigation
If I only want to navigate between sections on a single page, I set up a hash navigation that refers to elements with a matching ID. For the Home page, the menu items Home and Tickets are involved.

In the NavigationBar, I have a div tag with the ID '#top'. I refer to it with a HashLink:

<HashLink smooth to="#top">
    <div id="mnu-home" className="...">
        Home
    </div>
</HashLink>

Thanks to the BrowserRouter, the app now knows that I want to navigate to the 'top' element on the same page, and it does it smoothly. ;) I do the same for the Ticket section.

<HashLink id="mnu-tickets" smooth to="#tickets" className="...">
    Tickets
</HashLink>

The ID for this section is, of course, in the Tickets component.

...
    <section id="tickets" className="bg-gray-300">
...

But what doesn't work is using the same NavigationBar in the Pages as in the Home page. The reason is simple. Hash links don't work across pages, so I need a separate NavigationBar for the Pages. For this, I created a copy of NavigationBar called PageNavigationBar and converted the HashLink to the Home page into a Link, and removed the Ticket item from the NavigationBar.

Finally, I add the PageNavigationBar to my Pages.

Imprint.js:

import PageNavigationBar from "../components/PageNavigationBar";

function Imprint() {
    return (
        <>
            <PageNavigationBar />
            ...
}

GDPR.js:

import PageNavigationBar from "../components/PageNavigationBar";

function GDPR() {
    return (
        <>
            <PageNavigationBar />
            ...
}

I hope you enjoyed this tutorial. In the next and final part, I will cover connecting an API to my Static Web App.