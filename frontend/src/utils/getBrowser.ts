export const getBrowser = () => {
  const { userAgent } = navigator
  let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  let temp

  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []

    return `IE ${temp[1] || ''}`
  }

  if (match[1] === 'Chrome') {
    temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)

    if (temp !== null) {
      return temp.slice(1).join(' ').replace('OPR', 'Opera')
    }

    temp = userAgent.match(/\b(Edg)\/(\d+)/)

    if (temp !== null) {
      return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)')
    }
  }

  match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
  temp = userAgent.match(/version\/(\d+)/i)

  if (temp !== null) {
    match.splice(1, 1, temp[1])
  }

  return match.join(' ')
}
export const getOS = () => {
  let OSName = 'Unknown OS'
  if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows'
  if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS'
  if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX'
  if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux'
  return OSName
}

export const getIp = () => {
  const Ipaddress = fetch('https://checkip.amazonaws.com/')
    .then((res) => res.text())
    .then((data) => data)

  return Ipaddress
}
