# Smoker Survey Form

A ReactJS survey form for smokers built using `react-hook-form` and `yup` for form validation. The application allows users to submit survey data, stores the data in the browser's Local Storage, and displays submitted responses in a data
table.

## Features

- Form state management with `react-hook-form`
- Schema-based validation with `yup`
- Responsive survey form layout
- Store survey responses in Local Storage
- Display submitted survey data in a table
- Client-side form validation with custom error messages
- Dynamic rendering of survey records

## Getting Started

### 1. Create React Project

```bash
npm create vite@latest smoker-survey-form -- --template react
```

### 2. Install Dependencies

```bash
npm install
npm install react-hook-form yup @hookform/resolvers
```

### 3. Run the App

```bash
npm run dev
```

## Dependencies

```json
{
	"react": "^19.x",
	"react-dom": "^19.x",
	"react-hook-form": "^7.x",
	"yup": "^1.x",
	"@hookform/resolvers": "^5.x"
}
```

## Project Structure

```text
src/
│
├──
|── SurveyForm.jsx
|── TabelData.jsx
│
├── App.jsx
└── main.jsx
```

## Survey Flow

1. User fills out the smoker survey form.
2. Input data is validated using Yup.
3. If validation passes, the survey data is saved to Local Storage.
4. Stored data is retrieved from Local Storage.
5. Survey responses are displayed in a table.
6. Data remains available after page refresh.

## Validation

The application uses:

- `react-hook-form` for form handling
- `yup` for schema validation
- `@hookform/resolvers` to connect Yup with React Hook Form

Example validations:

- Required fields
- Minimum and maximum input length
- Valid email format
- Number validation
- Selection validation

## Tech Stack

- ReactJS
- Vite
- React Hook Form
- Yup
- @hookform/resolvers
- Local Storage

## Learning Objectives

- Building forms with React
- Managing form state using React Hook Form
- Creating schema validation with Yup
- Handling form submission
- Persisting data with Local Storage
- Rendering dynamic table data
- Implementing client-side validation
- Building responsive user interfaces
