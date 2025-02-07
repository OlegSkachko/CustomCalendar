import React, { FC, memo } from 'react'

import DayCell from './DayCell'

import { IDayRow } from './interfaces'

/**
 * @component DayRow
 * * компонент массива ячеек календаря (массив дней)
 * @param {IDayRow}                 общий интерфейс входных параметров DayRow
 *
 * @param dayList                   массив дней для отрисовки (значение false для создания пустых ячеек
 * чтобы дни отрисовались под своими днями недели)
 */
const DayRow: FC<IDayRow> = ({ dayList }) => {
  return (
    <tr>
      {dayList.map((day, cellIdx) => (
        <DayCell key={String(cellIdx)} day={day} />
      ))}
    </tr>
  )
}

export default memo(DayRow)
