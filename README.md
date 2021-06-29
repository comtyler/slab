# Slab

Create an HTML front-end using TailwindCSS and jQuery.

## Install

Simply clone this repository to start a new front-end project:

```
$ git clone https://github.com/comtyler/slab.git my-new-project
```

Once cloned, you will need to remove the Git configuration folder to avoid conflicts with the project's Git configuration. We also need to install all of the NPM dependencies:

```
$ cd my-new-project
$ rm -rf .git*
$ npm install
```

### Usage

Once the NPM dependencies are installed, we can start watching for changes on development or build for production:

###### Development (continuously watches files)
```
$ npm run dev
```

###### Production (builds files for deployment)
```
$ npm run build
```

:thumbsup: :neckbeard: