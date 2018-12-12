# Visual Diff Testing Proof of Concept

## Test commands

- **Unit tests**: `npm test`
- **Integration tests**: `npm run integration-tests`

NOTE: To see the screenshot testing example you have to run the integration tests.

## The cost visual regression testing

Visual regression testing can be expensive and slow to perform because of the human element involved in the process.

Every time a change is made in a web application, visual regression testing requires a person to open a browser, navigate to the modified product, and visually assess if any detail in the rendered result is different from what it is expected to be, a process that it is time consuming and prone to human errors.

We want both developers and testers to be free to focus on app architecture, automation, and feature development without having to stop the whole workflow to check if anything is visually broken on every micro development iteration, as defined by the [TDD lifecycle](https://en.wikipedia.org/wiki/Test-driven_development#Test-driven_development_cycle).

## Automated visual diff testing

Automated visual diff testing is a response to this problem, and in this POC we will explore a potential working solution to enable automated visual diff testing to be added to an hypothetical CI pipeline by extending the Jest workflow.

## Goals

- Enable low-cost (easy to implement, easy to run) automated visual diff testing workflow by extending the Jest suite
- Provide an architecture example with typical concerns addressed (testing workflow, file storage, configuration, etc)
- Develop potential workarounds for trade-offs introduced by automated vs manual testing
- Provide developers with useful documentation on how to perform automated visual diff testing

## Tools/Dependencies

- Pixelmatch
- Jest
- Pupeteer

## Advantages

### Test every minor change in real time

Automated screenshot diff testing, as presented in this POC, is intended to be performed every time a modified file in the codebase is saved, notifying devs on any visual side effect of said change on the final integrated product/website in just a few seconds.

### Responsive design testing

Since the process is automated, to compare screenshot sets covering different screen sizes is relatively trivial. In this POC we will explore how to enable this through a config file.

### Saved screenshots as documentation

The more code coverage is provided through tests, the more screenshots of different states of the application are saved, which can be very useful as a resource for documentation.

## Limitations

### Browser support

To facilitate a fast development experience, this solution relies on **Puppeteer** as the default headless browser solution, so at the present moment only Chrome browser is supported.

### Screenshots are static

Since screenshots are static representations of the application at specific moments in time, to recreate different states of the application programmatically can be challenging sometimes, and visual testing will not be possible if the content displayed by the page is dynamic in any way (e.g. animations, dynamic data, etc).

A workaround for this problem could be page clipping.

### Not a silver bullet

Please note that as sophisticated as this solution may be, it is still a long shot away from totally replacing **UAT** and there will always be unpredictable edge cases to consider.
