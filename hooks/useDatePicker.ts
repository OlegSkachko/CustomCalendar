import { useContext } from 'react'

import { CalendarContext } from '../context'

import { getMonthData, getNextYearAndMonth, getPrevYearAndMonth, getYearMonth } from '../utils'

import { DEFAULT_LANGUAGE } from '@/const'

import { IUseDatePicker } from '../interfaces'

/**
 * @hook   useDatePicker
 * * Хук для изменения выбранного месяца на календаре
 *
 * @param
 * @returns {
 *  days                     массив дней на календаре (значения false для создания отступов, чтобы дни попадали на свои недели)
 *  year                     текущий год на календаре
 *  monthName                название текущего месяца на календаре
 *  onClick                  функция для переключения месяцев на календаре
 * }
 */
const useDatePicker = (): IUseDatePicker => {
  const { curMonth, setCurMonth } = useContext(CalendarContext)
  const { year, month } = curMonth
  const days = getMonthData(year, month)
  const monthName = getYearMonth(year, month, DEFAULT_LANGUAGE)

  /**
     * * функция для переключения месяца на календаря
     * @func   onClick
     * @param  value           значение, в какую сторону переключать месяц и год (следующий\предыдущий)
     */
  const onClick = (value?: string): void => {
    const { year, month } = curMonth
    const handleNewMonth = value === 'next' ? getNextYearAndMonth : getPrevYearAndMonth
    const [newYear, newMonth] = handleNewMonth(year, month)
    setCurMonth({ year: newYear, month: newMonth })
  }

  return {
    days,
    year,
    monthName,
    onClick
  }
}

export default useDatePicker
