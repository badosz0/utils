# @badosz/utils

> Utility functions I often find myself using in different projects

## Installation

```bash
$ npm install @badosz/utils
```

OR

```bash
$ yarn add @badosz/utils
```

## Usage
```ts
import { Time } from '@badosz/utils'

const weekend = Time
  .in(4, 'days')
  .add(2, 'weeks')
  .subtract(4, 'minutes')
  .isWeekend()

const greater = new Time().gt(Time.subtract(Time.in(4, 'days'), 8, 'weeks'))


const date = Time.in(-400_00)
const twoWeeksBetween = Time.between(Time.add(date, 4000), date) > Time.Units.WEEK * 2
const twoWeeksSince = Time.since(date) > Time.Units.WEEK * 2
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
