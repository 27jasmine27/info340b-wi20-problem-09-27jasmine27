# Problem: Adoption Routes

In this exercise, you will practice implementing _client-side routing_ using [React Router](https://reacttraining.com/react-router/). Specifically, you will be turning a version of the previous "Pet Adoption" exercise into a single-page application, with separate "pages" for each pet to adopt.

## Running the Program
Because this app is created with React (and scaffolded through [Create React App](https://github.com/facebook/create-react-app)), you will need to install dependencies and run a developer web server in order to transpile and view the application. You can run this server by using the command:

```bash
# from inside the `problem-a/` folder
cd path/to/problem-a

# install dependencies
npm install  # only once

# run the server
npm start
```

You can then view the rendered page _in a web browser_. Remember to check the Developer console for any errors!

## Exercise Instructions
To complete the exercise, edit the included **`src/index.js`**, **`src/App.js`**, and **`src/AdoptPet.js`** files and add in the required code. Note that you should ___not___ need to edit any of the other provided files.

1. In order to make your app perform client-side routing, you will need to `import` the `BrowserRouter` component from `react-router-dom` (which has already been installed as a dependency), and "wrap" the `<App>` component in a `<BrowserRouter>`. 

    Modify the **`index.js`** file so that instead of passing just an `<App>` component to `ReactDOM.render()`, you pass a `<BrowserRouter>` that contains an `<App>` as a child element.

2. In the **`src/App.js`** file, import the `Route` component from React Router (`react-router-dom`). Then modify the `App` component's `render()` function, replacing the rendered `<PetList>` element with the following routes:

    - The route `/` should render a `<PetList>` (note that it will not show any pets initially).
    - The route `/about` should render a `<AboutPage>`
    - The route `/resources` should render a `<ResourcesPage>`

    Place all of the routes inside a `<Switch>` component to make them mutually exclusive (so the `PetList` doesn't render with the other pages); you will also need to make the `/` route be an [`exact`](https://reacttraining.com/react-router/web/api/Route/exact-bool) match.

    You can test your changes by directly visiting the routes (e.g., typing in `localhost:3000/about` in the browser's URL bar) and confirming that the correct content is being shown.

3. To begin adding navigation, modify the rendered `<header>` in the `App` component so that the `<h1>` contains a `<Link>` to the `/` route. Remember to import `Link` from React Router!

    You can test that this works by directly visiting the `/about` page, and then clicking on the header link.

4. Add a `<Redirect>` element that will redirect the page to `/` if no other routes are rendered. _Hint_ place this inside of the [`<Switch>`](https://reacttraining.com/react-router/web/api/Switch) statement (as the last option), which will cause it to be rendered as another "condition". This is a good way to handle typos in URLs.

    You can test this functionality by visiting a non-existent route (e.g., `/wrong`) and confirming that it takes you to the `/` route instead.

5. Modify the `AboutNav` component so that the links navigate to the indicated routes (but _without_ reloading the page). Replace the `<a>` elements with `<NavLink>` components, and specify that the the links should be given the `activeLink` class [if the current route matches the link](https://reacttraining.com/react-router/web/api/NavLink/activeclassname-string). Note that the `/` link should again be an `exact` match.

    You can test this functionality by clicking on each of the links. The page show the correct route, and the navigation link should be properly "highlighted"!

6. Now that most your navigation is in place, you should make it so that the different pets are shown in the `PetList`. To do this, modify the `/` route in the `App` component so that instead of specifying a `component` property, you specify a [**`render`**](https://reacttraining.com/react-router/web/api/Route/render-func) property. This property be assigned a callback function that takes in a set of props, and returns a `<PetList>` element with those props _as well as_ the original **`pet`** prop.

    _Tip:_ Try declaring this function as a local variable inside of the `App`'s `render()` function, and then passing that function value as a prop. This can help with readability.

    Once this works, you should be able to see the list of pet cards when you visit the `/` route.

7. Next, add the ability to view details about each pet available for adoption. Add _another_ `<Route>` to the `App` component that is `/adopt/` followed by a **URL parameter** of the pet's name (e.g., it could be referred to as `/adopt/Fido`). Note that you are only adding one route with a parameter, not a specific route for Fido!

    Then in the `src/AdoptPet.js` file, in the `componentDidMount()` method assign that route parameter value to the **`petName`** variable.

    You should be able to test this change by visiting routes such as `/adopt/Fido` and `/adopt/Spot` and seeing details for the appropriate pet.

    (Note that the "adopt" button is disabled, since that functionality isn't implemented in this exercise!).

8. Finally, add functionality so that when you click on each `PetCard`, the page _redirects_ to the appropriate `/adopt` route.

    To do this, modify the `PetCard` class (in `src/App.js`) so that when you click on the card, you assign a value (e.g., a boolean) to that component's `state` indicating that it should redirect to the detail page for that pet's name.

    Then in that component's `render()` function, add a _condition_ so that **if** the `state` says it should redirect, you instead render a `<Redirect>` to the the `/adopt` route for that pet (rather than the normal content). Note that you should also pass the [`push`](https://reacttraining.com/react-router/web/api/Redirect/push-bool) prop to this `<Redirect>` to allow the back button to function as expected (you're going to a new page, not just changing the current one!).

    You can test this functionality by clicking on each `PetCard` and checking out the details for each pet!
