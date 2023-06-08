import './AnalyticsItem.scss';

export const AnalyticsItem = ({ title, quantity, quantityColor, barColor }) => {
  return (
    <div className="analytics_item">
      <p className="analytics_item__title">
        {title}{' '}
        <span className={`analytics_item__quantity ${quantityColor}`}>
          {quantity}
        </span>
      </p>
      <div className="analytics_item__bar">
        <span className={`analytics_item__bar_color ${barColor}`}></span>
      </div>
    </div>
  );
};
