📌 **Missed Day 10?** Last time I built my first CRUD application using React Hook Form, Local Storage, and `nanoid()`. It was the first project where I could create, update, and delete users while keeping the data even after refreshing the page. You can [**read it here**](https://dev.to/bismay-exe/day-10-of-learning-react-my-react-form-finally-became-a-real-crud-app-local-storage-create-49i4) and then come back. I'll wait. ☕️*

{% embed https://dev.to/bismay-exe/day-10-of-learning-react-my-react-form-finally-became-a-real-crud-app-local-storage-create-49i4 %}

---

Yesterday, I was feeling pretty confident.

I knew how to lift state up.

If two components needed the same data, I could simply move the state to their common parent and pass it down using props.

Problem solved.

...or at least that's what I thought.

Today I realized that lifting state isn't always enough.

As applications grow, passing the same props through multiple components starts becoming frustrating.

That's exactly why React gives us **Context API**.

---

## 🧠 Quick Recap

Here's what I already knew before today's lesson.

* State can live in a parent component.
* Child components receive data through props.
* Multiple components can share the same state by lifting it up.

That worked well for small examples.

But then I started wondering...

>> **What happens when the component that needs the data is several levels deeper?**

---

## 🤔 The Problem That Lifting State Couldn't Solve

On Day 7, I learned that components can share data by lifting state up.

That works really well...

until the component that needs the data is buried several levels deep.

Imagine this component tree:

```text
App
 ├── Component A
      ├── Component B
            ├── Component C
                  └── Component D
```

Now suppose **Component D** needs some data that's stored in **App**.

Without Context API, the data has to travel through every intermediate component.

```text
App
 ↓
Component A
 ↓
Component B
 ↓
Component C
 ↓
Component D
```

Even though Components A, B, and C don't actually use the data, they still have to receive it as props and pass it to the next component.

That pattern is called **Prop Drilling**.

For a small application, it isn't a huge problem.

But once the component tree starts growing, passing the same props through layer after layer quickly becomes difficult to manage.

That's the exact problem Context API is designed to solve.

---

## 🚀 Enter Context API

This is where Context API comes in.

Instead of sending props through every component,

React lets us create a **shared place** where multiple components can access the **same data**.

Then any component inside that tree can access it whenever it needs to.

My favorite way to think about it is this:

>> **I started thinking of Context API as a shared storage room that every component inside the same application can access.**

No more passing keys from one room to another.

---

## 🏗️ Creating a Context

The first thing I learned was that React needs a Context object.

```jsx
import { createContext } from "react";

export const MyShop = createContext();
```

`createContext()` creates the shared context.

At this point, it doesn't contain any data yet.

It's simply preparing a place where shared data can live.

---

## 📦 The Provider

Creating the context isn't enough.

React also needs to know **which components should have access to it.**

That's where the Provider comes in.

```jsx
<MyShop.Provider
  value={{
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
  }}
>
  {children}
</MyShop.Provider>
```

![Context Provider in my project](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/s5ixeue0w1jrs3r6lktu.png)
*The Provider makes shared state available to every component inside it.*

The Provider wraps part (or all) of the application.

Everything inside it can now access the shared values.

Instead of manually passing props everywhere,

React makes them available automatically.

---

## 🎣 Accessing Shared Data With `useContext()`

Now comes the easiest part.

Any child component can read shared data using `useContext()`.

For example:

```jsx
const { setCartItems } = useContext(MyShop);
```

That's it.

No prop drilling.

No forwarding props through multiple components.

The component simply asks React for the data.

I honestly thought,

"Wait... that's all?"

It felt much simpler than I expected.

---

## ⚙️ Putting Everything Together

After learning each piece individually, I realized Context API follows a pretty simple workflow.

First, create the context.

```jsx
export const MyShop = createContext();
```

Then wrap the part of the application that should have access to the shared data.

```jsx
<MyShop.Provider value={{ cartItems, setCartItems }}>
  <App />
</MyShop.Provider>
```

Finally, inside any child component, access that data with `useContext()`.

```jsx
const { cartItems } = useContext(MyShop);
```

That's really all there is to it.

Instead of memorizing three different APIs, I started thinking of Context API as one simple flow.

```text
Create Context
        ↓
Wrap Components with Provider
        ↓
Store Shared Values in value
        ↓
Read Them Anywhere Using useContext()
```

That mental model helped everything click for me.

---

## 🛒 My Shopping Cart Project

Today's class wasn't just theory.

We built a small shopping cart application.

![My shopping cart project before adding products](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/jx1cxu0e07jsx26kk7su.png)

*My shopping cart project before adding any products to the cart.*

The application had three main parts:

```text
App
 ├── Navbar
 ├── Product Cards
 └── Cart
```

The interesting part was this.

The **ProductCard** component needed to add items to the cart.

The **Cart** component needed to display those same items.

Instead of passing cart data through several components,

both of them simply accessed the same Context.

Adding a product looked like this:

```jsx
setCartItems((prev) => [...prev, product]);
```

And displaying the cart was just:

```jsx
const { cartItems } = useContext(MyShop);
```

![Cart after adding a product](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/8nlsurq63ju5r4xufxjx.png)

*After clicking **Add to Cart**, the product is instantly available in the Cart because both components are reading and updating the same Context.*

Both components were reading and updating the exact same state.

I started picturing it like this.

```text
ProductCard
      │
      │ Add Item
      ▼
Shared Context
      ▲
      │ Read Items
Cart
```

Neither component needed to pass props to the other.

They simply talked to the same Context.

That was the moment I understood why Context API exists.

---

## 🔄 How Data Flows

Here's the mental model I built while learning today.

```text
createContext()
        │
        ▼
Provider stores shared data
        │
        ▼
Components call useContext()
        │
        ▼
Access the same shared values
```

![Context API Diagram](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/kk6k4z3cfeqkx27osjko.png)
*This is the mental model I built while learning Context API.*

Once I pictured it this way,

Context API became much easier to understand.

---

## 🤔 Is Context API State Management?

At first, I assumed Context API was React's built-in state management solution.

After experimenting with it, I realized that's not really its job.

The actual state still comes from hooks like `useState()`.

Context API simply makes that state available to multiple components without passing props through every level of the component tree.

That small distinction cleared up a misunderstanding I had during today's lesson.

---

## 🤯 The Moment It Finally Clicked

At first, I kept thinking,

> "Couldn't I just keep passing props?"

Technically...

Yes.

React wouldn't stop me.

But then I imagined adding five or six more components between `App` and `Cart`.

Every one of those components would have to accept props they didn't even use.

That's when I finally understood that Context API isn't about making React do something impossible.

It's about making the code easier to work with as an application grows.

That small shift completely changed how I think about sharing data between components.

---

## 💡 My Biggest Takeaways

* Props work well until they have to travel through many components.
* Passing props through intermediate components is called **Prop Drilling**.
* `createContext()` creates a shared context.
* The **Provider** makes shared values available to child components.
* `useContext()` lets any component read those values directly.
* Context API helps share state—it doesn't replace `useState()`.

---

## 📚 Learning Source

I'm currently learning React through **React Cohort 3.0** by **Devendra Dhote** at Sheriyans Coding School.

This article is based on my own class notes, experiments, and understanding. It's written entirely in my own words to reinforce what I learned.

If I've misunderstood something, I'd genuinely appreciate any corrections in the comments.

---

## 🙌 Final Thoughts

Today's lesson answered a question I didn't even know I had.

On Day 7, lifting state up felt like the solution for sharing data.

Today I learned that it isn't always the final solution.

When data needs to travel through several layers of components, Context API gives React a much cleaner way to share it.

I'm sure I'll understand it even better as I build bigger projects, but for now, I finally understand **why Context API exists**.

And that feels like a big step forward in my React journey.

Tomorrow I'll continue exploring React and see what comes next.

See you on **Day 12!** 🚀

---

💬 **When did Context API finally "click" for you? Was it when you first learned about prop drilling, or when you built a real project that needed shared state?**

I'd love to hear your experience in the comments. 😊

If you're following along with this series, you can also find me on [**GitHub**](https://github.com/Bismay-exe), where I'll be sharing my projects and documenting my progress.

{% embed https://github.com/Bismay-exe %}
{% embed https://www.instagram.com/bismay.exe %}
{% embed https://dev.to/bismay-exe %}
{% embed https://www.linkedin.com/in/bismay-sundar-mahanta/ %}
{% embed https://x.com/Bismay_exe %}
{% embed  %}

<sub>🤖 **AI Disclosure:** This article is based on my own React learning journey, class notes, code experiments, and understanding. I used ChatGPT to help improve the writing, structure, and readability of this post. I reviewed and verified the technical explanations before publishing, and I take responsibility for everything shared here.</sub>

Thanks for reading! 🚀

---