import './MenuItem.scss';

export const MenuItem = ({ img, className, link }) => {
  return (
    <div className={className}>
      <img src={img} alt="" />
      <span>{link}</span>
    </div>
  );
};
