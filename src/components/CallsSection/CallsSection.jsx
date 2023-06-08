import { CallItem } from '../CallItem/CallItem';
import { Dates } from '../Dates/Dates';
import './CallsSection.scss';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { SelectItem } from '../SelectItem/SelectItem';
import { CallsHeader } from '../CallsHeader/CallsHeader';
import { ReactComponent as Plus } from './icons/plus.svg';
import { ReactComponent as Search } from './icons/search.svg';

export const CallsSection = () => {
  const { calls } = useContext(AppContext);

  return (
    <section className="calls_section">
      <CallsHeader />
      <div className="calls_section__container">
        <div className="calls_section__date">
          <div className="calls_section__date_button">
            <p className="calls_section__date_balance">
              Баланс: <span>272 ₽ </span>
            </p>
            <Plus />
          </div>
          <Dates />
        </div>
        <div className="calls_section__filters_wrapper">
          <div className="calls_section__filters__search_wrapper">
            <Search />
            <span className="calls_section__filters__search">
              Поиск по звонкам
            </span>
          </div>
          <div className="calls_section__filters">
            <div className="calls_section__filter">Все типы</div>
            <div className="calls_section__filter">Все сотрудники</div>
            <div className="calls_section__filter">
              <SelectItem />
            </div>
            <div className="calls_section__filter">Все источники</div>
            <div className="calls_section__filter">Все оценки</div>
            <div className="calls_section__filter">Все ошибки</div>{' '}
          </div>
        </div>

        <div className="calls_section__table">
          <div className="calls_section__table_header">
            <span className="calls_section__table_header_item">Тип</span>
            <span className="calls_section__table_header_item">Время</span>
            <span className="calls_section__table_header_item">Сотрудник</span>
            <span className="calls_section__table_header_item">Звонок</span>
            <span className="calls_section__table_header_item">Источник</span>
            <span className="calls_section__table_header_item">Оценка</span>
            <span className="calls_section__table_header_item">
              Длительность
            </span>
          </div>
          <div className="calls_section__table_calls">
            {calls.map((call) => (
              <CallItem call={call} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
