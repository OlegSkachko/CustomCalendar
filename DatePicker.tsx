import React, { FC } from 'react'

import MonthTable from './MonthTable'

import useDatePicker from './hooks/useDatePicker'

import { IDatePicker } from './interfaces'

import styles from './style/index.module.scss'

/**
 * @component DatePicker
 * * компонент календаря с днями (тело), месяцем и годом
 * @param {IDatePicker}                 общий интерфейс входных параметров DatePicker
 *
 * @param classNameCalendar             дополнительные стили
 */
const DatePicker: FC<IDatePicker> = ({
  classNameCalendar
}) => {
  const { year, monthName, days, onClick } = useDatePicker()

  return (
    <div className={styles.date_picker}>
      <MonthTable
        onClickNextButton={() => onClick('next')}
        onClickPrevButton={() => onClick()}
        key={`${monthName}${year}`}
        year={String(year)}
        monthName={monthName}
        days={days}
        role='button'
        classNameCalendar={classNameCalendar}
      />
    </div>
  )
}

export default DatePicker
