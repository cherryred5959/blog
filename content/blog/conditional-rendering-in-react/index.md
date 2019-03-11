---
title: Conditional Rendering In React
date: '2019-03-11T18:00:00.000Z'
description: A component-based approach to conditional rendering.
tags: ['react', 'hooks', 'conditional rendering']
---

The declarative approach of [React](https://reactjs.org) makes writing user interfaces easier than ever. In this post I will explain how to conditionally render things by using components.

## Conditional Rendering – The Classic Way

A common way to conditionally render something in React is by using inline `if` with logical `&&` operator:

```jsx
const UserNotifications = props => (
  <div>
    <h2>Hi {props.userName}!</h2>
    {props.unreadNotifications > 0 && (
      <p>You have {props.unreadNotifications} notifications.</p>
    )}
  </div>
);
```

If you have to render either `A` or `B` depending on a conditional statement, the [ternary conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) is often used:

```jsx
const UserLogStatus = props => (
  <div>
    <h2>Welcome to morello.dev</h2>
    {props.loggedIn ? (
      <button onClick={props.onLogOutClicked}>Log Out</button>
    ) : (
      <button onClick={props.onLogInClicked}>Log In</button>
    )}
  </div>
);
```

The techniques seen above are perfectly legal in React, but we can make use of component composition to make conditional rendering more elegant and easier to read.

## Conditional Rendering Using Component Composition

> For a refresh on component composition pattern in React, see [this post](https://www.robinwieruch.de/react-component-composition) by Robin Wieruch.
