# Bottom-Drawer

### Table of Contents

- [Introduction](#introduction)
- [Built with](#built-with)
- [Prerequisites](#prerequisites)
- [Running the project](#running-the-project)
- [Deployment](#deployment)
- [Known Issues](#known-issues)
- [Improvements](#improvements)

## Introduction

This is a bottom drawer component built with React and TypeScript. The component can be used to display a drawer from the bottom of the screen. It has three snap points (closed, half-open, and fully open) and can be dragged to any of these points.

The snap points are defined by thresholds. Thinking of the screen height in percentages (0% being the bottom and 100% the top), the drawer will behave as follows:

- Closed: <25%
- Half-open: >25% - <60%
- Fully open: >60%

The drawer has an onClick function, that will 'toggle' the drawer between the `closed` and `half-opened` states. Should the drawer be `fully-opened` when clicking/tapping the drawer will move to its `closed` position. 

### Built with

The project has been generated with the vite react typescript template. More information can be found [here](add_link).

It is using `yarn` as package manager and is running on the `v18.17.1` node version managed via `nvm`.

### Prerequisites

Assure nvm (node version manager) is installed locally. Steps how to do so can be found [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

Assure yarn is installed locally. Steps how to do so can be found [here](https://classic.yarnpkg.com/en/docs/install#mac-stable).

### Running the project

Assure `nvm` is set-up locally and run
```
nvm use
```
Install dependencies
```
yarn
```
Run the project
```
yarn dev
```

### Deployment

The project is deployed to [Vercel](https://vercel.com/nadjagrothe/bottom-drawer). The deployment is triggered automatically when pushing to the `main` branch.

The deployment can be found [here](https://bottom-drawer.vercel.app/).

### Known Issues

- [05.11.23]: There is an animation bug when dragging the drawer to the `half-open` state. The drawer will jump before snapping to the `halt-open` position. 

### Improvements
- [05.11.23]: The drawer should be able to be swiped (quick movement). Currently, the drawer can only be dragged. To implement this, the velocity of the drag should be calculated and the drawer should be moved accordingly.
- [05.11.23]: There are currently no tests implemented. This should be done to assure the component is working as expected.
- [05.11.23]: The styling of the project is very basic. This could be improved to make it look more appealing.
- [05.11.23]: Add support for Desktop with onMouseDown and onMouseUp events.