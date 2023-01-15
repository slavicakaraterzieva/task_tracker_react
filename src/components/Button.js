import PropTypes from 'prop-types';
function Button({color, text, onClick}) {

  return (
  <button onClick={onClick} style={{backgroundColor:color}} className='btn'>{text}</button>)
}
Button.defaultProps={
    color:'blue',
}
Button.propTypes={
    title: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default Button
