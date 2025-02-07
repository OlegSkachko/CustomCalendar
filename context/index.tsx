import React, { FC, createContext, useState } from 'react'
import { getCurYearMonth, unitToDateObj } from '../utils'
import { ICalendarContext, IDatePickerProvider, IPickedDate } from '../interfaces'
import { DEFAULT_CALENDAR_DATA_CONTEXT } from '../const'
import { EMPTY_CONSTS, INITIAL_DATE_LENGTH } from '@/const'

/**
 * *  @info  CalendarContext
 * Общий контекст для всего календаря
 * @param pickedDate                   выбранная дата (день, месяц, год)
 * @param saveDate                     функция для сохранения выбранной даты в календаре
 * @param curMonth                     отображаемый на календаре текущий месяц (и год)
 * @param setCurMonth                  функция для изменения отображаемого на календаре текущего месяца (и года)
 */
export const CalendarContext = createContext<ICalendarContext>(DEFAULT_CALENDAR_DATA_CONTEXT)

/**
 * @component DatePickerProvider
 * * компонент-провайдер, предоставляет доступ к контексту календаря
 * @param {IDatePickerProvider}         общий интерфейс входных параметров CheckCode
 *
 * @param children                      дочерние компоненты, у которых есть доступ к контексту
 * @param onChange                      функция для изменения выбранной даты
 * @param data                          выбранная дата
 * @param startDate                     начальная дата меньше которой нельзя выбирать
 * @param endDate                       конечная дата больше которой нельзя выбирать
 */
export const DatePickerProvider: FC<IDatePickerProvider> = ({
  children,
  onChange,
  data,
  startDate,
  endDate
}) => {
  const initialDate =
    typeof data === 'string'
      ? data?.split('-')
      : EMPTY_CONSTS.UNDEFINED
  const initialPickedDate =
    initialDate?.length === INITIAL_DATE_LENGTH
      ? { year: Number(initialDate?.[0]), month: Number(initialDate?.[1]), day: Number(initialDate?.[2]?.split(' ')?.[0]) }
      : EMPTY_CONSTS.NULL
  const [thisYear, thisMonth] = getCurYearMonth(initialDate?.[0], initialDate?.[1])
  const [pickedDate, setPickedDateUnit] = useState<IPickedDate | null>(initialPickedDate)
  const [curMonth, setCurMonth] = useState({ year: thisYear, month: thisMonth + 1 })

  /**
   * * сохранение выбранной даты в календаре
   * @func   saveDate
   * @param  val        выбранная дата (день, месяц, год)
   */
  const saveDate = (val: IPickedDate | null): void => {
    onChange(unitToDateObj(val))
    setPickedDateUnit(val)
  }

  return (
    <CalendarContext.Provider value={{ pickedDate, saveDate, setCurMonth, curMonth, startDate, endDate }}>
      {children}
    </CalendarContext.Provider>
  )
}
