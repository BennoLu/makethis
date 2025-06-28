import { createDirectus, rest, realtime } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055')
  .with(rest())
  .with(realtime());

export default directus;