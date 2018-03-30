import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function formatDate(date) {
  return date.toLocaleDateString();
}

//TodoItems
class TodoItems extends React.Component {
  constructor(props) {
  super(props);

  this.createTasks = this.createTasks.bind(this);
}

delete(key) {
  this.props.delete(key);
}

  createTasks(item) {
    return <li onClick={() => this.delete(item.key)}
                key={item.key}>{item.text}</li>
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};

//Todolist
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  addItem(e) {
  if (this._inputElement.value !== "") {
    var newItem = {
      text: this._inputElement.value,
      key: Date.now()
    };

    this.setState((prevState) => {
      return {
        items: prevState.items.concat(newItem)
      };
    });

    this._inputElement.value = "";
  }

  console.log(this.state.items);

  e.preventDefault();
}


  render() {
    return (
      <div className="main">
      <div className="header" >
      <form onSubmit={this.addItem}>
        <label>
          List Name:
          <input ref={(a) => this._inputElement = a} type="text" placeholder="mmasukan list" />
        </label>
        <input type="submit" value="Add list" />
      </form>
       <TodoItems entries={this.state.items}
                delete={this.deleteItem}/>
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root1')
);
