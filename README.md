# Visual Diff Testing Proof of Concept

## The cost visual regression testing

Visual regression testing can be expensive and slow to perform because of the human element involved in the process.

Every time a change is made in a web application, visual regression testing requires a person to open a browser, navigate to modified website, and visually assess if any detail in the rendered result is different from what it is expected to be, a process that it is time consuming and prone to human errors.

We want both developers and testers to be free to focus on app architecture, automation, and feature development without having to stop the whole workflow to check if anything is visually broken on every development iteration.

## Automated visual diff testing

Automated visual diff testing is a response to this problem, and in this POC we will explore a potential working solution to enable automated visual diff testing to be added to an hypothetical CI pipeline.

## Dependencies

- Pixelmatch
- Jest
- Pupeteer

## Advantages

## Limitations

To facilitate a fast development experience, this solution relies on **Puppeteer** as the default headless browser solution. From the docs: _"Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol."_. This means that at the present moment only Chrome browser is supported.

Also, since screenshots are static representations of the application at specific moments in time, to recreate different states of the application programmatically can be challenging sometimes, and visual testing will not be possible if the content displayed by the page is dynamic in any way (e.g. animations, dynamic data, etc).
