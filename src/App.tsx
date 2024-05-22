import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer } from "react";
import { Action, type State } from "./types";

// 1. Crear el estado inicial.
const initialState: State = {
  fromLenguaje: "auto",
  toLenguaje: "en",
  fromText: "",
  result: "",
  loading: false,
};

// 2. Crear el reducer.
function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    return {
      ...state,
      fromLenguaje: state.toLenguaje,
      toLenguaje: state.fromLenguaje,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}
function App() {
  // 3. Crear el dispatch, usar el hook useReducer.
  const [{ fromLenguaje, toLenguaje, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          dispatch({ type: "SET_FROM_LANGUAGE", payload: "es" });
        }}
      >
        Cambiar a Español
      </button>
    </div>
  );
}

export default App;
