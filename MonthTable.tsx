import React, { FC, memo } from 'react'
import classNames from 'classnames'

import Days from './Days'
import Weekday from './WeekDay'
import * as I from './icons/icons'

import { IMonthTable } from './interfaces'

import styles from './style/index.module.scss'

/**
 * @component MonthTable
 * * компонент календаря с шапкой (месяц\год, переключение месяца) и телом календаря (дни месяца)
 * @param {IMonthTable}                 общий интерфейс входных параметров MonthTable
 *
 * @param year                  выбранный год
 * @param monthName             название выбранного месяца
 * @param days                  все дни месяца (с указанными отступами)
 * @param onClickNextButton     функция для переключения на следующий месяц
 * @param onClickPrevButton     функция для переключения на предыдущий месяц
 * @param classNameCalendar     дополнительные стили
 */
const MonthTable: FC<IMonthTable> = ({
  year,
  monthName,
  days,
  onClickNextButton,
  onClickPrevButton,
  classNameCalendar
}) => {
  return (
    <div className={classNames(styles.calendar_month_table,
      { [styles.classNameCalendar]: Boolean(classNameCalendar) }
    )}
    >
      <header className={styles.month_header}>
        <button
          className={styles.prevbtn}
          type='button'
          tabIndex={0}
          onClick={onClickPrevButton}
          onKeyDown={onClickPrevButton}
        >
          <I.Prev />
        </button>
        <p className={styles.label}>
          <span className={styles.label_year}>
            {year}
          </span>
          {monthName}
        </p>
        <button
          className={styles.nextbtn}
          onClick={onClickNextButton}
          onKeyDown={onClickPrevButton}
          type='button'
          tabIndex={0}
        >
          <I.Next />
        </button>
      </header>
      <table className={styles.calendar_table}>
        <Weekday />
        <Days days={days} />
      </table>
    </div>
  )
}

export default memo(MonthTable)
