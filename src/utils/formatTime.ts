export const formatTime = (
  timestamp: string | number | Date,
  format: string
) => {
  var date = new Date(Number(timestamp))
  let result
  const month =
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const year = date.getFullYear()
  const day = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()
  const hours =
    date.getHours() + 1 < 10 ? '0' + date.getHours() : date.getHours()
  const min =
    date.getMinutes() + 1 < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const sec =
    date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
  switch (format) {
    case 'Y:M:D:H':
      result = `${year}:${month}:${day}:${hours}`

      break
    case 'D,M,Y H:M:S':
      result = `${day},${month},${year} ${hours}:${min}:${sec}`

      break
    case 'D,M,Y,H,M,S':
      result = `${day},${month},${year},${hours},${min},${sec}`

      break
    case 'Y-M-D H:M:S':
      result = `${year}-${month}-${day} ${hours}:${min}:${sec}`

      break
    case 'Y-M-D H:M':
      result = `${year}-${month}-${day} ${hours}:${min}`

      break

    default:
      result = `${day},${month},${year},${hours},${min},${sec}`
      break
  }
  return result
}
