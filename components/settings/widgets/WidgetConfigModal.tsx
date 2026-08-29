'use client'

import React, { useState, useEffect } from 'react'
import {
    X,
    Save,
    Code2,
    Palette,
    FileText,
    Settings,
    Tag,
} from 'lucide-react'
import { WidgetInstance } from '@/lib/widgets-settings'
import { renderWidgetComponent } from '@/app/blogs/[slug]/components/sections/RightLayout'
import { WidgetErrorBoundary } from '@/app/blogs/[slug]/components/sections/rightLayout/WidgetErrorBoundary'
import { interpolateTokens } from '@/app/blogs/[slug]/components/sections/rightLayout/CustomHtmlWidget'
import ArticleBody from '@/components/blog/article/ArticleBody'

interface WidgetConfigModalProps {
    widget: WidgetInstance | null
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, updated: Partial<WidgetInstance>) => void
}

const SAMPLE_ARTICLE = {
    title: '🚀 Deep Dive: Building Modular Systems in Next.js',
    slug: 'modular-systems-in-nextjs',
    category: 'Architecture',
    readingTimeMinutes: 8,
    date: 'Feb 24, 2026',
    tags: ['React', 'Next.js', 'WebDev'],
}

const SNIPPETS = [
    {
        name: '💡 Reflection & Checkpoint',
        html: `<div class="reflection-widget relative w-full overflow-hidden rounded-3xl border border-sec/20 bg-bg transition-all duration-500 font-sans text-fg">
    <div class="relative p-6 sm:p-8">
        <div class="flex items-start justify-between gap-6">
            <div>
                <p class="text-sm text-sec">
                    Before continuing, take a second.
                </p>

                <h3 class="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    Does re-rendering actually mean changing the DOM?
                </h3>
            </div>

            <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-bg transition-transform duration-500 reflection-orb"
            >
                ?
            </div>
        </div>

        <button
            type="button"
            class="reflection-button mt-7 inline-flex items-center gap-2 text-sm font-medium text-fg transition-opacity hover:opacity-60 cursor-pointer"
        >
            <span class="reflection-button-text">See the answer</span>

            <svg
                class="reflection-arrow h-4 w-4 transition-transform duration-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M5 12H19"></path>
                <path d="M13 6L19 12L13 18"></path>
            </svg>
        </button>
    </div>

    <!-- Answer -->
    <div
        class="reflection-answer grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
    >
        <div class="min-h-0 overflow-hidden">
            <div
                class="reflection-answer-content border-t border-sec/20 px-6 opacity-0 transition-all duration-500 sm:px-8"
            >
                <div class="max-w-2xl py-7">
                    <p class="text-lg leading-relaxed text-sec">
                        Not necessarily. A re-render lets React calculate what the UI should look like next. The actual DOM only changes when React finds a difference between the previous and new result.
                    </p>

                    <div
                        class="mt-6 h-px w-16 bg-accent transition-all duration-700 reflection-line"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</div>`,
        css: `/* Reflection widget styles */`,
        js: `const button = container.querySelector('.reflection-button');
const buttonText = container.querySelector('.reflection-button-text');
const answer = container.querySelector('.reflection-answer');
const answerContent = container.querySelector('.reflection-answer-content');
const arrow = container.querySelector('.reflection-arrow');
const orb = container.querySelector('.reflection-orb');
const widget = container.querySelector('.reflection-widget');

if (button && widget) {
    button.addEventListener('click', () => {
        const isOpen = widget.classList.toggle('is-open');

        if (isOpen) {
            answer.classList.remove('grid-rows-[0fr]');
            answer.classList.add('grid-rows-[1fr]');
            answerContent.classList.remove('opacity-0');
            answerContent.classList.add('opacity-100');
            arrow.classList.add('rotate-90');
            orb.classList.add('rotate-[180deg]', 'scale-110');
            buttonText.textContent = 'Hide answer';
        } else {
            answer.classList.remove('grid-rows-[1fr]');
            answer.classList.add('grid-rows-[0fr]');
            answerContent.classList.remove('opacity-100');
            answerContent.classList.add('opacity-0');
            arrow.classList.remove('rotate-90');
            orb.classList.remove('rotate-[180deg]', 'scale-110');
            buttonText.textContent = 'See the answer';
        }
    });
}`,
    },
    {
        name: '✨ Assumption Flip Card',
        html: `<div class="idea-widget group relative h-[380px] w-full overflow-hidden rounded-[2rem] border border-sec/20 bg-bg font-sans text-fg">
    <!-- Moving glow -->
    <div
        class="idea-glow pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[80px] transition-transform duration-75"
    ></div>

    <!-- Background grid -->
    <div
        class="pointer-events-none absolute inset-0 opacity-[0.07]"
        style="background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 32px 32px;"
    ></div>

    <!-- Main state -->
    <div
        class="idea-front absolute inset-0 flex flex-col justify-between p-7 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] cursor-pointer"
    >
        <div class="flex items-center justify-between">
            <span class="text-sm text-sec">
                A small experiment
            </span>

            <span
                class="flex h-9 w-9 items-center justify-center rounded-full border border-sec/20 text-fg transition-transform duration-500 group-hover:rotate-90"
            >
                +
            </span>
        </div>

        <div>
            <h3
                class="max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-fg sm:text-6xl"
            >
                What happens if you change the assumption?
            </h3>

            <p class="mt-5 max-w-md text-base leading-relaxed text-sec">
                Click anywhere on this card and explore the idea hiding underneath.
            </p>
        </div>
    </div>

    <!-- Revealed state -->
    <div
        class="idea-back absolute inset-0 translate-y-full bg-accent p-7 text-bg transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
    >
        <div class="flex h-full flex-col justify-between">
            <button
                type="button"
                class="idea-close ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-bg/10 text-xl text-bg transition-transform hover:rotate-90 cursor-pointer"
            >
                ×
            </button>

            <div>
                <p class="max-w-2xl text-2xl font-medium leading-snug sm:text-4xl">
                    A re-render is not the same thing as a DOM update.
                </p>

                <p class="mt-5 max-w-xl text-base leading-relaxed text-bg/70">
                    React can run your component again, compare the result with the previous UI, and decide that nothing in the real DOM needs to change.
                </p>
            </div>

            <div class="flex items-center gap-3 text-sm text-bg/60">
                <span class="h-px flex-1 bg-bg/30"></span>
                <span>tap to close</span>
            </div>
        </div>
    </div>
</div>`,
        css: `/* Assumption card styles */`,
        js: `const widget = container.querySelector('.idea-widget');
if (widget) {
    const glow = widget.querySelector('.idea-glow');
    const front = widget.querySelector('.idea-front');
    const back = widget.querySelector('.idea-back');
    const close = widget.querySelector('.idea-close');

    widget.addEventListener('mousemove', (event) => {
        const rect = widget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (glow) {
            glow.style.left = \`\${x}px\`;
            glow.style.top = \`\${y}px\`;
        }
    });

    if (front && back) {
        front.addEventListener('click', () => {
            back.classList.remove('translate-y-full');
            front.classList.add('-translate-y-8', 'scale-[0.96]', 'opacity-0');
        });
    }

    if (close && front && back) {
        close.addEventListener('click', (event) => {
            event.stopPropagation();
            back.classList.add('translate-y-full');
            front.classList.remove('-translate-y-8', 'scale-[0.96]', 'opacity-0');
        });
    }
}`,
    },
    {
        name: '🌱 Idea Garden Canvas',
        html: `<div class="idea-garden relative w-full min-h-[420px] overflow-hidden rounded-[2rem] border border-sec/20 bg-bg p-6 sm:p-8 font-sans text-fg">
    <!-- Header -->
    <div class="relative z-10 flex items-start justify-between gap-6">
        <div>
            <h3 class="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Keep the useful ideas.
            </h3>

            <p class="mt-2 max-w-md text-sm leading-relaxed text-sec">
                Some ideas are worth collecting before you move on.
            </p>
        </div>

        <span class="idea-count text-sm text-sec">
            0 ideas
        </span>
    </div>

    <!-- Canvas -->
    <div class="idea-canvas relative mt-8 h-[240px] rounded-2xl border border-dashed border-sec/20 bg-sec/[0.03]">
        <div class="idea-empty absolute inset-0 flex items-center justify-center px-6 text-center">
            <p class="max-w-xs text-sm leading-relaxed text-sec">
                Start with one thought. See where it goes.
            </p>
        </div>
    </div>

    <!-- Controls -->
    <div class="relative z-10 mt-5 flex items-center justify-between">
        <button
            type="button"
            class="idea-add inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
        >
            <span class="text-lg leading-none">+</span>
            Add a thought
        </button>

        <button
            type="button"
            class="idea-clear hidden text-sm text-sec transition-colors hover:text-fg cursor-pointer"
        >
            Clear all
        </button>
    </div>
</div>`,
        css: `/* Idea Garden styles */`,
        js: `const widget = container.querySelector('.idea-garden');
if (widget) {
    const canvas = widget.querySelector('.idea-canvas');
    const addButton = widget.querySelector('.idea-add');
    const clearButton = widget.querySelector('.idea-clear');
    const emptyState = widget.querySelector('.idea-empty');
    const count = widget.querySelector('.idea-count');

    const ideas = [
        'Wait, that actually makes sense.',
        'Try the simpler version first.',
        'What problem am I actually solving?',
        'This changes how I think about it.',
        'Maybe the constraint is the answer.',
        'Keep this one.',
        'There is probably a better question.',
        'Small change. Different result.'
    ];

    let ideaCount = 0;

    function updateCount() {
        if (count) count.textContent = \`\${ideaCount} \${ideaCount === 1 ? 'idea' : 'ideas'}\`;
        if (ideaCount > 0) {
            if (emptyState) emptyState.classList.add('opacity-0');
            if (clearButton) clearButton.classList.remove('hidden');
        } else {
            if (emptyState) emptyState.classList.remove('opacity-0');
            if (clearButton) clearButton.classList.add('hidden');
        }
    }

    function addIdea() {
        if (!canvas) return;
        const note = document.createElement('button');
        const text = ideas[Math.floor(Math.random() * ideas.length)];
        const x = 8 + Math.random() * 55;
        const y = 8 + Math.random() * 55;
        const rotation = -7 + Math.random() * 14;

        note.type = 'button';
        note.textContent = text;
        note.className = 'idea-note absolute max-w-[180px] rounded-2xl border border-sec/20 bg-bg px-4 py-3 text-left text-sm leading-relaxed text-fg shadow-sm transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer';

        note.style.left = \`\${x}%\`;
        note.style.top = \`\${y}%\`;
        note.style.transform = \`rotate(\${rotation}deg) scale(0.7)\`;
        note.style.opacity = '0';

        canvas.appendChild(note);

        requestAnimationFrame(() => {
            note.style.transform = \`rotate(\${rotation}deg) scale(1)\`;
            note.style.opacity = '1';
        });

        ideaCount++;
        updateCount();

        note.addEventListener('click', () => {
            note.style.transform = \`rotate(\${rotation + 15}deg) scale(0.5)\`;
            note.style.opacity = '0';
            setTimeout(() => {
                note.remove();
                ideaCount--;
                updateCount();
            }, 300);
        });
    }

    if (addButton) addButton.addEventListener('click', addIdea);

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            const notes = canvas.querySelectorAll('.idea-note');
            notes.forEach((note, index) => {
                setTimeout(() => {
                    note.style.opacity = '0';
                    note.style.transform += ' scale(0.5)';
                    setTimeout(() => note.remove(), 300);
                }, index * 40);
            });
            ideaCount = 0;
            updateCount();
        });
    }
}`,
    },
    {
        name: '🎧 Atmospheric Ambient Noise',
        html: `<div class="atmosphere-widget relative w-full overflow-hidden rounded-[2rem] border border-sec/20 bg-bg p-6 sm:p-8 font-sans text-fg">
    <!-- Animated visual -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="atmosphere-wave atmosphere-wave-1 absolute -bottom-24 left-[-10%] h-48 w-[120%] rounded-[50%] bg-accent/[0.06]"></div>
        <div class="atmosphere-wave atmosphere-wave-2 absolute -bottom-28 left-[-10%] h-52 w-[120%] rounded-[50%] bg-accent/[0.08]"></div>
        <div class="atmosphere-wave atmosphere-wave-3 absolute -bottom-32 left-[-10%] h-56 w-[120%] rounded-[50%] bg-accent/[0.05]"></div>
    </div>

    <div class="relative">
        <div class="flex items-start justify-between gap-6">
            <div>
                <p class="text-sm text-sec">
                    Set the atmosphere
                </p>

                <h3 class="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    Read with a little noise.
                </h3>
            </div>

            <button
                type="button"
                class="atmosphere-toggle flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-sec/20 bg-bg text-fg transition-all duration-500 hover:scale-110 hover:border-accent/40 cursor-pointer"
                aria-label="Play atmosphere"
            >
                <svg
                    class="atmosphere-play h-5 w-5 translate-x-[1px]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M8 5v14l11-7z"></path>
                </svg>

                <svg
                    class="atmosphere-pause hidden h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M7 5h3v14H7zm7 0h3v14h-3z"></path>
                </svg>
            </button>
        </div>

        <!-- Sound choices -->
        <div class="mt-10 grid grid-cols-3 gap-3">
            <button
                type="button"
                data-sound="rain"
                class="atmosphere-option group rounded-2xl border border-sec/20 p-4 text-left transition-all duration-300 hover:bg-sec/15 cursor-pointer"
            >
                <span class="text-2xl">☔</span>

                <span class="mt-4 block text-sm font-medium text-fg">
                    Rain
                </span>

                <span class="mt-1 block text-xs text-sec">
                    soft &amp; distant
                </span>
            </button>

            <button
                type="button"
                data-sound="cafe"
                class="atmosphere-option group rounded-2xl border border-sec/20 p-4 text-left transition-all duration-300 hover:bg-sec/15 cursor-pointer"
            >
                <span class="text-2xl">☕</span>

                <span class="mt-4 block text-sm font-medium text-fg">
                    Café
                </span>

                <span class="mt-1 block text-xs text-sec">
                    quiet chatter
                </span>
            </button>

            <button
                type="button"
                data-sound="space"
                class="atmosphere-option group rounded-2xl border border-sec/20 p-4 text-left transition-all duration-300 hover:bg-sec/15 cursor-pointer"
            >
                <span class="text-2xl">◌</span>

                <span class="mt-4 block text-sm font-medium text-fg">
                    Space
                </span>

                <span class="mt-1 block text-xs text-sec">
                    low frequency
                </span>
            </button>
        </div>

        <!-- Now playing -->
        <div class="mt-6 flex items-center gap-3">
            <div class="flex h-8 items-end gap-[3px]">
                <span class="sound-bar h-2 w-[3px] rounded-full bg-accent"></span>
                <span class="sound-bar h-5 w-[3px] rounded-full bg-accent"></span>
                <span class="sound-bar h-3 w-[3px] rounded-full bg-accent"></span>
                <span class="sound-bar h-6 w-[3px] rounded-full bg-accent"></span>
            </div>

            <p class="atmosphere-status text-sm text-sec">
                Choose an atmosphere
            </p>
        </div>
    </div>
</div>`,
        css: `/* Atmosphere waves */`,
        js: `const widget = container.querySelector('.atmosphere-widget');
if (widget) {
    const toggle = widget.querySelector('.atmosphere-toggle');
    const playIcon = widget.querySelector('.atmosphere-play');
    const pauseIcon = widget.querySelector('.atmosphere-pause');
    const status = widget.querySelector('.atmosphere-status');
    const options = widget.querySelectorAll('.atmosphere-option');
    const bars = widget.querySelectorAll('.sound-bar');

    let selectedSound = null;
    let playing = false;

    options.forEach((option) => {
        option.addEventListener('click', () => {
            selectedSound = option.dataset.sound;
            options.forEach((item) => {
                item.classList.remove('border-accent', 'bg-accent/10');
            });
            option.classList.add('border-accent', 'bg-accent/10');
            if (status) {
                status.textContent = \`\${selectedSound.charAt(0).toUpperCase() + selectedSound.slice(1)} atmosphere selected\`;
            }
        });
    });

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (!selectedSound) {
                if (status) status.textContent = 'Choose an atmosphere first';
                return;
            }

            playing = !playing;
            if (playIcon) playIcon.classList.toggle('hidden', playing);
            if (pauseIcon) pauseIcon.classList.toggle('hidden', !playing);

            bars.forEach((bar, index) => {
                bar.classList.toggle('animate-bounce', playing);
                if (playing) {
                    bar.style.animationDelay = \`\${index * 120}ms\`;
                } else {
                    bar.style.animationDelay = '';
                }
            });

            if (status) {
                status.textContent = playing
                    ? \`Playing \${selectedSound} atmosphere\`
                    : \`\${selectedSound.charAt(0).toUpperCase() + selectedSound.slice(1)} paused\`;
            }
        });
    }
}`,
    },
    {
        name: '🎯 Reaction Orb Spectrum',
        html: `<div class="reaction-widget relative w-full overflow-hidden rounded-[2rem] border border-sec/20 bg-bg font-sans text-fg">
    <!-- Main area -->
    <div class="relative px-6 py-8 sm:px-10 sm:py-12">
        <div class="max-w-xl">
            <h3 class="text-2xl font-semibold tracking-tight text-fg sm:text-4xl">
                How did that land?
            </h3>

            <p class="mt-3 text-base leading-relaxed text-sec">
                Drag the orb and leave your reaction to this idea.
            </p>
        </div>

        <!-- Reaction visual -->
        <div class="relative mt-14">
            <div class="reaction-track relative h-3 w-full rounded-full bg-sec/10 cursor-pointer">
                <div
                    class="reaction-fill absolute inset-y-0 left-0 w-1/2 rounded-full bg-accent transition-[width] duration-75"
                ></div>

                <button
                    type="button"
                    class="reaction-handle absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-sec/20 bg-bg text-2xl shadow-lg transition-transform duration-200 active:cursor-grabbing"
                >
                    <span class="reaction-emoji">🤔</span>
                </button>
            </div>

            <!-- Labels -->
            <div class="mt-6 flex justify-between text-sm text-sec">
                <span>Lost me</span>
                <span>Interesting</span>
                <span>Mind blown</span>
            </div>
        </div>

        <!-- Dynamic reaction -->
        <div class="mt-16 flex items-end justify-between gap-8">
            <div>
                <p class="reaction-title text-3xl font-semibold tracking-tight text-fg">
                    Interesting.
                </p>

                <p class="reaction-description mt-2 max-w-md text-sm leading-relaxed text-sec">
                    This idea is starting to click.
                </p>
            </div>

            <button
                type="button"
                class="reaction-reset hidden rounded-full px-4 py-2 text-sm text-sec transition-colors hover:bg-sec/15 hover:text-fg cursor-pointer"
            >
                Reset
            </button>
        </div>
    </div>
</div>`,
        css: `/* Reaction orb styles */`,
        js: `const widget = container.querySelector('.reaction-widget');
if (widget) {
    const track = widget.querySelector('.reaction-track');
    const handle = widget.querySelector('.reaction-handle');
    const fill = widget.querySelector('.reaction-fill');
    const emoji = widget.querySelector('.reaction-emoji');
    const title = widget.querySelector('.reaction-title');
    const description = widget.querySelector('.reaction-description');
    const resetButton = widget.querySelector('.reaction-reset');

    let dragging = false;
    let value = 50;

    const reactions = [
        {
            emoji: '😵‍💫',
            title: 'Lost me.',
            description: 'That one needs another explanation.'
        },
        {
            emoji: '🤔',
            title: 'Thinking...',
            description: 'I get the idea, but I need a moment.'
        },
        {
            emoji: '🙂',
            title: 'Interesting.',
            description: 'This idea is starting to click.'
        },
        {
            emoji: '🤯',
            title: 'Mind blown.',
            description: 'Okay. That changed how I see it.'
        }
    ];

    function updateReaction(clientX) {
        const rect = track.getBoundingClientRect();
        value = ((clientX - rect.left) / rect.width) * 100;
        value = Math.max(0, Math.min(100, value));

        handle.style.left = \`\${value}%\`;
        fill.style.width = \`\${value}%\`;

        const index = value < 25 ? 0 : value < 50 ? 1 : value < 75 ? 2 : 3;
        const reaction = reactions[index];

        if (emoji) emoji.textContent = reaction.emoji;
        if (title) title.textContent = reaction.title;
        if (description) description.textContent = reaction.description;

        handle.style.transform = \`translate(-50%, -50%) rotate(\${(value - 50) / 4}deg) scale(1.08)\`;
        if (resetButton) resetButton.classList.remove('hidden');
    }

    function stopDragging() {
        if (!dragging) return;
        dragging = false;
        handle.style.transform = \`translate(-50%, -50%) rotate(\${(value - 50) / 4}deg) scale(1)\`;
    }

    handle.addEventListener('pointerdown', (event) => {
        dragging = true;
        handle.setPointerCapture(event.pointerId);
        updateReaction(event.clientX);
    });

    handle.addEventListener('pointermove', (event) => {
        if (dragging) updateReaction(event.clientX);
    });

    handle.addEventListener('pointerup', stopDragging);
    track.addEventListener('pointerdown', (event) => updateReaction(event.clientX));

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            value = 50;
            handle.style.left = '50%';
            fill.style.width = '50%';
            if (emoji) emoji.textContent = '🤔';
            if (title) title.textContent = 'Interesting.';
            if (description) description.textContent = 'This idea is starting to click.';
            resetButton.classList.add('hidden');
        });
    }
}`,
    },
    {
        name: '🔍 Multi-Perspective Lens',
        html: `<div class="lens-widget relative w-full overflow-hidden rounded-[2rem] border border-sec/20 bg-bg font-sans text-fg">
    <div class="relative p-6 sm:p-10">
        <div class="max-w-2xl">
            <h3 class="text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-5xl">
                Same thing.<br />
                Different lens.
            </h3>

            <p class="mt-4 max-w-lg text-base leading-relaxed text-sec">
                Change your perspective and see how the meaning changes.
            </p>
        </div>

        <!-- Perspective switcher -->
        <div class="mt-10 flex flex-wrap gap-2">
            <button
                type="button"
                data-lens="developer"
                class="lens-button is-active rounded-full border border-fg bg-fg text-bg px-4 py-2 text-sm transition-all duration-300 cursor-pointer"
            >
                Developer
            </button>

            <button
                type="button"
                data-lens="browser"
                class="lens-button rounded-full border border-sec/20 px-4 py-2 text-sm text-sec transition-all duration-300 hover:bg-sec/15 cursor-pointer"
            >
                Browser
            </button>

            <button
                type="button"
                data-lens="user"
                class="lens-button rounded-full border border-sec/20 px-4 py-2 text-sm text-sec transition-all duration-300 hover:bg-sec/15 cursor-pointer"
            >
                User
            </button>
        </div>

        <!-- Content -->
        <div class="lens-stage relative mt-8">
            <div
                class="lens-content inset-0 rounded-[1.5rem] border border-sec/20 bg-sec/[0.04] p-5 transition-all duration-500 sm:p-8"
            >
                <div class="lens-visual absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-xl text-bg transition-all duration-500">
                    ◌
                </div>

                <div class="mt-0 max-w-xl pl-16">
                    <h4 class="lens-title text-2xl font-semibold tracking-tight text-fg leading-none transition-all duration-300">
                        You write the component.
                    </h4>

                    <p class="lens-description mt-3 text-base leading-relaxed text-sec transition-all duration-300">
                        From your perspective, a re-render means your component function runs again and produces a new description of the UI.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>`,
        css: `/* Lens widget styles */`,
        js: `const widget = container.querySelector('.lens-widget');
if (widget) {
    const buttons = widget.querySelectorAll('.lens-button');
    const content = widget.querySelector('.lens-content');
    const icon = widget.querySelector('.lens-visual');
    const title = widget.querySelector('.lens-title');
    const description = widget.querySelector('.lens-description');

    const lenses = {
        developer: {
            icon: '◌',
            title: 'You write the component.',
            description: 'From your perspective, a re-render means your component function runs again and produces a new description of the UI.'
        },
        browser: {
            icon: '◐',
            title: 'The browser sees the result.',
            description: 'React compares the new result with the previous one and determines whether the real DOM actually needs to change.'
        },
        user: {
            icon: '✦',
            title: 'The interface just feels responsive.',
            description: 'The user does not experience a re-render. They only experience the final result of whatever changed on screen.'
        }
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const lens = lenses[button.dataset.lens];
            if (!lens) return;

            buttons.forEach((item) => {
                item.classList.remove('is-active', 'bg-fg', 'text-bg', 'border-fg');
                item.classList.add('text-sec', 'border-sec/20');
            });

            button.classList.add('is-active', 'bg-fg', 'text-bg', 'border-fg');
            button.classList.remove('text-sec', 'border-sec/20');

            if (content) {
                content.classList.add('opacity-0', 'scale-[0.98]', 'translate-y-2');
                setTimeout(() => {
                    if (icon) icon.textContent = lens.icon;
                    if (title) title.textContent = lens.title;
                    if (description) description.textContent = lens.description;
                    content.classList.remove('opacity-0', 'scale-[0.98]', 'translate-y-2');
                }, 250);
            }
        });
    });
}`,
    },
]

const TOKENS = [
    { label: '{{title}}', desc: 'Current Article Title' },
    { label: '{{slug}}', desc: 'Article URL Slug' },
    { label: '{{category}}', desc: 'Article Category' },
    { label: '{{readingTime}}', desc: 'Estimated Reading Time' },
    { label: '{{date}}', desc: 'Publish Date' },
    { label: '{{url}}', desc: 'Site Base URL' },
]

const THEME_COLOR_TOKENS = [
    { name: 'Background', variable: 'var(--background)', tailwind: 'bg-bg', desc: 'Light: #ffffff | Dark: #0C0C0C' },
    { name: 'Text (Foreground)', variable: 'var(--foreground)', tailwind: 'text-fg', desc: 'Light: #191919 | Dark: #E7E7E7' },
    { name: 'Secondary / Muted', variable: 'var(--sec)', tailwind: 'text-sec', desc: 'Light: #7F7F7F | Dark: #868686' },
    { name: 'Accent Color', variable: 'var(--acc)', tailwind: 'text-accent', desc: 'Configurable brand accent' },
    { name: 'Border Line', variable: 'var(--line)', tailwind: 'border-sec/20', desc: 'Light: #e5e7eb | Dark: #2d2d2d' },
    { name: 'Hover Background', variable: 'var(--hover)', tailwind: 'hover:bg-sec/15', desc: 'Light: #f3f4f6 | Dark: #1f1f1f' },
]

export const WidgetConfigModal: React.FC<WidgetConfigModalProps> = ({
    widget,
    isOpen,
    onClose,
    onSave,
}) => {
    const [title, setTitle] = useState('')
    const [customTitle, setCustomTitle] = useState('')
    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [js, setJs] = useState('')
    const [markdown, setMarkdown] = useState('')
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'markdown' | 'preview'>('html')
    const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        if (widget) {
            setTitle(widget.title || '')
            setCustomTitle(widget.config?.customTitle ?? widget.title)
            setHtml(widget.config?.html || '')
            setCss(widget.config?.css || '')
            setJs(widget.config?.js || '')
            setMarkdown(widget.config?.markdown || '')
            setActiveTab(widget.type === 'customMarkdown' ? 'markdown' : 'html')
        }
    }, [widget])

    if (!isOpen || !widget) return null

    const handleSave = () => {
        onSave(widget.id, {
            title,
            config: {
                ...widget.config,
                customTitle,
                html,
                css,
                js,
                markdown,
            },
        })
        onClose()
    }

    const insertToken = (token: string) => {
        if (widget.type === 'customMarkdown' || activeTab === 'markdown') {
            setMarkdown((prev) => prev + token)
        } else if (activeTab === 'html') {
            setHtml((prev) => prev + token)
        } else if (activeTab === 'css') {
            setCss((prev) => prev + token)
        } else if (activeTab === 'js') {
            setJs((prev) => prev + token)
        }
    }

    const loadSnippet = (snippet: typeof SNIPPETS[0]) => {
        setHtml(snippet.html)
        setCss(snippet.css)
        setJs(snippet.js)
    }

    const isCustomCode = widget.type === 'customHtml'
    const isMarkdown = widget.type === 'customMarkdown'

    const previewMarkdown = interpolateTokens(markdown, SAMPLE_ARTICLE)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-bg border border-sec/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="p-6 border-b border-sec/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center border border-accent/25">
                            {isCustomCode ? <Code2 size={20} /> : isMarkdown ? <FileText size={20} /> : <Settings size={20} />}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-fg flex items-center gap-2">
                                <span>Configure: {widget.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sec/10 text-sec">
                                    {widget.type}
                                </span>
                            </h2>
                            <p className="text-xs text-sec">
                                {isCustomCode
                                    ? 'Edit custom HTML structure, scoped CSS styles, and client scripts.'
                                    : isMarkdown
                                    ? 'Edit markdown text and format callout content.'
                                    : 'Customize widget display settings and container header.'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-sec/15 text-sec hover:text-fg transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                    {/* General Settings */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-sec">Widget Label (Admin UI)</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Widget Name"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-sec/20 text-xs font-medium text-fg focus:border-accent outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-sec">Display Header (Article Sidebar)</label>
                            <input
                                type="text"
                                value={customTitle}
                                onChange={(e) => setCustomTitle(e.target.value)}
                                placeholder="Leave blank to hide title header"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-sec/20 text-xs font-medium text-fg focus:border-accent outline-none"
                            />
                        </div>
                    </div>

                    {/* Custom HTML Code Editor Section */}
                    {isCustomCode && (
                        <div className="space-y-4">
                            {/* Editor Tabs & Quick Actions */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sec/10 pb-3">
                                <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-sec/10">
                                    {(['html', 'css', 'js', 'preview'] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors cursor-pointer ${
                                                activeTab === tab
                                                    ? 'bg-accent text-white dark:text-[#0C0C0C] shadow-xs'
                                                    : 'text-sec hover:text-fg'
                                            }`}
                                        >
                                            {tab === 'preview' ? '⚡ Live Preview' : tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Starter Snippets */}
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono text-sec">Templates:</span>
                                    {SNIPPETS.map((snip) => (
                                        <button
                                            key={snip.name}
                                            type="button"
                                            onClick={() => loadSnippet(snip)}
                                            className="px-2.5 py-1 rounded-lg border border-sec/20 bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 text-[11px] font-mono text-sec hover:text-fg transition-colors cursor-pointer"
                                        >
                                            {snip.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dynamic Tokens & Theme Color Cheat Sheet */}
                            <div className="space-y-2">
                                <div className="p-3 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10 flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-1 text-[11px] font-mono text-accent font-bold mr-1">
                                        <Tag size={12} />
                                        <span>Tokens:</span>
                                    </div>
                                    {TOKENS.map((tk) => (
                                        <button
                                            key={tk.label}
                                            type="button"
                                            title={tk.desc}
                                            onClick={() => insertToken(tk.label)}
                                            className="px-2 py-0.5 rounded-md bg-accent/15 text-accent hover:bg-accent/25 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                                        >
                                            {tk.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-3 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10 flex flex-wrap items-center gap-2">
                                    <div className="flex items-center gap-1 text-[11px] font-mono text-purple-400 font-bold mr-1">
                                        <Palette size={12} />
                                        <span>Theme Colors:</span>
                                    </div>
                                    {THEME_COLOR_TOKENS.map((ct) => (
                                        <button
                                            key={ct.name}
                                            type="button"
                                            title={`${ct.desc} — Click to insert ${activeTab === 'css' ? ct.variable : ct.tailwind}`}
                                            onClick={() => insertToken(activeTab === 'css' ? ct.variable : ct.tailwind)}
                                            className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-400 hover:bg-purple-500/25 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                                        >
                                            {ct.name} ({activeTab === 'css' ? ct.variable : ct.tailwind})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Editor Textarea */}
                            {activeTab === 'html' && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-sec">
                                        <span>HTML Markup (supports standard tags and token variables)</span>
                                    </div>
                                    <textarea
                                        rows={10}
                                        value={html}
                                        onChange={(e) => setHtml(e.target.value)}
                                        placeholder="<div>...</div>"
                                        className="w-full p-4 rounded-2xl bg-[#121214] text-[#E4E4E7] font-mono text-xs leading-relaxed border border-sec/20 focus:border-accent outline-none font-medium"
                                        spellCheck={false}
                                    />
                                </div>
                            )}

                            {activeTab === 'css' && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-sec">
                                        <span>Scoped CSS Styles (automatically scoped to this widget card)</span>
                                    </div>
                                    <textarea
                                        rows={10}
                                        value={css}
                                        onChange={(e) => setCss(e.target.value)}
                                        placeholder="/* CSS rules */\n.title { font-weight: bold; }"
                                        className="w-full p-4 rounded-2xl bg-[#121214] text-[#E4E4E7] font-mono text-xs leading-relaxed border border-sec/20 focus:border-accent outline-none font-medium"
                                        spellCheck={false}
                                    />
                                </div>
                            )}

                            {activeTab === 'js' && (
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-mono text-sec">
                                        <span>Client JavaScript (executes inside (container, articleData) scope)</span>
                                    </div>
                                    <textarea
                                        rows={10}
                                        value={js}
                                        onChange={(e) => setJs(e.target.value)}
                                        placeholder="// console.log('Widget loaded', container, articleData);"
                                        className="w-full p-4 rounded-2xl bg-[#121214] text-[#E4E4E7] font-mono text-xs leading-relaxed border border-sec/20 focus:border-accent outline-none font-medium"
                                        spellCheck={false}
                                    />
                                </div>
                            )}

                            {activeTab === 'preview' && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-mono text-sec">
                                            Simulated Render (with Sample Article Data)
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
                                            className="px-2.5 py-1 rounded-lg border border-sec/20 text-[11px] font-mono text-sec hover:text-fg transition-colors cursor-pointer"
                                        >
                                            Theme: {previewTheme.toUpperCase()}
                                        </button>
                                    </div>

                                    <div className={`p-6 rounded-2xl border border-sec/20 max-w-sm mx-auto transition-colors ${previewTheme === 'dark' ? 'bg-[#0C0C0C] text-[#E7E7E7]' : 'bg-[#FFFFFF] text-[#191919]'}`}>
                                        <WidgetErrorBoundary widgetTitle={title}>
                                            {renderWidgetComponent(
                                                {
                                                    ...widget,
                                                    title,
                                                    config: {
                                                        ...widget.config,
                                                        customTitle,
                                                        html,
                                                        css,
                                                        js,
                                                    },
                                                },
                                                SAMPLE_ARTICLE,
                                                previewTheme
                                            )}
                                        </WidgetErrorBoundary>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Custom Markdown Editor Section */}
                    {isMarkdown && (
                        <div className="space-y-4">
                            {/* Dynamic Tokens Cheat Sheet */}
                            <div className="p-3 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/10 flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-1 text-[11px] font-mono text-accent font-bold mr-1">
                                    <Tag size={12} />
                                    <span>Tokens:</span>
                                </div>
                                {TOKENS.map((tk) => (
                                    <button
                                        key={tk.label}
                                        type="button"
                                        title={tk.desc}
                                        onClick={() => insertToken(tk.label)}
                                        className="px-2 py-0.5 rounded-md bg-accent/15 text-accent hover:bg-accent/25 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                                    >
                                        {tk.label}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-mono text-sec">Markdown Content</span>
                                    <textarea
                                        rows={10}
                                        value={markdown}
                                        onChange={(e) => setMarkdown(e.target.value)}
                                        placeholder="> Write markdown callout content here..."
                                        className="w-full p-4 rounded-2xl bg-[#121214] text-[#E4E4E7] font-mono text-xs leading-relaxed border border-sec/20 focus:border-accent outline-none font-medium"
                                        spellCheck={false}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[11px] font-mono text-sec">Render Preview</span>
                                    <div className="p-4 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/20 min-h-[220px] text-sm text-fg leading-relaxed overflow-y-auto">
                                        {previewMarkdown ? (
                                            <ArticleBody content={previewMarkdown} />
                                        ) : (
                                            <div className="text-xs text-sec/60 italic font-mono">No Markdown Content</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Built-in Widget Settings Placeholder / Notice */}
                    {!isCustomCode && !isMarkdown && (
                        <div className="p-5 rounded-2xl bg-black/3 dark:bg-white/3 border border-sec/15 text-xs text-sec space-y-2">
                            <p className="leading-relaxed">
                                This is a built-in interactive component rendered directly by React with live state and animations.
                            </p>
                            <p className="text-[11px] text-sec/80">
                                You can customize its title above or toggle its active visibility from the widgets reorder list.
                            </p>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-sec/10 bg-black/2 dark:bg-white/2 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-mono text-sec hover:text-fg hover:bg-sec/10 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent text-white dark:text-[#0C0C0C] font-mono text-xs font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <Save size={14} />
                        <span>Save Configuration</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
