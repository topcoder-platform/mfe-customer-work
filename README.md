# Topcoder Self Service Micro Frontend App

This is a [single-spa](https://single-spa.js.org/) React microapp that runs within the `mfe-core` frame application. 

> **NOTE:** This application has been configured to be run as child app of a single-spa application. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

>**NOTE:** To successfully run this application, you must also run the two following apps: `mfe-core` & `mfe-header`. Please see their corresponding README's for instructions on running each app.

## Content

Following are the list of sections in this document,

- [Local environment setup](#local-environment-setup)
  - [IDE](#ide)
  - [Nvm](#nvm)
  - [Hosting](#hosting)
  - [Setup core](#setup-core)
    - [macOS](#macos)
    - [windows](#windows)
  - [Setup mfe-header](#setup-mfe-header)
    - [macOS](#macos)
    - [windows](#windows)
  - [Terminal configuration](#hosting)
- [Git process](#git)
  - [Branching](#branching)
  - [Commits](#commits)
- [List of npm commands supported](#npm-commands)
- [Deployment to production](#deployment-to-production)
  - [Deploying to Heroku](#deploying-to-heroku)
  - [Aggregator API](#aggregator-api)
    - [Aggregator API Configuration](#aggregator-api-configuration)
- [Linting](#linting)
  - [Rules](#rules)
  - [Command line](#command-line)
    - [View all lint errors](#view-all-lint-errors)
  - [VS code](#vs-code)
    - [Format on save](#format-on-save)
    - [TSLint Plugin](#tslint-plugin)
- [Styling](#styling)
- [How to use icons](#icons)
  - [Heroicons](#heroicons)
  - [Custom SVGs](#custom-svgs)

## Local Environment Setup

### IDE

Use the [VS Code](https://code.visualstudio.com/download) IDE for MFE development.

### NVM
Use the node version manager [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) to easily and safely manage the required version of NodeJS (aka, node). Download and install it per the instructions for your development operating system. Installing a version of node via `nvm` will also install `npm`.

Once nvm is installed, run: 
```
$ nvm install <insert node version>
```

At the root of the project directory you'll notice a file called `.nvmrc` which specifies the node version used by the project. The command `nvm use` will use the version specified in the file if no version is supplied on the command line. 
See [the nvm Github README](https://github.com/nvm-sh/nvm/blob/master/README.md#nvmrc) for more information on setting this up.

>**NOTE:** The minimum node version required is `10.22.1` and the current node version mentioned in the `.nvmrc` is `16.15.0`

You can verify the versions of `nvm`, `node`, and `npm` using the commands below.
| Command           | Supported Version  |
| ----------------- | -------- |
| `$ npm -v`        | 6.14.6  |
| `$ node -v`       | v10.22.1 |
| `$ nvm --version` | 0.39.1   |
| `$ nvm current`   | v10.22.1 |

### Hosting 
You will need to add the following line to your hosts file. The hosts file is normally located at `/etc/hosts` (Mac). Do not overwrite the existing localhost entry also pointing to 127.0.0.1.

```
127.0.0.1      local.topcoder-dev.com
```

The MFE can run in a non-ssl environment, but auth0 will complain and throw errors. In order to bypass this, you will need to install [local-ssl-proxy](https://www.npmjs.com/package/local-ssl-proxy) to run the site in ssl. The following command will install it globally:
```
$ npm i -g local-ssl-proxy
```
### Setup mfe-core

You can find the mfe-core github repository [here](https://github.com/topcoder-platform/mfe-core). The MFE Core renders the landing page and the top navigation. Each app then runs within that core frame.

The Frame project consists of an API that manages environment configuration and a client that renders the index.html page. Both are required.

#### macOS

1. Run the Frame API

`npm run start-server`

2. Run the Frame Client

`npm run start-client`

#### Windows

1. Run the Frame API

```bashscript
  export APPMODE="development"
  export APPENV="local-multi"
  nvm use
  npm i
  npm run local-server
```

2. Run the Frame Client

```bashscript
  export APPMODE="development"
  export APPENV="local-multi"
  nvm use
  npm run local-client
```

### Setup mfe-header

You can find the mfe-header github repository [here](https://github.com/topcoder-platform/mfe-header).

#### macOS

1. Run the Navbar app

`npm run start-local`

The site should now be available at [http://local.topcoder-dev.com:8080/](http://local.topcoder-dev.com:8080/)

2. Run the SSL Proxy to port 8080

`npm run start-local-proxy`

The site should now be available at [https://local.topcoder-dev.com/](https://local.topcoder-dev.com/)

#### Windows

1. Render the Navbar app

```bashscript
  export APPMODE="development"
  export APPENV="local"
  nvm use
  npm i
  npm run dev
```

The site should now be available at [http://local.topcoder-dev.com:8080](http://local.topcoder-dev.com:8080).

2. Set up the SSL Proxy to port 8080

```bashscript
  nvm use
  local-ssl-proxy -n local.topcoder-dev.com -s 443 -t 8080
```

 The site should now be available at [https://local.topcoder-dev.com](https://local.topcoder-dev.com).

 ***NOTE:*** you may have to run the local-ssl-proxy line w/elevated permissions (i.e. sudo) in order to listen to the SSL port (i.e. 443)


### Terminal Configuration

The MFE Core Frame needs to run separate local server and client processes, each one in a separate terminal session. The navbar also needs to run its server in a terminal, along with the `local-ssl-proxy` server that will allow you to use *https* endpoints locally. Finally, each of the other micro front-end applications you want to run will also each run in their own terminal session.

When developing one of the micro front-end applications you will therefore have 5 terminal sessions running at the same time:

- `mfe-core` server
- `mfe-core` client
- `mfe-header` application
- `local-ssl-proxy` server
- the MFE app you're developing 

Given this complexity, it is recommended that you use a tool like [iTerm2](https://iterm2.com) (on Mac) or an equivalent terminal shell on Windows to make terminal management simpler. iTerm2 allows you to setup a pre-defined window layout of terminal sessions, including the directory in which the session starts. This setup, along with simple shell scripts in each project that configure and start the environment, will allow you to get your development environment up and running quickly and easily.

## Git

### Branching
When working on Jira tickets, we link associated Git PRs and branches to the tickets. Use the following naming convention for branches:

`[TICKET #]_short-description`

e.g.: `PROD-1516_work-issue`

The overall base branch is `develop`. Whenever a new epic is created and started working on, then a new epic branch is checked out from `develop` branch(for eg. like this `PROD-120_find-me-data`, in this case `PROD-120` is an epic). When a task/bug is assigned to a developer within a particular epic and when the developer starts working on the task/bug then the developer has to consider the epic branch(`PROD-120_find-me-data`) as base branch and create a new feature branch based on the above mentioned branch naming convention.

So basically the branch creation flow is like this `develop` -> `epic_branch` -> `feature_branch`. When merging we will merge `feature_branch` to `epic_branch` which in turn will be merged to `develop` branch.

### Commits
We use [Smart Commits](https://bigbrassband.com/git-integration-for-jira/documentation/smart-commits.html#bbb-nav-basic-examples) to link comments and time tracking to tickets. You would enter the following as your commit message:

`[TICKET #] #comment <commit message> #time <jira-formatted time>`

e.g.: `PLAT-001 #comment adding readme notes #time 45m`

## Local Deployment

To run the app locally, run the following command from the project root `./mfe-customer-work`:

macOS:
```
$ npm run start-local
```

Windows:

Copy the contents of the Bash script `start-local.sh` and paste them in the Command Prompt.


The Self-Service app should now be available at https://local.topcoder-dev.com/self-service.

>**NOTE:** To successfully run this application, you must also run the two following apps: `mfe-core` & `mfe-header`. Please see their corresponding README's for instructions on running each app. 

## Deployment to Production

- `npm i` - install dependencies
- `npm build` - build code to `dist/` folder
- Now you can host `dist/` folder using any static server. For example, you may run a simple `Express` server by running `npm start`.

### Deploying to Heroku

Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository inited yet, create a repo and commit all the files:

  - `git init`
  - `git add .`
  - `git commit -m'inital commit'`

- `heroku apps:create` - create Heroku app

- `git push heroku master` - push changes to Heroku and trigger deploying

- Now you have to configure frame app to use the URL provided by Heroku like `https://<APP-NAME>.herokuapp.com/gigs-app/topcoder-mfe-customer-work.js` to load this microapp.

### Aggregator API

Please refer to [Swagger Doc](./src/api/docs/swagger.yaml) for Aggregator API endpoints

#### Aggregator API Configuration

In the `mfe-customer-work` root directory create `.env` file with the next environment variables.

```bash
# Auth0 config
AUTH_SECRET=
AUTH0_URL=
AUTH0_AUDIENCE=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
VALID_ISSUERS=
```

Once the self service app is started, the aggregator api will work as well

## NPM Commands

| Command               | Description                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm start`           | Run server which serves production ready build from `dist` folder                                            |
| `npm start-local`     | Run app locally in the `development` mode and `dev` config (calls on `npm run dev`)                                           |
| `npm run dev`         | Run app in the `development` mode and `dev` config                                                           |
| `npm run dev-https`   | Run app in the `development` mode and `dev` config using HTTPS protocol                |
| `npm run prod`        | Run app in the `development` mode and `prod` config                                                          |
| `npm run build`       | Build app for production and puts files to the `dist` folder, default to `development` mode and `dev` config |
| `npm run analyze`     | Analyze dependencies sizes and opens report in the browser                                                   |
| `npm run lint`        | Check code for lint errors                                                                                   |
| `npm run format`      | Format code using prettier                                                                                   |
| `npm run test`        | Run unit tests                                                                                               |
| `npm run watch-tests` | Watch for file changes and run unit tests on changes                                                         |
| `npm run coverage`    | Generate test code coverage report                                                                           |
| `npm run mock-api`    | Start the mock api which mocks Recruit api                                                                   |

## Linting

### Rules
While [TSLint](https://palantir.github.io/tslint/) is technically deprecated in favor of [Typescript ESLint](https://typescript-eslint.io/), TSLint is still far better at linting Typescript files than ESLint. So, for the time being, TSLint will be the primary linter, but ESLint remains configured for JS/X files.

The following command will install TSLint globally:
```
$ npm i -g tslint typescript 
```

### Command Line

#### View All Lint Errors

```
$npm run tslint
```

#### Fix All Auto-fixable and View All Non-fixable Lint Errors

```
$ npm run tslint:fix

OR

$ npm run lint   (for JS/X files)
```

### VS Code

VS Code has several plugins and settings that make linting easy.

#### Format on Save

The most useful feature is to automatically apply all lint rules any time you save a file.

1) Code → Preferences → Settings 

2) Search for “save” to find the setting
   - Editor: Code Actions on Save

3) Click the “Edit in settings.json” link

4) Add the following config:
    ```
    {
        ...
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.fixAll.tslint": true,
        },
    }
    ```

#### TSLint Plugin

Created by Microsoft, this plugin will allow you to see lint errors in the Problems panel.

**WARNING:** Other lint plugins can interfere with TSLint, so it is recommended that you uninstall/disable all other lint plugins (e.g. ESLint, Prettier, etc).

## Migration

The self service project is currently migrated from javascript to typescript. That's why in the root of the repository there are two source folders(`src` and `src-ts`). During the build process all the typescript is transpiled to javascript and entire apps is converted to single javascript file by `single-spa`.

## Styling

We use [Sass](https://sass-lang.com/) for styling, which is a preprocessor scripting language that compiles to CSS and allows for the use of variables, nested rules, mixins, functions, etc.

**Variables** can be used to store any CSS value that you want to reuse throughout your stylesheets. Variables are prefixed with the $ symbol.

e.g. styles.scss
```
$primary-color: #333;

body {
  color: $primary-color;
}
```

**Mixins** let you create groups of CSS declarations that you want to reuse throughout your site. You can also pass in values to make your mixin more flexible, and you call them using `@include`.

e.g. styles.scss
```
@mixin theme($theme: DarkGray) {
  background: $theme;
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
```

Shared stylesheets are located in `src-ts/lib/styles/`. We use variables and mixins for handling padding, colors and breakpoints in the application, among others. To reference these in your SCSS files, simply add the following line at the top of your file.

```
@import '[path to]/lib/styles';
```

### Colors

Colors are defined as variables in `src-ts/lib/styles/_palette.scss`.

### Padding

Padding for various screen sizes are defined as variables in `src-ts/lib/styles/_layout.scss`. This file also contains a mixin called `pagePaddings` that determines the correct padding to use for the current screen size based on breakpoints. 

### Breakpoints

Breakpoint mixins are defined in `src-ts/lib/styles/_breakpoints.scss` and can be used to apply different styling based on the screen width. 

Here is an example that applies a different height value than the default to a css class selector if the screen is considered small (376px - 464px).

_breakpoints.scss
```
$sm-min: 376px;
$sm-max: 464px;

@mixin sm {
  @media (min-width: #{$sm-min}) and (max-width: #{$sm-max}){
    @content;
  }
}
```

example.scss
```
@import '../lib/styles';

.example {
  height: 100px;
  @include sm {
    height: 50px;
  }
}
```

## Icons
### Heroicons
We use the SVG icons library [Heroicons](https://heroicons.com/), where each icon is available in an `outline` or `solid` version.
We import both sets of icons in the file `src-ts/lib/svgs/index.ts`. 
```
import * as IconOutline from '@heroicons/react/outline'
import * as IconSolid from '@heroicons/react/solid'
```

Then, to use an icon from either of these sets, you would import the corresponding set into your JSX file and reference the icon of your choice as a component:

e.g.:
```
<IconOutline.InformationCircleIcon width={28} height={28} />
```

### Custom SVGs
Custom SVGs can also be imported and used directly as a React component. Save your SVG in its own file within `src-ts/lib/svgs`, and then import the SVG within `src-ts/lib/svgs/index.ts` as a 
component.
```
import { ReactComponent as CustomSVG } from './customSvg.svg'
```

### Styling Icons

You can style an SVG icon by overwritting its properties through CSS (height, width, fill, etc.). 
There are also existing mixins located in `src-ts/lib/styles/_icons.scss` with pre-defined widths and heights for various icon sizes. 

e.g.:
```
.logo-link {
    svg {
        width: calc($pad-xxl + $pad-xxxxl);
        height: $pad-xl;
        fill: none;

        path {
            fill: $tc-white;
        }
    } 
}

.no-logo-link {
    svg {
      @include icon-lg;
    }
}
```

