import './App.css';
import { Menu } from '../Menu/Menu';
import { CallsSection } from '../CallsSection/CallsSection';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api/api';
import { AppContext } from '../../context/AppContext';

function App() {
  const today = new Date(); //создаем объект Date с текущей датой

  const threeDays = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 2
  );

  const [calls, setCalls] = useState([]);
  const [inOut, setInOut] = useState([]);
  const [startDate, setStartDate] = useState(threeDays); //устанавливаем дату три дня назад как начальную
  const [endDate, setEndDate] = useState(today); //устанавливаем сегодняшнюю дату как конечную
  const [selectedDays, setSelectedDays] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickCalendar = (e) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  const onChangeDates = (dates) => {
    const [start, end] = dates;

    const selectedDays =
      end !== null ? (end - start) / (1000 * 60 * 60 * 24) + 1 : 0; //вычисляем количество выбранных дней. Если endDate равен null, то считаем 0 выбранных дней
    setSelectedDays(selectedDays);

    setStartDate(start);
    setEndDate(end);
  };

  const changeInput = (e) => {
    setInOut(e.target.value); // добавляем в стейт сёрчКвери значение из инпута
  };

  useEffect(() => {
    if (startDate && endDate) {
      api
        .getCalls(
          startDate.toLocaleDateString('fr-CA'),
          endDate.toLocaleDateString('fr-CA'),
          inOut
        )
        .then((data) => setCalls(data.results))
        .catch((error) => console.error(error));
    }
  }, [endDate, inOut, startDate]);

  const valueContextProvider = {
    calls,
    setCalls,
    inOut,
    setInOut,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedDays,
    setSelectedDays,
    isOpen,
    setIsOpen,
    handleClickCalendar,
    onChangeDates,
    changeInput,
    today,
    threeDays,
  };

  return (
    <AppContext.Provider value={valueContextProvider}>
      <div className="App">
        <Menu />
        <CallsSection
          isOpen={isOpen}
          startDate={startDate}
          endDate={endDate}
          selectedDays={selectedDays}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
