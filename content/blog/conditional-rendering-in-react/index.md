---
title: Conditional Rendering In React
date: '2019-03-11T18:00:00.000Z'
description: A component composition-based approach to conditional rendering.
tags: ['react', 'hooks', 'conditional rendering', 'component composition']
---

The declarative approach of [React](https://reactjs.org) makes writing user interfaces easier than ever. In this post, I will explain how to conditionally render things by using components.

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

We can use the component composition pattern to conditionally render parts of UI. Let's see how!

> For a refresh on component composition pattern in React, see [this post](https://www.robinwieruch.de/react-component-composition) by Robin Wieruch.

### Conditional Components

Every if-then-else code block consists of two parts: the logical condition that has to be evaluated and the components to be conditionally rendered.

We can go further with this consideration by turning the if-then-else block into `If`, `Then` and `Else` components. We pass the condition as props to `If`, and we put `Then` and `Else` inside it. The `Then` component contains the stuff to render when the condition evaluates to `true`, and the `Else` component contains the stuff to render when the condition evaluates to `false`:

```jsx
const UserLogStatus = props => (
  <If condition={props.loggedIn}>
    <Then>
      <button onClick={props.onLogOutClicked}>Log Out</button>
    </Then>
    <Else>
      <button onClick={props.onLogInClicked}>Log In</button>
    </Else>
  </If>
);
```

Everything sounds cool, but how could we implement the `If`, `Then` and `Else` components? Challenge yourself and try to come out with a solution 💡
