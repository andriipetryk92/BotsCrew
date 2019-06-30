import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { addTask, doneTask, renameValue } from '../../redux/toDoList/actions';
import { rememberName, rememberFocus } from '../../redux/user/actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import './style.scss';


class App extends React.Component {
  state = {
    time: new Date(),
    valueTask: '',
    renameValue: '',
    valueName: '',
    valueFocus: '',
    clicked: false,
    indexInput: null,
    part: '',
  }

  handleChange = (event) => {
    this.setState({
      valueTask: event.target.value,
    })
  }

  onChangeName = (e) => {
    this.setState({
      valueName: e.target.value,
    })
  }

  onChangeFocus = (e) => {
    this.setState({
      valueFocus: e.target.value,
    })
  }

  handleKeyPress = (event) => {
    const { valueFocus } = this.state;
    if (event.key === 'Enter') {
      this.props.rememberFocus({ valueFocus })
    }
  }

  rememberName = () => {
    const { valueName } = this.state;
    this.props.rememberName({ valueName })
  }

  handleKeyPressTask = (event) => {
    const valueTask = this.state.valueTask.charAt(0).toUpperCase() + this.state.valueTask.slice(1)
    if (event.key === 'Enter') {
      this.props.addTask({ valueTask })
      this.setState({
        valueTask: ''
      })
    }
  }

  doneTask = (index) => {
    this.props.doneTask(index);
  }

  renameTask = (index) => {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
      indexInput: index
    }))
  }

  doRename = (index) => {
    const { renameValue } = this.state;
    this.props.renameValue({ renameValue, index })
    this.setState(prevState => ({
      clicked: !prevState.clicked,
    }))
  }

  renameInput = (e) => {
    this.setState({
      renameValue: e.target.value,
    })
  }

  componentDidMount() {
    if (this.state.time.getHours() > 18) {
      this.setState({
        part: 'evening'
      })
    }
    else if (this.state.time.getHours() > 12) {
      this.setState({
        part: 'afternoon'
      })
    } else {
      this.setState({
        part: 'morning'
      })
    }
  }


  render() {
    const { tasks, nameUser, nameFocus } = this.props;
    const { clicked, indexInput, time, part, valueName, valueFocus } = this.state;

    return (
      <Grid
        className="list-wrapper"
        alignItems="center"
        justify="center"
        direction="column"
        container>
        <div className="content">
          <div className="time">{time.getHours() + ':' + time.getMinutes()}</div>
          {!nameUser ?
            <React.Fragment>
              <Typography>What is your name?</Typography>
              <input type="text" value={valueName} onChange={(e) => this.onChangeName(e)} />
              <Button onClick={this.rememberName}>Remember</Button>
            </React.Fragment>
            :
            <Typography>Good {part}, {nameUser}</Typography>}
          {nameUser && !nameFocus ?
            <div>
              <Typography>What is your main focus for today?</Typography>
              <input type="text" value={valueFocus} onKeyPress={this.handleKeyPress} onChange={(e) => this.onChangeFocus(e)} />
            </div>
            : nameUser && nameFocus ?
              <div>
                <Typography>Today</Typography>
                <Typography>{nameFocus}</Typography>
              </div>
              : null
          }
        </div>
        {!!nameUser && <div className="new-to-do">
          <Typography className='count'>{tasks.length || 0}&nbsp;TO DO</Typography>
          {!tasks.length ?
            <React.Fragment>
              <Typography>No todos yet</Typography>
              <Typography>Add a todo to get started</Typography>
            </React.Fragment>
            :
            <div className="list-to-do">
              {tasks.map((task, index) => (
                <div className="task" key={index}>
                  {clicked && index === indexInput ?
                    <div className="rename-task">
                      <input type="text" value={this.state.renameValue} onChange={this.renameInput} />
                      <Button onClick={() => this.doRename(index)}>OK</Button>
                    </div>
                    : <Typography onClick={() => this.openPoints(index)}>{index + 1}.{task.valueTask}</Typography>}
                  <Button onClick={() => this.doneTask(index)}>Done</Button>
                  <Button onClick={(e) => this.renameTask(index, e)}>Rename</Button>
                </div>
              ))}
            </div>
          }
          <div className="new-task">
            <input type="text" placeholder="New Todo" value={this.state.valueTask} onKeyPress={this.handleKeyPressTask} onChange={(e) => this.handleChange(e)} />
          </div>
        </div>}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const tasks = state.app.tasks ? state.app.tasks : null;
  const nameUser = state.users.user[0] ? state.users.user[0].valueName : null;
  const nameFocus = state.users.user[1] ? state.users.user[1].valueFocus : null;

  return {
    tasks,
    nameUser,
    nameFocus
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addTask, doneTask, renameValue, rememberName, rememberFocus }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);

