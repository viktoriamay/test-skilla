import './Menu.scss';
import icon1 from './icons/Vector.svg';
import icon2 from './icons/Vector-1.svg';
import icon3 from './icons/Vector-2.svg';
import icon4 from './icons/Vector-3.svg';
import icon5 from './icons/Vector-4.svg';
import icon6 from './icons/Vector-5.svg';
import icon7 from './icons/Vector-6.svg';
import icon8 from './icons/Vector-7.svg';
import icon9 from './icons/Vector-9.svg';
import icon10 from './icons/Vector.svg';
import { ReactComponent as Logo } from './icons/logo.svg';
import { ReactComponent as Add } from './icons/add.svg';
import { MenuItem } from '../MenuItem/MenuItem';
import '../../index.css';

export const Menu = () => {
  const menu = [
    {
      img: icon1,
      className: 'menu_item__link',
      link: 'Итоги',
    },
    {
      img: icon2,
      className: 'menu_item__link',
      link: 'Заказы',
    },
    {
      img: icon3,
      className: 'menu_item__link',
      link: 'Сообщения',
    },
    {
      img: icon4,
      className: 'menu_item__link menu_item__link_active',
      link: 'Звонки',
    },
    {
      img: icon5,
      className: 'menu_item__link',
      link: 'Контрагенты',
    },
    {
      img: icon6,
      className: 'menu_item__link',
      link: 'Документы',
    },
    {
      img: icon7,
      className: 'menu_item__link',
      link: 'Исполнители',
    },
    {
      img: icon8,
      className: 'menu_item__link',
      link: 'Отчеты',
    },
    {
      img: icon9,
      className: 'menu_item__link',
      link: 'База знаний',
    },
    {
      img: icon10,
      className: 'menu_item__link',
      link: 'Настройки',
    },
  ];

  return (
    <aside className="menu">
      <Logo className="logo" />
      {menu.map((link, index) => (
        <MenuItem
          key={`menuItem-${index}`}
          img={link.img}
          className={link.className}
          link={link.link}
        />
      ))}
      <div className="menu__buttons">
        <div className="menu__button">
          <span className="menu__button_title_add">Добавить заказ</span>
          <Add />
        </div>
        <div className="menu__button">
          <span className="menu__button_title_pay">Оплата</span>
          <Add />
        </div>
      </div>
    </aside>
  );
};
