📌 *Missed Day 2? I covered how React updates the UI internally—Reconciliation, the Diffing Algorithm, Render Phase, Commit Phase, Browser Paint, and React Fiber. You can [read it here](https://dev.to/bismay-exe/day-2-of-learning-react-reconciliation-diffing-algorithm-render-phase-commit-phase-react-4f0f) and then come back. I'll wait. ☕️*
{% embed https://dev.to/bismay-exe/day-2-of-learning-react-reconciliation-diffing-algorithm-render-phase-commit-phase-react-4f0f %}

---

Yesterday I finally understood **how React updates the UI.**

I thought that was enough.

But today's class made me realize I was still treating React like magic.

Every time I typed:

```bash
npm run dev
```

my project just started.

I never stopped to ask what actually happens after pressing Enter. 🤔

Today's session answered that question—and along the way, I also learned why JSX exists, how components communicate through props, and what a bundler is actually doing behind the scenes.

Let's dive in. 🚀

---

## 🧠 Quick Recap

Yesterday, we answered one big question:

> **How does React update the UI?**

Here's what I took away from **Day 2**:

* 🔄 **Reconciliation** is React's strategy for comparing two Virtual DOM trees.
* ⚡ The **Diffing Algorithm** efficiently finds the minimum set of changes.
* 🎬 The **Render Phase** is where React plans the updates—it doesn't touch the DOM yet.
* ✅ The **Commit Phase** is where those changes are applied to the Real DOM.
* 🎨 Finally, the **browser** handles Layout, Paint, and Composite to display everything on the screen.
* 🧵 **React Fiber** makes the Render Phase interruptible, allowing React to keep applications responsive.

Yesterday was all about **how React updates the UI.**

Today, we're answering a different question:

> **What actually happens from the moment we type `npm run dev` until our React app appears in the browser? 🤔**

And along the way, I finally understood **JSX, bundlers, components, and props.**

That's where today's journey begins. 🔽

---

## 💡 The Biggest Lesson of Today

One realization stood out above everything else:

> **React isn't magic. It's just a collection of tools working together in a smart way.**

When I first saw React code, I imagined there was some hidden engine doing impossible things.

But after learning about bundlers, JSX, transpilation, and rendering, I realized that every step has a purpose.

Once you understand those steps, React becomes much easier to learn.

---

## What Really Happens When You Run `npm run dev`?

Before today, I thought this command simply "started React."

```bash
npm run dev
```

Turns out, **a lot happens behind the scenes.**

Here's the simplified flow that finally made sense to me:

```plaintext
npm run dev
        │
        ▼
 Development Server Starts
        │
        ▼
 Bundler Processes Files
        │
        ▼
 JSX is Transpiled
        │
        ▼
 JavaScript is Bundled
        │
        ▼
 Browser Executes the Bundle
        │
        ▼
 React Creates/Updates the DOM
```

Seeing this pipeline helped me understand that React isn't directly executed by the browser.

The browser only understands **JavaScript**, **HTML**, and **CSS**.

Everything else has to be converted first.

---

## ⚙️ What Really Happens When I Run npm run dev?

When I type:

```bash
npm run dev
```

I'm not actually starting React itself.

Instead, I'm starting a **development server**, usually powered by tools like **Vite**.

This server:

* Watches my files
* Rebuilds the project when I save
* Refreshes the browser automatically
* Makes development much faster

This is why changes appear almost instantly without manually refreshing the page.

---

## 📦 Bundlers — The Part I Never Thought About

This was one of my favorite topics today.

A **bundler** collects all the files in a project and combines them into something the browser can understand efficiently.

Imagine a React project with:

```plaintext
App.jsx
Navbar.jsx
Footer.jsx
Button.jsx
styles.css
utils.js
```

Instead of sending dozens of separate files to the browser, the bundler organizes and prepares them into optimized bundles.

Popular bundlers include:

* Vite (uses esbuild during development and Rollup for production)
* Webpack
* Parcel
* Rollup

Without bundlers, managing large applications would be much more difficult.

---

## 🤯 JSX Isn't HTML... and It Isn't JavaScript Either

This surprised me the most.

I used to think JSX was just JavaScript.

It's not.

Consider this code:

```jsx
function App() {
  return <h1>Hello React!</h1>;
}
```

Browsers don't understand:

```jsx
<h1>Hello React!</h1>
```

Something has to convert it first.

That's where **Babel** (or another JSX transformer) comes in.

It transforms JSX into regular JavaScript.

Conceptually, it becomes something like:

```javascript
function App() {
  return React.createElement("h1", null, "Hello React!");
}
```

The browser can execute the transformed JavaScript, not the original JSX.

Understanding this made JSX feel much less "magical."

---

## ✨ JSX Makes UI Easier to Read

Even though JSX is transformed behind the scenes, it makes code much more readable.

Instead of writing lots of `createElement()` calls, we can write something that looks like HTML.

Example:

```jsx
function Welcome() {
  return (
    <div>
      <h2>Welcome 👋</h2>
      <p>I'm learning React!</p>
    </div>
  );
}
```

It's cleaner, easier to understand, and much more enjoyable to work with.

---

## 🧩 Components — Finally, They Clicked

Another concept that clicked today was **components**.

Instead of creating one giant HTML page, React encourages breaking the UI into small reusable pieces.

Example:

```jsx
function Header() {
  return <h1>My Blog</h1>;
}

function Footer() {
  return <footer>Made with ❤️</footer>;
}

function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
```

This approach makes applications:

* Easier to read
* Easier to maintain
* Easier to reuse
* Easier to test

I can already see why React applications stay organized even as they grow.

---

## 📨 Props — How Components Talk to Each Other

Components become much more powerful when they receive data.

That's where **props** come in.

Here's a simple example:

```jsx
function Greeting(props) {
  return <h2>Hello, {props.name} 👋</h2>;
}

function App() {
  return (
    <>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </>
  );
}
```

Instead of creating three different greeting components, we create one reusable component and pass different values through props.

This was my first glimpse into how React promotes reusable code.

---

## 🧠 My Mental Model of React So Far

After today's learning, here's how I now think about React:

```plaintext
Component
      │
      ▼
Returns JSX
      │
      ▼
JSX is Transformed
      │
      ▼
JavaScript Executes
      │
      ▼
React Creates UI
      │
      ▼
Browser Displays It
```

Breaking the process into steps makes it far less intimidating.

---

## 🌳 The Final Step — React Still Ends Up Updating the DOM

One question I had was:

> "If something changes, does React rebuild the whole page?"

The answer is **no**.

React figures out **what actually changed** and updates only those parts of the page.

For example, if only a counter value changes:

```plaintext
Counter: 5
```

React doesn't recreate the entire application.

It updates only the specific element that changed, making applications faster and more efficient.

This efficient update strategy is one reason React feels so responsive.

---

## 💡 My Biggest Takeaways

Today's session taught me that learning React isn't just about memorizing syntax.

It's about understanding the journey from writing code to seeing something on the screen.

Here are the ideas that stuck with me the most:

- ⚙️ `npm run dev` does much more than simply "run React."
- 📦 Bundlers organize and optimize our application before it reaches the browser.
- ✨ JSX isn't valid JavaScript—it gets transformed before execution.
- 🧩 Components make building UIs modular and reusable.
- 📨 Props allow components to communicate by passing data.
- 🌳 Understanding what happens behind the scenes makes React feel far less magical.

These concepts have given me a much stronger foundation for the topics I'll learn next.

---

## 🚀 What's Next?

I'm excited to continue exploring React.

The next concepts on my list include:

* State
* Event handling
* Hooks like `useState`
* Rendering lists
* Conditional rendering
* Building small projects

I know there will be challenges ahead, but understanding the fundamentals has made me much more confident.

---

## 🙌 Final Thoughts

Day 3 wasn't about building flashy applications—it was about building understanding.

Before today, commands like `npm run dev` and concepts like JSX felt like magic. Now, I can see the moving parts behind the scenes. Knowing that a development server starts, a bundler prepares my files, JSX gets transformed into JavaScript, and React updates the DOM step by step has made the framework feel much more approachable.

I've realized that becoming a better developer isn't just about making things work. It's about understanding **why** they work. That mindset is something I want to carry throughout my entire learning journey.

If you're just starting React too, don't rush through the basics. The deeper your foundation, the easier everything else becomes.

Thanks for reading! If you're on your own React journey, I'd love to hear what clicked for you recently. Let's keep learning together, one component at a time. 🚀💙

---

## 📚 Learning Source

I'm currently learning React through the **React Cohort 3.0** by **Devendra Dhote** at **Sheriyans Coding School**.

This article isn't a copy of the course.

It's my personal understanding after today's class, rewritten entirely in my own words.

Writing these articles helps me reinforce what I've learned, and hopefully helps other beginners who are on the same journey. 🤝

If I've misunderstood something, I'd genuinely appreciate your corrections in the comments. 😊

---

💬 **When you first started React, which concept confused you the most—JSX, components, props, or understanding what `npm run dev` actually does?**

I'd love to hear your experience in the comments. 😊

If you're following along with this series, you can also find me on [**GitHub**](https://github.com/Bismay-exe), where I'll be sharing my projects and documenting my progress.

{% embed https://github.com/Bismay-exe %}

<sub>🤖 **AI Disclosure:** This article is based on my own React learning journey, class notes, code experiments, and understanding. I used ChatGPT to help improve the writing, structure, and readability of this post. I reviewed and verified the technical explanations before publishing, and I take responsibility for everything shared here.</sub>

Thanks for reading! 🚀

---