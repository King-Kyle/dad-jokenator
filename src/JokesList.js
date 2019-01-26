import React from 'react';
import './JokesList.css';

export class JokeList extends React.Component {




  render() {
    return (
      <ul className="jokes-list">
      {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
      </ul>
    );
  }


}
