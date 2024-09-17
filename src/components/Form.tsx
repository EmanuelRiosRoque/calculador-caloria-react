import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch} : FormProps) {

    const initialState : Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    } 

    const [activity, setActivity] = useState<Activity>(initialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        //Indetificar tipo number:
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value 
        })
    }

    //Validar Formulario
    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        // Reiniciar Form
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }


  return (
    <form 
            className="p-10 space-y-5 bg-white rounded-lg shadow"
            onSubmit={handleSubmit}
        >
        <div className="grid grid-cols-1 gap-3 ">
            <label htmlFor="category">Categoria:</label>
            <select 
            id="category"
            className="w-full p-2 bg-white border rounded-lg border-slate-300"
            value={activity.category}
            onChange={handleChange}
            >
                {
                    categories.map(category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3 ">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                type="text" 
                id="name"
                className="p-2 border rounded-lg border-slate-300"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta" 
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3 ">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input 
                type="number" 
                id="calories"
                className="p-2 border rounded-lg border-slate-300"
                placeholder="Ej. 300 - 500" 
                value={activity.calories}
                onChange={handleChange}
            />
        </div>


        <input 
            type="submit" 
            className="w-full p-2 font-bold text-white uppercase bg-gray-800 cursor-pointer hover:bg-gray-900 disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
        />
    </form>
  )
}
