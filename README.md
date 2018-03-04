# create rollup lib config

## Install

todo

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
