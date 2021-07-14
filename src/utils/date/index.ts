import dayjs, { Dayjs } from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

const TimeZone = 'Asia/Tokyo'
const ISO8601 = 'YYYY-MM-DDTHH:mm:ssZ'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

export const formatJSTYMD = (str?: string) =>
  str ? dayjs(str).tz(TimeZone).format('YYYY.MM.DD') : ''

export const formatJSTISO8601 = (date: Dayjs) =>
  date.tz(TimeZone).format(ISO8601)

export const nowJSTYMD = () => dayjs().tz(TimeZone).format('YYYY.MM.DD')

export const format = (
  date: string | number | Dayjs | Date | undefined,
  format: string,
) => dayjs(date).format(format)
