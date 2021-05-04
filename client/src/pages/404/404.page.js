import React from 'react';
import ChromeDinoGame from 'react-chrome-dino';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="">
        <h1>Sorry!</h1>
        <h2>We can't seem to find the page you are looking for.</h2>
        <ChromeDinoGame />
      </div>
    );
  }
}
