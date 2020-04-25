/** The date/time of the build presented as a number that directly corresponds to a JavaScript `Date`. */
declare const BUILD_DATE: number;

declare namespace NodeJS {
  interface ProcessEnv {
    /** Set to `"production"` when building in production mode, otherwise undefined (with the standard build process). */
    NODE_ENV?: "production";
  }
}
