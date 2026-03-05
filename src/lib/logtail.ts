import { Logtail } from '@logtail/browser';

const logtailToken = import.meta.env.VITE_LOGTAIL_TOKEN as string;

export const logger = new Logtail(logtailToken);
