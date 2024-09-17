import { useReducer } from "react"
import Form from "./components/Form"
import { ActivityReducer,InitialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList";
function App() {

  const [state, dispatch] = useReducer(ActivityReducer, InitialState)

  console.log(state);
  

  return (
    <>
      <header className="py-3 bg-lime-600">
        <div className="flex justify-between max-w-4xl mx-auto">
          <h1 className="text-lg font-bold text-center text-white uppercase ">
            Contador de Calorias
          </h1>
        </div>
      </header>

      <section className="px-5 py-20 bg-lime-500">
       <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
          />
       </div>
      </section>


      <section
        className="max-w-4xl p-10 mx-auto"
      >
        <ActivityList 
          activities={state.activities}
        />
      </section>
    </>
  )
}

export default App
