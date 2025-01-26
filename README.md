# Sol Editor

A card editor for the **Sol: Last Days of a Star** board game.

This branch contains the Polish translation for the application.
Due to its rather niche use and differences in font settings to
support Polish characters, it's not deployed automatically.

The editor currently supports creating **Instability Effect** cards with the following features:

- Editable title, content, and author.
- Automatic fonts scaling to support longer texts.
- Selection of the card color and effect type.
- Flip toggle for exporting back side of the card.
- Export to PNG in 300 DPI with a 5mm offset on each side.
- Polish translation with support for the Polish special characters.

## Running locally

### Local development via NPM

Node.js needs to be installed to compile the application.\
Clone the repository and run `npm install` to fetch the project dependencies.

#### `npm start`

This script runs the application in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make any edits.\
You will also see any lint errors in the console.

#### `npm run build`

This command build the app for deployment to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Local deployment via Docker

Docker setup does not support hot code reload.\
Instead, it allows running the application locally with minimal effort and no dependency on local Node.js.

Run `docker compose up` to host the application with Nginx.\
Open [http://localhost](http://localhost) to view it in the browser.

## Credits

[Sol: Last Days of a Star](https://elephantlaboratories.com/sol)
is the work of [Elephant Laboratories](https://elephantlaboratories.com).

Editor authors:

- [@czyzby](https://github.com/czyzby): idea, programming, icons.
- [@marsza](https://github.com/marszaa): backgrounds.

Made with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/),
and [MUI](https://mui.com/).
