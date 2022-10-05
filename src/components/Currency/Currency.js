import Card from "../UI/Card";
import classes from "./Currency.module.css";

const Currency = (props) => {
  const symbol = (
    <span dangerouslySetInnerHTML={{ __html: `${props.symbol}` }}></span>
  );
  return (
    <li className={`${classes.currency} ${classes[props.change]}`}>
      <div>{`BTC/${props.currency}`}</div>
      <div className={classes.rate}>
        {symbol}
        {props.rate}
      </div>
    </li>
  );
};

export default Currency;
