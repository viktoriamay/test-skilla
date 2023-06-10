import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dates.scss';
import { AppContext } from '../../context/AppContext';
import { ReactComponent as Calendar } from './icons/calendar.svg';
import { ReactComponent as Left } from './icons/Vector.svg';
import { ReactComponent as Right } from './icons/Vector-1.svg';

export const Dates = () => {
  const {
    isOpen,
    setIsOpen,
    startDate,
    setStartDate,
    onChangeDates,
    endDate,
    setEndDate,
    selectedDays,
    setSelectedDays,
    today,
    threeDays,
  } = useContext(AppContext);

  const sevenDays = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 6
  );

  const month = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 29
  );

  const year = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 364
  );

  const getThreeDays = () => {
    setStartDate(threeDays);
    setEndDate(today);

    const selectedDays =
      today !== null ? (today - threeDays) / (1000 * 60 * 60 * 24) + 1 : 0; //вычисляем количество выбранных дней. Если endDate равен null, то считаем 0 выбранных дней
    setSelectedDays(Math.floor(selectedDays));
  };

  const getSevenDays = () => {
    setStartDate(sevenDays);
    setEndDate(today);
    const selectedDays =
      today !== null ? (today - sevenDays) / (1000 * 60 * 60 * 24) + 1 : 0; //вычисляем количество выбранных дней. Если endDate равен null, то считаем 0 выбранных дней
    setSelectedDays(Math.floor(selectedDays));
  };

  const getMonth = () => {
    setStartDate(month);
    setEndDate(today);
    const selectedDays =
      today !== null ? (today - month) / (1000 * 60 * 60 * 24) + 1 : 0; //вычисляем количество выбранных дней. Если endDate равен null, то считаем 0 выбранных дней
    setSelectedDays(Math.floor(selectedDays));
  };

  const getYear = () => {
    setStartDate(year);
    setEndDate(today);
    const selectedDays =
      today !== null ? (today - year) / (1000 * 60 * 60 * 24) + 1 : 0; //вычисляем количество выбранных дней. Если endDate равен null, то считаем 0 выбранных дней
    setSelectedDays(Math.floor(selectedDays));
  };

  const getDaysString = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return 'день';
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return 'дня';
    } else {
      return 'дней';
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  document.addEventListener('click', () => setIsOpen(false));

  return (
    <div className="dates" onClick={(e) => e.stopPropagation()}>
      <div className="dates__button_wrapper">
        <Left />
        <button className="dates__button" onClick={handleClick}>
          <Calendar />
          {selectedDays === 0 ? '1' : selectedDays}{' '}
          {selectedDays === 0 ? 'день' : getDaysString(selectedDays)}
        </button>
        <Right />
      </div>
      <div
        className={
          isOpen ? 'dates__options dates__options_visible' : 'dates__options'
        }
      >
        <button
          className={
            selectedDays === 3
              ? 'dates__option_active dates__option'
              : 'dates__option'
          }
          onClick={getThreeDays}
        >
          3 дня
        </button>
        <button
          className={
            selectedDays === 7
              ? 'dates__option_active dates__option'
              : 'dates__option'
          }
          onClick={getSevenDays}
        >
          Неделя
        </button>
        <button
          className={
            selectedDays === 30
              ? 'dates__option_active dates__option'
              : 'dates__option'
          }
          onClick={getMonth}
        >
          Месяц
        </button>
        <button
          className={
            selectedDays === 365
              ? 'dates__option_active dates__option'
              : 'dates__option'
          }
          onClick={getYear}
        >
          Год
        </button>
        <button className="dates__option dates__option_calendar">
          Указать даты
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={onChangeDates}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            className="dates__input"
            popperClassName="dates__input_calendar"
          />
          <Calendar />
        </button>
      </div>
    </div>
  );
};
