import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    resoult: 'Результат',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    buttonTitle: 'Угадать',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          resoult: 'Введите число',
          buttonTitle: 'Угадать',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          resoult: `${state.userNumber} больше загаданного`,
          buttonTitle: 'Угадать',
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          resoult: `${state.userNumber} меньше загаданного`,
          buttonTitle: 'Угадать',
          userNumber: '',
        };
      }

      return {
        resoult: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        userNumber: '',
        buttonTitle: 'Сыграть ещё',
        count: 0,
        randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
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
            onChange={this.handleChange} value={this.state.userNumber} />

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
