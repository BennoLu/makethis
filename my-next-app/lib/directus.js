import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus('https://stack-up.directus.app').with(rest());

export default directus;