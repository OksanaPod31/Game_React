import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    resoult: `Угадай число в диапозоне 
    ${this.props.min} - ${this.props.max}`,
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    buttonTitle: 'Угадать',
    disabled: false,
    isGameOver: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState((state) => {
      if (!state.userNumber && !state.isGameOver) {
        return {
          resoult: `Введите число в диапозоне 
          ${this.props.min} - ${this.props.max}`,
          buttonTitle: 'Угадать',
          disabled: false,
        };
      }

      if ((state.userNumber > state.randomNumber) && !state.isGameOver) {
        return {
          resoult: `${state.userNumber} больше загаданного`,
          buttonTitle: 'Угадать',
          userNumber: '',
          count: state.count + 1,
          disabled: false,
        };
      }

      if ((state.userNumber < state.randomNumber) && !state.isGameOver) {
        return {
          resoult: `${state.userNumber} меньше загаданного`,
          buttonTitle: 'Угадать',
          userNumber: '',
          count: state.count + 1,
          disabled: false,
        };
      }

      if (state.isGameOver) {
        return {
          resoult: `Угадай число в диапозоне 
    ${this.props.min} - ${this.props.max}`,
          buttonTitle: 'Угадать',
          disabled: false,
          count: 0,
          randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
          userNumber: '',
          isGameOver: false,
        };
      }

      return {
        resoult: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        userNumber: '',
        buttonTitle: 'Сыграть ещё',
        disabled: !state.disabled,
        isGameOver: true,
      };
    });
  };

  handleChange = e => {
    this.setState((state) => ({
      userNumber: e.target.value,
    }), () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.resoult}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber}
            disabled={this.state.disabled}/>

          <button className={style.btn}>{this.state.buttonTitle}</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
