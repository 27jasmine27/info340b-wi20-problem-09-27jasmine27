# Problem Set 08

This repository contains practice exercises for the _Client-Side Web Development_ course at the UW iSchool.

To complete this problem set, follow the instructions in the `README.md` file for each problem.

## Checking Your Work
This exercise comes with a suite of _unit tests_ that you can use to check your work and understanding. Tests are **not** guaranteed to be comprehensive.

In order to run these tests, you will need to have the [Jest](https://facebook.github.io/jest/) test runner installed globally. You will also need to install the test dependencies listed in the `package.json` file:

```bash
npm install          # install dependencies
```

Note that you will need to have Jest version 24 or higher installed:

```bash
# check the version. Should be 24 or higher
jest --version

# install updated version if necessary
npm install -g jest@24
```

You can run these tests by using the `jest` command from the **repo's root directory**, or by using `npm test`:

```bash
# Example: run tests for problem-a
npx jest problem-a

# Run tests for all problems
npx jest
```
