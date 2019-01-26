import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchForm from './SearchForm';
import JokesList from './JokesList'
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      jokes: [],
      isFetchingJokes: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit = 20) {
    this.setState({ isFetchingJokes: true });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        this.setState({
          jokes,
          isFetchingJokes: false
        });
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  renderJokes() {
    return (
      <ul className="jokes-list">
        {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <img className="logo" alt="logo" src={require('./images/skull.png')} />

        <SearchForm
          onFormSubmit={this.searchJokes}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
        />

        {this.state.isFetchingJokes
          ? 'searching for jokes...'
          : this.renderJokes()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
