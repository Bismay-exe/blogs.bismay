📌 *Missed Day 1? I covered why React exists, the Real DOM, Virtual DOM, and React Elements. You can* [*read it here*](https://bismay.hashnode.dev/day-1-of-learning-react) *and then come back. I'll wait. ☕*

* * *

Today was genuinely one of those sessions where you go in confused and come out feeling like you unlocked a new level.

Yesterday I learned *what* React does—it keeps a Virtual DOM in memory and updates only the parts of the Real DOM that actually changed.

Cool. Makes sense.

But one question kept bugging me all night:

> **How does React actually know what changed? 🤔**

Today's class answered that question. And honestly? It completely changed how I think about React.

Let's get into it. 🚀

* * *

## 🧠 Quick Recap

Yesterday we answered one question:

> *Why was React created?*

Here's what I took away from Day 1:

*   🔧 Manually updating the DOM in large apps becomes unmanageable.
    
*   💡 React introduced **UI = Function(State)**—we describe what we want, React handles the updates.
    
*   📦 A **React Element** is just a plain JavaScript object that *describes* UI. It's not a real DOM node.
    
*   🌳 The **Virtual DOM** is a lightweight copy of the UI that lives entirely in JavaScript memory.
    
*   ⚡ React compares changes in the Virtual DOM and updates only the necessary parts of the Real DOM.
    

Today we're answering a completely different question:

> *How does React actually update the UI?*

That's where today's journey begins. 🔽

* * *

## 🔄 Reconciliation — How React Knows What Changed

This is the concept that finally tied everything together for me.

I kept thinking, "Okay, React compares two trees. But... *how?* And what does that even look like?"

**Reconciliation** is React's process for figuring out what changed between two renders.

Here's how I think about it. 🖊️

Imagine you're editing an essay. You've got the original version and a revised version side by side. Instead of rewriting the entire essay, you scan through both versions and find only the sentences that actually changed. Then you update just those.

That's essentially what React does—except it's comparing two Virtual DOM trees.

When something changes in your app (say, a button click updates some text), React doesn't throw away the entire UI and rebuild it from scratch. Instead, it:

1.  Creates a **new** Virtual DOM tree based on the updated state.
    
2.  **Compares** it with the previous Virtual DOM tree.
    
3.  Figures out the **minimum set of changes** needed.
    
4.  Applies only those changes to the Real DOM.
    

Here's a small example. Let's say our component renders this:

```javascript
// Before state change
React.createElement("h1", {}, "Hello");
```

And after a state update, it renders this:

```javascript
// After state change
React.createElement("h1", {}, "Hello React");
```

React compares these two trees and realizes: "The `<h1>` element is the same type, but the text inside changed from `Hello` to `Hello React`. I only need to update the text content."

That comparison process? That's reconciliation. 🔄

But here's the thing—reconciliation is just the *strategy*. The actual comparison happens through something more specific.

* * *

## ⚡ Diffing Algorithm — The Engine Behind Reconciliation

So how does React actually compare two Virtual DOM trees?

That's where the **diffing algorithm** comes in.

If reconciliation is the *what* ("figure out what changed"), diffing is the *how* ("here's how I compare the two trees").

Now, this part surprised me. 🤯

Comparing two trees might sound simple, but it's actually a hard computer science problem. A generic algorithm to compare two trees has a time complexity of **O(n³)**—which means for a tree with 1,000 elements, it could take a *billion* operations.

That's way too slow for a UI library.

I paused the video here. I was like, "Wait... React does this on *every single update?* How is it fast?"

That's when I learned about React's clever trade-off. Instead of finding the *perfect* difference between two trees, the React team made a few practical assumptions that are almost always true in real-world applications. That keeps comparisons incredibly fast.

They built their diffing algorithm on two key assumptions:

### 1\. Different types? Different trees. 🔀

If React sees that a `<div>` changed to a `<section>`, it doesn't bother comparing their children. It destroys the old tree and builds a new one from scratch.

```javascript
// Before
React.createElement("div", {}, 
  React.createElement("p", {}, "Hello")
);

// After
React.createElement("section", {}, 
  React.createElement("p", {}, "Hello")
);
```

Even though the `<p>` inside is identical, React tears down the entire `<div>` subtree and creates a new `<section>` subtree. Different type = different tree. No questions asked.

### 2\. Same type? Compare what changed. 🔎

If the element type stays the same, React keeps the DOM node and only updates the attributes that actually changed.

```javascript
// Before
React.createElement("h1", { className: "title" }, "Hello");

// After
React.createElement("h1", { className: "title active" }, "Hello");
```

Here, the `<h1>` is still an `<h1>`. React keeps the same DOM node and only updates the `className`. Much more efficient. ⚡

### 3\. Keys help React identify list items 🔑

When rendering lists, React uses **keys** to track which items changed, moved, or were removed.

```javascript
items.map(item => 
  React.createElement("li", { key: item.id }, item.name)
);
```

I'll cover keys in more depth later in this series, but for now, just know they exist to help the diffing algorithm identify list items efficiently.

### 💡 The biggest misconception I had

I honestly thought React compared the Virtual DOM against the Real DOM.

That's wrong. ❌

React compares the **new Virtual DOM** against the **previous Virtual DOM**. The Real DOM is never part of the comparison. It only gets involved later, when React applies the changes.

That distinction seems small, but once I understood it, the entire mental model just... clicked. 🧩

Thanks to these assumptions, React's diffing algorithm runs in **O(n)** time—one pass through the tree. That's what makes it fast enough for real-time UI updates.

So now React knows exactly what changed. But it hasn't touched the Real DOM yet.

What happens next? 🤔

* * *

## 🎬 Render Phase — Planning, Not Painting

This is where things got really interesting for me.

When I first heard "Render Phase," I assumed it meant React was drawing things on the screen.

Nope. Not even close. 😅

The **Render Phase** is a planning phase. React calls your components, builds the new Virtual DOM tree, and runs the diffing algorithm to figure out what needs to change. But it **does not touch the Real DOM** during this phase.

Think of it like an architect creating a blueprint. 📐 The architect plans every room, every wall, every window—but no construction has started yet. The Render Phase is React creating that blueprint.

Here's what happens step by step:

1.  Something triggers a re-render (state change, prop change, etc.)
    
2.  React calls your component function again.
    
3.  Your component returns new React Elements.
    
4.  React builds a new Virtual DOM tree from those elements.
    
5.  React diffs the new tree against the previous tree.
    
6.  React produces a list of changes that need to be applied.
    

Let me show a simple example:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);

  return React.createElement(
    "div",
    {},
    React.createElement("p", {}, "Count: " + count),
    React.createElement(
      "button",
      { onClick: () => setCount(count + 1) },
      "Increment"
    )
  );
}
```

When you click "Increment," React enters the Render Phase:

*   It calls `Counter()` again with the new state (`count = 1`).
    
*   It gets back a new tree where the `<p>` now says "Count: 1" instead of "Count: 0".
    
*   It diffs this against the old tree.
    
*   It notes: "Only the text inside `<p>` changed."
    

At this point, the screen still shows "Count: 0". Nothing visible has changed yet. 👀

I tried wrapping my head around this by opening VS Code and console-logging inside a component. The function runs again on every re-render—but the screen doesn't update until later. That's the Render Phase in action.

That leads us to the next phase.

* * *

## ✅ Commit Phase — Where the Real DOM Actually Changes

The **Commit Phase** is where React actually applies the changes to the Real DOM.

If the Render Phase is the architect drawing blueprints, the Commit Phase is the construction crew showing up and doing the work. 🏗️

During this phase, React takes the list of changes it prepared during the Render Phase and makes the actual DOM updates:

*   Adding new DOM nodes
    
*   Removing old DOM nodes
    
*   Updating attributes, text content, or event listeners
    

For our counter example, the Commit Phase would:

1.  Find the `<p>` DOM node.
    
2.  Update its text content from "Count: 0" to "Count: 1".
    

That's it. One targeted update instead of rebuilding the entire page. ✨

Here's the key difference between the two phases:

|  | 🎬 Render Phase | ✅ Commit Phase |
| --- | --- | --- |
| **What it does** | Plans changes | Applies changes |
| **Touches the DOM?** | ❌ No | ✅ Yes |
| **Can be paused?** | ✅ Yes | ❌ No |
| **Output** | List of changes | Updated DOM |

Notice that the Render Phase can be paused—I'll explain why that matters when we get to Fiber. 🧵

The Commit Phase is synchronous. Once React starts applying changes to the DOM, it finishes all of them in one go without interruption.

But even after the Commit Phase, we're not done. The DOM has been updated, but you still can't see anything different on screen. Something else needs to happen.

* * *

## 🎨 Browser Paint — From DOM to Pixels

Before today, I thought React drew everything on the screen.

Turns out... React never paints a single pixel.

The browser does.

React's job ends after updating the DOM. That was a surprisingly big realization for me.

After React updates the DOM in the Commit Phase, the **browser** takes over. Now it needs to turn those DOM changes into actual pixels on your screen.

This happens in three steps:

📐 **Layout** — The browser calculates the size and position of every element. If you changed the text inside a `<p>`, the browser recalculates how much space that paragraph needs, and whether anything around it shifts.

🎨 **Paint** — The browser fills in the pixels. It draws the text, backgrounds, borders, shadows—everything visual.

🧩 **Composite** — The browser combines different layers (if any) into the final image you see on screen. Think of it like stacking transparent sheets on top of each other.

The important thing I realized today is:

> **React updates the DOM. The browser paints the pixels. They're two separate steps.** 💡

React can't directly draw on the screen. It can only modify the DOM. The browser's rendering engine handles the rest.

That's why React focuses so hard on making minimal DOM changes—because every change triggers the browser's layout, paint, and composite pipeline. Fewer changes = less work for the browser = smoother experience for the user. 🚀

* * *

## 🔁 The Complete React Update Cycle

Now let's put everything together.

This was the moment everything connected for me.

Until now, I had been learning these concepts individually. Reconciliation. Diffing. Render Phase. Commit Phase. Browser Paint. They all made sense on their own, but I couldn't see how they fit together.

Then I drew this out on paper during the class, and suddenly the entire system clicked. ✨

When something changes in a React app, here's the full journey:

```text
  State Change
       ↓
  Render Phase  (React calls components, builds new Virtual DOM)
       ↓
  Reconciliation  (Compare new vs old Virtual DOM)
       ↓
  Diffing  (Find minimum changes)
       ↓
  Commit Phase  (Apply changes to Real DOM)
       ↓
  Browser Paint  (Layout → Paint → Composite)
       ↓
  Pixels on Screen ✨
```

Every single update—whether it's a button click, a form input, or data arriving from an API—follows this exact same cycle.

Seeing them as one continuous pipeline completely changed my mental model of React. It stopped feeling like magic and started making sense as a system.

But there's one more thing I learned today that tied everything together even further. 🧵

* * *

## 🧵 React Fiber — Why React Never Freezes Anymore

When I first heard "Fiber," I honestly thought, "Great... another React buzzword."

Turns out it's one of the most important architectural changes React has ever made. This section completely changed how I think about React's internals.

Before React 16 (released in 2017), React's rendering was **synchronous**. When React started rendering, it went through the entire component tree in one shot. It couldn't stop. It couldn't pause. It couldn't prioritize.

Imagine you're watching a movie and you can't pause it. 🎬 Not even to answer the door. Not even if your house is on fire. You have to watch the entire thing from start to finish before you can do anything else.

That was React before Fiber.

For small apps, this was fine. But for large applications with complex component trees, a single render could take a while. During that time, the browser was completely blocked—no scrolling, no typing, no animations. Everything froze until React finished. 🥶

I remember thinking, "Wait, React was like that? How did anyone build large apps with it?"

That's the problem **React Fiber** was built to solve.

Fiber is a complete rewrite of React's core algorithm, introduced in React 16. It didn't change *what* React does—it changed **how** React does it.

With Fiber, React can:

*   ⏸️ **Pause** rendering work and come back to it later.
    
*   🎯 **Prioritize** different types of updates. A user typing in a text field is more urgent than a background data fetch.
    
*   ▶️ **Resume** work that was paused without starting over.
    
*   🗑️ **Abort** work that's no longer needed.
    

Think of it like switching from watching a DVD (can't pause) to streaming on Netflix (pause, rewind, skip, switch to a different show, come back later). 📺

The key insight is that Fiber makes React's Render Phase **interruptible**. Remember how I said the Render Phase can be paused? That's because of Fiber. 💡

The Commit Phase is still synchronous—once React starts applying changes to the DOM, it finishes without interruption. But the planning phase (Render Phase) can now be broken into chunks and spread across multiple frames, keeping the browser responsive.

This is why modern React apps feel snappy even when dealing with complex updates. Fiber ensures that React never hogs the main thread for too long. ⚡

* * *

## ⚖️ Virtual DOM vs Fiber — They're Not the Same Thing

This was confusing for me at first. I kept thinking: "Wait, did Fiber replace the Virtual DOM? Are they the same thing?"

Nope. They're different concepts that work together. 🤝

|  | 🌳 Virtual DOM | 🧵 React Fiber |
| --- | --- | --- |
| **What it is** | A JavaScript representation of the UI | React's reconciliation engine |
| **Purpose** | Describes what the UI should look like | Manages how and when updates happen |
| **Introduced** | React's original design | React 16 (2017) |
| **Handles** | UI structure (the "what") | Scheduling & prioritization (the "how") |

Here's how they work together:

The **Virtual DOM** is still the concept—React keeps a lightweight JavaScript copy of your UI in memory and compares it to find changes. 🌳

**Fiber** is the engine that *performs* that comparison. It's the system that walks through the Virtual DOM tree, does the diffing, and decides when and how to apply updates to the Real DOM. 🧵

So the Virtual DOM is the *data structure* and Fiber is the *algorithm* that operates on it.

They're not competing concepts. Fiber is the reason the Virtual DOM approach works efficiently at scale. ⚖️

* * *

## 💡 My Biggest Takeaways Today

*   🔄 **Reconciliation** is React's strategy—compare two Virtual DOM trees and find the minimum changes.
    
*   ⚡ The **diffing algorithm** runs in O(n) time because of two smart assumptions about how UIs typically change.
    
*   🎬 The **Render Phase** is just planning. No DOM changes happen here.
    
*   ✅ The **Commit Phase** is where React actually updates the Real DOM.
    
*   🧵 **Fiber** makes the Render Phase interruptible, so React never freezes the browser.
    

* * *

## 📚 Learning Source

I'm currently learning React through the **React Cohort 3.0** by **Devendra Dhote** at **Sheriyans Coding School**.

This article isn't a copy of the course.

It's my personal understanding after today's class, rewritten entirely in my own words.

Writing these articles helps me reinforce what I've learned, and hopefully helps other beginners who are on the same journey. 🤝

If I've misunderstood something, I'd genuinely appreciate your corrections in the comments. 😊

* * *

## 🙌 Final Thoughts

Day 2 gave me a much deeper appreciation for what's happening behind the scenes in React.

Yesterday I understood the *what*. Today I understood the *how*. And honestly, that shift in understanding makes me way more excited to keep going. 🔥

Tomorrow I'm moving to **Day 3**, where I'll finally start getting hands-on:

*   ✏️ JSX
    
*   ⚡ Vite
    
*   📁 Project Structure
    
*   🧩 Fragments
    
*   🔒 Strict Mode
    

I've been dying to write actual React code instead of just learning theory. Day 3 is where it gets real. 💻

See you there! 🚀

* * *

💬 **When you first learned about React's update cycle, what was the hardest part to wrap your head around—Reconciliation, Fiber, or something else entirely?**

I'd love to hear your experience in the comments. 😊

If you're following along with this series, you can also find me on [**GitHub**](https://github.com/Bismay-exe), where I'll be sharing my projects and documenting my progress.

Thanks for reading! 🚀

* * *

Originally published at [**Dev.to**](https://dev.to/bismay-exe/day-2-of-learning-react-reconciliation-diffing-algorithm-render-phase-commit-phase-react-4f0f) on June 23, 2026.