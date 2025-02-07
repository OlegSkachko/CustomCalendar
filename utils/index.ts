import { isUndefined } from '@/utils'

import { DEFAULT_LANGUAGE } from '@/const'
import { FIRST_MONTH, LAST_MONTH, TOTAL_DAYS_OF_WEEK } from '../const'

import {
  IGetFirstLastWeekDay,
  TGetMonthData,
  TIsEqualDate,
  TMonthTableRow,
  IPickedDate
} from '../interfaces'

/**
   * *  функция для получения массива всех дней месяца
   * @func   getRangeArray
   *
   * @param start    первый день месяца
   * @param end      последний день месяца
   *
   * @returns [1, 2, ..., 30]
   */
const getRangeArray = (start: number, end: number): number[] =>
  Array(end - start + 1)
    .fill(undefined)
    .map((_, index) => index + start)

/**
   * *  функция для разделения массива дней в месяце на массивы дней по неделям
   * @func   splitArray
   *
   * @param array    массив всех дней месяца
   * @returns [] => [][]
   */
const splitArray = (
  array: TMonthTableRow
): TMonthTableRow[] => {
  const tmp: any[] = []
  for (let i = 0; i < array.length; i += TOTAL_DAYS_OF_WEEK) {
    tmp.push(array.slice(i, i + TOTAL_DAYS_OF_WEEK))
  }

  const lastTmpRow = tmp[tmp.length - 1]
  if (lastTmpRow.length < TOTAL_DAYS_OF_WEEK) {
    const requiredCellCount = TOTAL_DAYS_OF_WEEK - lastTmpRow.length
    lastTmpRow.push(...Array(requiredCellCount).fill(false))
  }
  return tmp
}

/**
   * *  функция для для получения массива дней, разбитых на массивы по неделям следующего месяца
   * @func   getMonthData
   *
   * @param yearVal     текущий год на календаре
   * @param monthVal    текущий месяц на календаре
   * @returns [][]
   */
export const getMonthData: TGetMonthData = (yearVal, monthVal) => {
  let month = monthVal
  let year = yearVal

  if (month < 1 || month > 12) {
    if (month < 1) {
      month = 12
      year -= 1
    } else if (month > 12) {
      month = 1
      year += 1
    }
  }

  const date = new Date(year, month - 1)
  const y = date.getFullYear()
  const m = date.getMonth()
  const startDay = new Date(y, m, 1).getDay()
  const endDate = new Date(y, m + 1, 0).getDate()
  const daysArray = getRangeArray(1, endDate)

  const spaceArray = Array(startDay > 0 ? startDay - 1 : startDay + 6).fill(false)
  const targetArray = spaceArray.concat(daysArray)
  return splitArray(targetArray)
}

/**
   * *  функция для получения следующего месяца и года
   * @func   getNextYearAndMonth
   *
   * @param year      текущий год
   * @param month     текущий месяц
   * @returns [год, месяц]
   */
export const getNextYearAndMonth = (
  year: number,
  month: number
): number[] => {
  if (month === LAST_MONTH) {
    return [year + 1, FIRST_MONTH]
  }

  return [year, month + 1]
}

/**
   * *  функция для получения предыдущего месяца и года
   * @func   getNextYearAndMonth
   *
   * @param year      текущий год
   * @param month     текущий месяц
   * @returns [год, месяц]
   */
export const getPrevYearAndMonth = (
  year: number,
  month: number
): number[] => {
  if (month === FIRST_MONTH) {
    return [year - 1, LAST_MONTH]
  }

  return [year, month - 1]
}

/**
   * *  функция для получения текущего месяца и года (на стартовом открытии календаря)
   * @func   getCurYearMonth
   *
   * @param
   * @returns [год, месяц]
   */
export const getCurYearMonth = (year?: string, month?: string): number[] => {
  const today = new Date()
  if (!isUndefined(year) && !isUndefined(month)) {
    return [Number(year), Number(month) - 1]
  }
  return [today.getFullYear(), today.getMonth()]
}

/**
 * *  функция для получения названия месяца с учетом локации (ru, en...)
 * @func   getYearMonth
 *
 * @param year      год
 * @param month     месяц
 * @param locale    локация ('ru', 'en')
 * @returns Июль (July)
 */
export const getYearMonth = (year: number, month: number, locale?: string): string =>
  new Intl.DateTimeFormat(locale ?? DEFAULT_LANGUAGE, { month: 'long' }).format(
    new Date(year, month - 1)
  )

/**
 * *  функция для приведения обьекта вида { year, month, day } к обьекту Date
 * @func   unitToDateObj
 *
 * @param obj    обьек со значения года, месяца, дня
 * @return Date
 */
export const unitToDateObj = (obj: null | IPickedDate): Date | null => {
  if (typeof obj?.day !== 'number') {
    return null
  }
  const { year, month, day } = obj
  return new Date(year, month - 1, day)
}

/**
   * *  функция для проверки равенства двух дат
   * @func   isEqualDate
   *
   * @param date1    первая дата
   * @param date2    вторая дата
   * @returns boolean
   */
export const isEqualDate: TIsEqualDate = (date1, date2) => {
  if (date1 === null || typeof date1 === 'boolean' || date2 === null || typeof date2 === 'boolean') {
    return false
  }
  return Number(date1.getTime()) === Number(date2.getTime())
}

/**
 * *  функция для получения первого и последняя дня недели в котором находится выбранный день
 * @func   handlePasswordValue
 *
 * @param date                        выбранный день (Date)
 * @returns {
 *  firstDayOfWeek                    первый день выбранной недели
 *  lastDayOfWeek                     последний день выбранной недели
 * }
 */
export const getFirstLastWeekDay = (date: Date): IGetFirstLastWeekDay => {
  let firstDayOfWeek: Date
  let lastDayOfWeek: Date

  if (date.getDay() === 0) {
    firstDayOfWeek = new Date(date)
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - 6)
    lastDayOfWeek = new Date(date)
  } else {
    firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1))
    lastDayOfWeek = new Date(date.setDate(date.getDate() + (7 - date.getDay())))
  }

  return { firstDayOfWeek, lastDayOfWeek }
}
