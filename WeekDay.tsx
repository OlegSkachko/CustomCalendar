import React, { FC } from 'react'
import { WEEKDAY } from './const'
import styles from './style/index.module.scss'

/**
 * @component WeekDay
 * * компонент для отрисовки названий дней недели в календаре
 * @param
 */
const WeekDay: FC = () => {
  return (
    <thead className={styles.weekday}>
      <tr className={styles.weekday_row}>
        {WEEKDAY.map((day) => (
          <th className={styles.weekday_cell} key={day}>
            {day}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default WeekDay
