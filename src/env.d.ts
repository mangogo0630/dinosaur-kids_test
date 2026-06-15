/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'vue-cookies' {
  import type { Plugin } from 'vue'

  type VueCookiesApi = {
    get(name: string): string | null | undefined
    set(
      name: string,
      value: string,
      expireTimes?: string | number | Date,
      path?: string,
      domain?: string,
      secure?: boolean,
      sameSite?: string,
    ): void
  }

  const VueCookies: Plugin & VueCookiesApi
  export default VueCookies
}
