import React, { FC, memo } from 'react'
import classNames from 'classnames'
import { useDayCell } from './hooks'
import { IDayCell } from './interfaces'
import styles from './style/index.module.scss'

/**
 * @component DayCell
 * * компонент ячеек календаря (дни)
 * @param {IDayCell}                 общий интерфейс входных параметров DayCell
 *
 * @param day                        день, который попадет в ячейку
 */
const DayCell: FC<IDayCell> = ({ day }) => {
  const {
    isSelected,
    isFirstWeekDay,
    isLastWeekDay,
    isBetweenPickedDates,
    isDisabledDay,
    onClickDayCell
  } = useDayCell({ day })

  return (
    <td
      className={classNames(styles.day_cell_container,
        {
          [styles.is_between]: Boolean(day) && isBetweenPickedDates,
          [styles.is_first]: Boolean(isFirstWeekDay),
          [styles.is_last]: Boolean(isLastWeekDay)
        }
      )}
    >
      {typeof day === 'number'
        ? (
          <button
            type='button'
            disabled={isDisabledDay}
            onKeyDown={onClickDayCell}
            className={classNames(styles.day_cell,
              {
                [styles.selected_day_cell]: Boolean(isSelected),
                [styles.is_disabled]: Boolean(isDisabledDay)
              }
            )}
            tabIndex={0}
            onClick={onClickDayCell}
          >
            {day}
          </button>
          )
        : null}
    </td>
  )
}

export default memo(DayCell)
