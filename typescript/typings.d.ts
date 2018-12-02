/* SystemJS module definition */
declare var module: NodeModule
interface NodeModule {
  id: string,
  hot: {
    accept: (module: string[], fn: () => void) => void
  }
}

interface WebpackRequire {
  <T>(path: string): T
  (paths: string[], callback: (...modules: any[]) => void): void
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void
}
interface NodeRequire extends WebpackRequire { }
declare var require: NodeRequire
declare var __PRODUCTION__: boolean

declare module "*.svg" {
  const content: any
  export default content
}

declare module "*.json" {
  const content: any
  export default content
}
