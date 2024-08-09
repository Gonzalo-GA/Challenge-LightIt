# Light It Challenge

This is a little aplication called "Medical Services" which is used to seek out patients information brought in a list. There you can add new ones or edit already existing ones.

## Run Locally


**Open your terminal in the desire destination for the project**


**Clone the project**


```bash
 git clone https://github.com/Gonzalo-GA/Challenge-LightIt.git
```


**Go to the project directory**


```bash
 cd medical-service
```


**Install dependencies**


```bash
 npm install
```


**Start the server**


```bash
 npm run start
```


**Open in browser the following url**


```bash
 http://localhost:3000
```


**Enjoy 😊**



## Documentation

**Used libraries**
- **Redux Tool Kit:** managing patients state data across the app
- **axios:** server requests
- **formik:** handling form state
- **react-toastify:** handling notifications
- **typescript:** specify data types in the code
- **yup:** validating html form data

**Brief explanation on design**

I used some design patterns such as:
- **Container/Presenter Pattern:** Used for componentization with the patients list, in order not to have everything in the same component, although I would have liked it to be reusable.
- **Custom Hooks:** Used some external custom hooks from redux in order to manage and use the state data.
- **Conditional Rendering:** So some of the code is not rendered when it's not needed, in order to get a better performance.
- **Render Props:** Used in little functions such as getData and getEditIcon, to separate the code in smaller pieces and make it more readable.
- **Utility Functions:** Such as formatDate, still I would have liked to move it to a Utils.ts file.
