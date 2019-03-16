# Trello-like Application - Front-End assignment

### Port:- http://localhost:8080

This page contains description and requirements for a Front-End assignment on [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

### Duration

The duration of this assessment is usually two days.

### Goal

The goal is to check the applicant is able to:

- Grasp what are web components,
- Create an application from scratch using web components,
- Make a responsive view,
- Write clean code,
- Cover the code with unit tests,
- Use git with readable and descriptive commits,
- Write clean, succint and readable documentation.

### Requirements

1. Create a public github repository that you will send to us.
2. For implementation you should and **can only use [Web Components](https://www.webcomponents.org/introduction)**. No frameworks or external libraries can be used for the application itself, but external frameworks are expected for testing purposes.
3. You should consume the data of the fake API provided in this repository (see section 'Materials' below).
4. Create a single page that lists all columns with their respective cards.
   - Each column is defined by a title and the cards it contains,
   - Each card is defined by a mandatory title, an optional description and the column that it belongs to.
5. The user should be able to:
   - display all columns with all cards,
   - create a new card,
   - modify a card,
   - delete a card,
   - add a column,
   - modify a column,
   - delete a column,
   - search for any keywords presents on one or multiple cards. The view should update without reloading the whole page,
   - drag and drop a card from one column to another,
   - click on a card to see its description. The description should be in the same view and extend the card container. It should not open in another page or popup/modal.
6. Cards and columns should be unique (i.e we should not see 2 cards or 2 columns with the same title).
7. Your README should have detailed instructions on how to install your application and a brief overview on how the application is structured. Assume that other developers will continue work on your application with little or no context or knowledge transfer.
8. The application should have a comprehensive test suite with good coverage. Unit testing as well as end-to-end testing is encouraged.
9. Send the link of your github repository for reviewing to [jlow@maltem.com](mailto:jlow@maltem.com).

### Specification

- The code needs to work after we pull it, `npm install`, `npm test` and `npm start`, with no bugs.
- All code should be self-contained (i.e. there should not be any npm dependencies for serving etc. that are globally installed)
- The view should be responsive, user-friendly and clear.
- Use of version control (commits, branches, etc.) should be clear and well-documented, preferably with [semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages) or similar.
- Documentation should be clear on how to install the application, as well as the structure of the application as reference for future development.
- Testing should cover as much of the application as possible, with both positive and negative cases. You are free to use any frameworks of choice (e.g. Jest, Mocha, Webdriver, web-component-tester, Cypress, etc.) to test your code. Consider adding a 'Testing Strategy' section in your README that briefly describes your approach.

##### Remarks

Feel free to add everything you think meaningful to your application as long as the above requirements are met.
In addition, to help you start this assessment:

- Making your application cross-browser is not compulsory.
- You might want to use Chrome for your development as it supports natively web components and their dependencies.

### Materials

- Your application will consume data of a fake API powered by [JSON Server](https://github.com/typicode/json-server). You will find more instructions about how to install it and use it clicking on the previous link.
- You will also find a fake DB file called `db.json` inside the `materials` folder of this repository. This fake DB contains structured data you will have to use for building your application.