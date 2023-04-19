import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js'

declare global {
  interface Window {
  }

  const route: typeof ziggyRoute;
  const Ziggy: ZiggyConfig;
}
