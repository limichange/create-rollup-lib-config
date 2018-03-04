# create rollup lib config

Don't like write rollup config file ? try it 😗.

## Install

```sh
$ yarn add @limichange/create-rollup-lib-config
# or
$ npm i @limichange/create-rollup-lib-config --save-dev
```

## Usage

```js
// rollup.config.js

import createConfig from '@limichange/create-rollup-lib-config'

export default createConfig({
  name: 'lib-name',
  author: 'Limichange',
  version: process.env.VERSION || require('./package.json').version
})
```

## Author

Limichange
