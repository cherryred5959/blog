---
title: The Future Of React
date: '2019-03-05T18:00:00.000Z'
description: The best is yet to come.
tags: ['react', 'hooks', 'roadmap']
---

[React 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) introduced Hooks, a way to use state and other React feature without writing a class. Let's see why they are super cool and how to use them!

## Writing components – The old (but still legit) way

If you have ever used React, you know that there exists two types of components: state*less* and state*ful* ones. The former render data passed as `props` from the outside:

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
