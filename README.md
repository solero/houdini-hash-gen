# Houdini hash generator

This is a simple react application for generating password hashes for the free [Houdini Club Penguin server](https://github.com/solero/houdini).

You can generate and compare password hashes with this tool. It also provides advanced settings like changing the static key and bcrypt cost.

All hash generation is done within the browser and does not rely on any kind of external API.

## Usage

You can run the dev server using the following npm script. This will automatically open a browser window where you can use the tool.

```bash
$ npm run start:dev
```

Alternatively, you can build the static files which can then be uploaded to a web server.

```bash
$ npm run build:prod
```

You may also visit the [live version](https://solero.me/passwords) of the site.

## Screenshot

![hash generator screen](https://i.solero.me/4q4dpC1I.png)