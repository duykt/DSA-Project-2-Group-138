
# Movie Finder🎥

A web application built with Flask (Python) for the backend and React (JavaScript) for the frontend, allowing users to browse and filter movies pulled from a large TMDB Movies dataset.

# Run Locally
### 1.) Clone the Repository
```git clone https://github.com/duykt/DSA-Project-2-Group-138.git```  
```cd DSA-Project-2-Group-138```

### 2.) Download dataset
2a.) Download *TMDB_movie_dataset_v11.csv* from https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies  
2b.) Rename the file to *tmdb_movies.csv*  
2c.) Place the file into *DSA-Project-2-Group-13/backend/*

### 3.) Setup Backend (Flask)
**Open a terminal:**  
`cd backend`  

**Create virtual enviroment (recommended)**  
```
python -m venv venv  
venv\Scripts\activate
``` 

**Install dependencies**  
`pip install -r requirements.txt` 

**Run the Flask server**  
`python app.py` 

**Do not close this terminal, keep it opened**

### 4.) Setup the Frontend (React)
**Open a new terminal window/tab**  
`cd frontend`

**Install dependencies**  
`npm install`

**Start the React App**  
`npm start`

### 5.) Connect Frontend and Backend
To route API calls from React to Flask, add a proxy to your *frontend/package.json*:  
`"proxy": "https://127.0.0.1:8080"`

### Notes
1.) Start **Flask** first  
2.) Then start **React**  
3.) Open your browser and go to *http://localhost:3000*
