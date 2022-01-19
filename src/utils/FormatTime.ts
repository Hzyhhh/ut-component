/**
 * Created by PengYuJing on 2020-07-14  9:06.
 * file description:
 */
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export const FormatTime = (
  time?: Date | string,
  formatWay = 'yyyy-MM-dd HH:mm:ss',
) => {
  try {
    if (!time) return
    let formatTime, value
    if (time instanceof Date) {
      value = time
    } else {
      if (!isNaN(Date.parse(time))) {
        value = new Date(time)
      } else {
        value = parseISO(time)
      }
    }
    if (value) {
      formatTime = format(value, formatWay)
    }
    return formatTime
  } catch (e) {
    console.log(`FormatTime ${time} 格式化失败：${e.message}`)
  }
}
