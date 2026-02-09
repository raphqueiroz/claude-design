const STORAGE_KEY = 'wireframe-explorer-versions'
const STATE_KEY = 'wireframe-explorer-state'

export function saveVersion(label, state) {
  const versions = getVersions()
  versions.push({
    id: Date.now().toString(36),
    label,
    timestamp: new Date().toISOString(),
    state: JSON.parse(JSON.stringify(state)),
  })
  // Keep last 50 versions
  if (versions.length > 50) versions.splice(0, versions.length - 50)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(versions))
}

export function getVersions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function restoreVersion(id) {
  const versions = getVersions()
  const version = versions.find((v) => v.id === id)
  return version ? version.state : null
}

export function deleteVersion(id) {
  const versions = getVersions().filter((v) => v.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(versions))
}

export function saveNavigationState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state))
}

export function loadNavigationState() {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY))
  } catch {
    return null
  }
}
