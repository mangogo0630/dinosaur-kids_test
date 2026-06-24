export const FONT_FAMILY_ZH =
  'ChaoGangHei, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, -apple-system, sans-serif'

export const FONT_FAMILY_EN = '"Sweet Sans Pro", Arial, Helvetica, sans-serif'

export const FONT_FAMILY_TIMER = 'GenSenRounded, "Sweet Sans Pro", Arial, Helvetica, sans-serif'

export const FONT_WEIGHT_ZH = 400
export const FONT_WEIGHT_EN = 500
export const FONT_WEIGHT_TIMER = 900

export function buildZhCanvasFont(sizePx: number, weight = FONT_WEIGHT_ZH): string {
  return `${weight} ${sizePx}px ${FONT_FAMILY_ZH}`
}

async function loadDocumentFont(
  fontSpec: string,
  timeoutMs: number,
): Promise<void> {
  if (!('fonts' in document)) {
    return
  }

  await Promise.race([
    document.fonts.load(fontSpec),
    delay(timeoutMs),
  ])
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function ensureCriticalFontsLoaded(timeoutMs = 4000): Promise<void> {
  if (!('fonts' in document)) {
    return
  }

  try {
    await Promise.race([
      Promise.all([
        loadDocumentFont(`${FONT_WEIGHT_ZH} 16px ChaoGangHei`, timeoutMs),
        loadDocumentFont(`${FONT_WEIGHT_EN} 16px "Sweet Sans Pro"`, timeoutMs),
      ]),
      delay(timeoutMs),
    ])
    await document.fonts.ready
  } catch {
    // 字型載入失敗時換fallback
  }
}

export async function ensureTimerFontLoaded(timeoutMs = 6000): Promise<void> {
  if (!('fonts' in document)) {
    return
  }

  try {
    await Promise.race([
      loadDocumentFont(`${FONT_WEIGHT_TIMER} 16px GenSenRounded`, timeoutMs),
      delay(timeoutMs),
    ])
  } catch {
    // 倒數字型失敗時改用 fallback
  }
}

/** @deprecated 請改用 ensureCriticalFontsLoaded */
export async function ensureZhFontLoaded(timeoutMs = 3000): Promise<void> {
  await ensureCriticalFontsLoaded(timeoutMs)
}
