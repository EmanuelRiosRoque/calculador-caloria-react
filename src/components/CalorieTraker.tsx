import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"
type CalorieTrakerProps = {
    activities: Activity[]
}
export default function CalorieTraker({activities}: CalorieTrakerProps) {
    //Contenedor
    const caloriesConsumed = useMemo(() =>activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() =>activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() =>caloriesConsumed-caloriesBurned, [activities])

  return (
    <>
        <h2 className="text-4xl font-black text-center text-white">Resumen de calorias</h2>

        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-between">
           <CalorieDisplay 
                calories={caloriesConsumed}
                text='Consumidas'
           />

            <CalorieDisplay 
                calories={caloriesBurned}
                text='Quemadas'
           />

            <CalorieDisplay 
                calories={netCalories}
                text='Diferencia'
           />   

        </div>
    </>
  )
}
