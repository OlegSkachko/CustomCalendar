import { useContext } from 'react'
import { CalendarContext } from '../context'
import { unitToDateObj, getFirstLastWeekDay, isEqualDate } from '../utils'
import { TUseDayCell } from '../interfaces'
import { DEFAULT_DAY_CELL } from '../const'

/**
 * @hook   useDatePicker
 * * Хук для выбора конкретного дня
 *
 * @param day                   день из ячейки календаря
 * @returns {
*   isSelected                   выбран день
*   isFirstWeekDay               является первым днем недели в котором был выбран день
*   isLastWeekDay                является последним днем недели в котором был выбран день
*   isBetweenPickedDates         все дни недели в которой был выбран день
*   isDisabledDay                блокировать день для выбора
*   onClickDayCell               функция для сохранения выбранного дня
* }
*/
const useDayCell: TUseDayCell = ({ day }) => {
  const { saveDate, pickedDate, curMonth, startDate, endDate } = useContext(CalendarContext)
  const { year, month } = curMonth
  let isFirstWeekDay = false
  let isLastWeekDay = false

  if (typeof day === 'boolean') {
    return DEFAULT_DAY_CELL
  }

  const curPickedDate = unitToDateObj(pickedDate)
  const curCellDate = unitToDateObj({ year, month, day })
  let isBetweenPickedDates = false
  let isDisabledDay = false

  if (curPickedDate !== null && curCellDate !== null) {
    const date = new Date(curPickedDate)
    const { firstDayOfWeek, lastDayOfWeek } = getFirstLastWeekDay(date)
    isBetweenPickedDates = (firstDayOfWeek <= curCellDate) && (curCellDate <= lastDayOfWeek)

    if (isBetweenPickedDates) {
      isFirstWeekDay = firstDayOfWeek.getDate() === day
      isLastWeekDay = lastDayOfWeek.getDate() === day
    }
  }

  if (curCellDate !== null) {
    // если передаем дату начала то выбирать день должны больше\равно начальной
    if (startDate !== null && startDate !== undefined) {
      const newStartDate = new Date(startDate)
      newStartDate.setHours(0) // обнуляем часы
      isDisabledDay = new Date(curCellDate) < newStartDate
    }

    // если передаем конечную дату то выбирать день должны меньше\равно конечной
    if (endDate !== null && endDate !== undefined) {
      isDisabledDay = new Date(curCellDate) > new Date(endDate)
    }
  }

  const isSelected = isEqualDate(curPickedDate, curCellDate)

  /**
     * * функция срабатывает на клик по дню календаря для сохранения выбранного дня
     * @func   onClickDayCell
     * @param
     */
  const onClickDayCell = (): void => {
    saveDate({ year, month, day })
  }

  return {
    isSelected,
    isFirstWeekDay,
    isLastWeekDay,
    isBetweenPickedDates,
    isDisabledDay,
    onClickDayCell
  }
}

export default useDayCell
