import { useControls, button, levaStore } from 'leva'

export function DevTools() {
  useControls('Tools', {
    'Copy settings to clipboard': button(() => {
      const data = levaStore.getData() as Record<string, { type?: string; value?: unknown }>
      const out: Record<string, unknown> = {}
      for (const [path, item] of Object.entries(data)) {
        if (!item || typeof item !== 'object') continue
        if (item.type === 'BUTTON' || item.type === 'FOLDER') continue
        if (!('value' in item)) continue
        out[path] = item.value
      }
      const json = JSON.stringify(out, null, 2)
      console.log('[leva settings]\n' + json)
      navigator.clipboard
        .writeText(json)
        .then(() => console.log('[leva] copied to clipboard'))
        .catch((err) => console.warn('[leva] clipboard write failed', err))
    }),
  })
  return null
}
