import { AnalyticsItem } from '../AnalyticsItem/AnalyticsItem';
import './CallsHeader.scss';
import { ReactComponent as Search } from './icons/search.svg';
import { ReactComponent as Ava } from './icons/img.svg';

export const CallsHeader = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date().toLocaleString('ru', options).slice(0, -8);
  const capitalizedDate = date.charAt(0).toUpperCase() + date.slice(1);
  return (
    <div className="calls_header">
      <div className="calls_section__container">
        <div className="calls_header__wrapper">
          <div className="calls_header__date">{capitalizedDate}</div>
          <div className="calls_header__analytics">
            <AnalyticsItem
              title="Новые звонки"
              quantity="20 из 30 шт"
              quantityColor="green"
              barColor="green_bg"
            />
            <AnalyticsItem
              title="Качество разговоров"
              quantity="40%"
              quantityColor="yellow"
              barColor="yellow_bg"
            />
            <AnalyticsItem
              title="Конверсия в заказ"
              quantity="67%"
              quantityColor="red"
              barColor="red_bg"
            />
          </div>
          <Search />
          <span className="calls_header__profile">
            ИП Сидорова Александра Михайловна
          </span>
          <div className="calls_header__profile_ava">
            <Ava />
          </div>
        </div>
      </div>
    </div>
  );
};
