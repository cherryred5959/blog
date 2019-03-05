---
title: Writing React Components in 2019
date: '2019-03-04T18:00:00.000Z'
description: Class and functional components are getting closer.
tags: ['react', 'hooks']
---

[React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) introduced Hooks, a way to use state and other React feature without writing a class. Let's see why they are super cool and how to use them!

## Writing Components – The Old (But Still Legit) Way

In React there exists two types of components: state*less* and state*ful* ones. The former render data passed as `props` from the outside:

```jsx
const Button = props => (
  <button onClick={props.onButtonClicked}>{props.text}</button>
);
```

while the latter mantain an internal `state`:

```jsx
class Counter {
  state = {
    count: 0
  };

  onCountAddClicked = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div className="Counter">
        <p>{this.state.count}</p>
        <button onClick={this.onCountAddClicked}>Add one</button>
      </div>
    );
  }
}
```

React updates the DOM when either `props` or `state` changes, so the UI is always kept in sync.

## Functional VS Class Components

So, functions are used to write stateless components, and classes are used to write stateful ones. This was The answer was yes, but this is not true anymore.

## Introducing Hooks 🎉

A lot has been said about hooks ([Dan Abramov](https://www.youtube.com/watch?v=dpw9EHDh2bM) had an excellent talk about them).

`video: https://www.youtube.com/watch?v=dpw9EHDh2bM`

Bla bla bla.
