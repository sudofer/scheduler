import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

//renders 'no spots remaining' when there are 0 spots

//renders '1 spot remaining' when there is 1 spot

//"renders '2 spots remaining' when there are 2 spots"

  let spotMessage;
  const formatSpots = () => {
    if (props.spots === 0) {
      return spotMessage = 'no spots remaining'
    }

    else if (props.spots === 1) {
      return spotMessage = '1 spot remaining'
    }

    else if (props.spots === 2) {
      return spotMessage = '2 spots remaining'
    }

    else return spotMessage = props.spots;
  }
  formatSpots();
  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotMessage}</h3>
    </li>
  );
}