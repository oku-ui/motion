# Vue Typescript Bundle Template

![Vue Typescript Bundle Template](https://github.com/productdevbookcom/assets/blob/main/vue-ts-bundle-template.jpg?raw=true)

This is a template for creating a Typescript bundle. It is based on the [Typescript](https://www.typescriptlang.org/) compiler with the [Vite](https://vitejs.dev/) bundler.

## Features

- [x] [Typescript](https://www.typescriptlang.org/)
- [x] [Vite](https://vitejs.dev/)
- [x] [Vue](https://vuejs.org/)
- [x] [Vue Macros](https://github.com/sxzz/unplugin-vue-macros)
- [x] [ESLint](https://eslint.org/) with [Antfu's ESLint Config](https://github.com/antfu/eslint-config)
- [x] [Bumpp](https://github.com/antfu/bumpp) github changelog generator
- [x] [Vitest](https://vitest.dev/)
- [x] [Pnpm](https://pnpm.io/)
- [x] [GitHub Actions]()
- [x] [NPM Local Registry]()
- [x] [Renovate]()

## Usage

1. To use this template, click the "Use this template" button above.
2. Clone the repository to your local machine.
3. Run `pnpm install` to install the dependencies.
4. Run `pnpm build` to build the bundle.
5. Run `build:watch` to build the bundle in watch mode.
6. Run `pnpm play` to playground dev mode.
7. Run `pnpm start` to start the bundle.
8. Run `pnpm lint` to lint the code. (You can also run `pnpm lint:fix` to fix the linting errors.)
9. Run `pnpm test` to run the tests. (You can also run `pnpm test:watch` to run the tests in watch mode.)
10. Run `pnpm release` to bump the version. Terminal will ask you to select the version type. And then it will automatically commit and push the changes. GitHub Actions will automatically publish git tags. NPM local registry will automatically publish the package.

## Configuration

### Renovate

[Setup Github App](https://github.com/apps/renovate) for Renovate.

# Checklists

- Update the `README.md` file.
- Update the `LICENSE` file.
- Update the `package.json` file. (name,version, description, author, repository, bugs, homepage, funding, keywords)
- playground/src/App.vue - update package name `vue-bundle-template`
- playground/package.json - in change the package name `vue-bundle-template`

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/oku-ui/static/sponsors/sponsors.svg">
    <img alt="sponsors" src='https://cdn.jsdelivr.net/gh/oku-ui/static/sponsors/sponsors.svg'/>
  </a>
</p>

## License

This project is licensed under the [MIT License](LICENSE).
