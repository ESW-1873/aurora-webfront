import dayjs from 'dayjs'
import { formatJSTISO8601, formatJSTYMD } from '.'

describe('date', () => {
  test('formatJSTYMD', () => {
    expect(formatJSTYMD('20200101')).toBe('2020.01.01')
  })
  test('formatJSTISO8601', () => {
    expect(formatJSTISO8601(dayjs('2021-04-27T10:51:33.946Z'))).toBe(
      '2021-04-27T19:51:33+09:00',
    )
  })
})
