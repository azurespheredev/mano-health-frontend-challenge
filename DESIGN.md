# 🎨 Technical Design Overview

## 🛠️ Tools and Libraries Used

- **UI Components**: [Mantine UI](https://mantine.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (few Mantine UI component customization using **CSS**)
- **ESLint**: [ESLint](https://eslint.org/) for code quality testing
- **Prettier**: [Prettier](https://prettier.io/) for codebase formatting
- **Husky**: [Husky](https://typicode.github.io/husky/) for defining Pre-commit actions
- **State Management**: [MobX](https://mobx.js.org/README.html)
- **CSV Parsing**: [Papaparse](https://www.papaparse.com/) for parsing CSV files
- **Data Tables**: [AG Grid](https://www.ag-grid.com/) for displaying parsed claims and generated MRF data in tables
- **Routing**: [React Router](https://reactrouter.com/) for handling routes
- **Schema Validation**: [Zod](https://zod.dev/) for validating claims data
- **API Interaction**: [Axios](https://axios-http.com/) for fetching data from APIs
- **Storage**: Store generated MRF files in a local folder (`root/data/files`)

## 🏗️ Architecture

### Frontend

```bash
├── public/
│   │   assets/
│   └── favicon.ico
└── src/
    ├── components/
    │   ├── claims/                     # Step components in ClaimsPage
    │   │   ├── Step1UploadClaims.tsx
    │   │   ├── Step2ReviewClaims.tsx
    │   │   └── Step3ProcessClaims.tsx
    │   └── shared/                     # Shared components
    │       ├── AgGridTable.tsx         # Custom AG-Grid table
    │       ├── DateParser.tsx          # Display full ISO date string
    │       └── FileDownload.tsx        # Link component
    ├── layout/
    │   └── BasicLayout.tsx             # Layout for wrapping pages
    ├── pages/
    │   ├── error/
    │   │   └── NotFound.tsx            # Page for handling 404 errors
    │   ├── ClaimsPage.tsx              # Upload, review, process claims
    │   └── MRFListPage.tsx             # List generated MRF data in table
    ├── services/
    │   ├── axiosService.ts             # Custom Axios service
    │   └── claimsService.ts
    ├── stores/
    │   ├── AlertStore.ts
    │   ├── MRFStore.ts
    │   ├── StoreProvider.tsx           # MobX store provider
    │   └── useStores.ts                # Custom hook for accessing stores
    ├── types/
    │   ├── messageTypes.ts
    │   └── props.ts
    ├── utils/
    │   ├── constants.ts                # Page contents, messages
    │   ├── enums.ts
    │   └── helpers.ts                  # Helper, utility functions
    ├── App.tsx                         # Main App component
    ├── index.css
    ├── index.tsx                       # Entry point
    └── routes.tsx                      # React Router configuration
```

### Backend

```bash
src/
├── controllers/
│   └── MRFController.ts            # Handle API endpoints
├── services/
│   └── mrfService.ts               # Convert claims data to MRF
├── utils/
│   ├── constants.ts                # Contains messages, entity name
│   ├── helpers.ts                  # Helper functions for claim conversion
└── index.ts                        # Main entry point
```

### Shared

```bash
├── src/
│   ├── types/
│   │   ├── apiTypes.ts                 # API response types
│   │   ├── claimsTypes.ts              # Claim data types
│   │   ├── mrfTypes.ts                 # MRF data types
│   │   └── index.ts
│   ├── utils/
│   │   ├── enums.ts
│   │   ├── validations.ts              # Zod validation schema
│   │   └── index.ts
└── index.ts                            # Main entry point
```

## 🔎 Double-Check Completed Requirements

### Functionality

#### 1. CSV Upload Interface

- Users can upload a CSV file using the interface. ✔️
- Appropriate feedback is provided upon file selection. ✔️

#### 2. Parsing and Validation

- CSV files are correctly parsed using Papaparse. ✔️
- Claims data is validated against the defined schema. ✔️
- Errors are handled gracefully with informative messages. ✔️

#### 3. Data Presentation and Approval

- Parsed data is displayed using AG Grid. ✔️
- Users can approve, edit, or remove claims. ✔️
- Changes are reflected accurately in the data. ✔️

#### 4. Backend API Interaction

- Approved data is sent to the backend API. ✔️
- The API generates JSON MRF files and stores them. ✔️
- API interaction is properly implemented (mocked if necessary). ✔️

#### 5. Fetching and Displaying MRF Files

- The application fetches the list of MRF files from the API. ✔️
- The list is displayed in a user-friendly manner. ✔️

### Code Quality

#### 1. Code Organization

- Code is organized into the correct folders. ✔️
- Files and components are logically structured. ✔️

#### 2. Readability and Maintainability

- Code is clean with proper spacing and indentation. ✔️
- Comments are used where necessary to explain complex logic. ✔️

#### 3. Naming Conventions

- Variables, functions, and components have meaningful names. ✔️
- Consistent naming conventions are followed throughout the project. ✔️

### Design and User Experience

#### 1. Use of Mantine Components

- Mantine components are effectively utilized. ✔️
- No custom components are created from scratch unnecessarily. ✔️

#### 2. Styling with Tailwind CSS

- Tailwind classes are used appropriately for styling. ✔️
- The application has a consistent and clean design. ✔️

#### 3. Overall UI/UX

- The interface is intuitive and easy to navigate. ✔️
- User interactions are smooth and responsive. ✔️

### Documentation

#### 1. README.md

- Contains clear instructions on setting up and running the application. ✔️
- Includes any necessary information about dependencies and configurations. ✔️

#### 2. DESIGN.md

- Provides a comprehensive explanation of the application architecture. ✔️
- Details components, state management, and API interactions. ✔️

### Following Instructions

- All the specified requirements and instructions are followed. ✔️
- You do not improvise or deviate from the given tasks. ✔️
- The application meets the objectives outlined in the challenge. ✔️

### Version Control and Commit Structure

- Commits are well-structured and follow a logical progression. ✔️
- Commit messages are clear, concise, and descriptive. ✔️
- Commits are made frequently, showing incremental progress. ✔️
- Each commit represents a single, coherent change or feature. ✔️
