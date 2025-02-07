import React, { FC, memo } from 'react'
import DayRow from './DayRow'
import { IDays } from './interfaces'

/**
 * @component Days
 * * общий компонент всех дней месяца календаря (тело таблицы дней)
 * @param {IDays}       общий интерфейс входных параметров CheckCode
 *
 * @param days          все дни месяца календаря для отрисовки (разбиты на массивы по неделям [[дни недели][дни недели]])
 */
const Days: FC<IDays> = ({ days }) => {
  return (
    <tbody>
      {days.map((dayList, rowIdx) => (
        <DayRow key={String(rowIdx)} dayList={dayList} />
      ))}
    </tbody>
  )
}

export default memo(Days)
