import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories  } from "../data/categories"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch} : ActivityListProps ) {

    const categotyName = useMemo(() => 
        (category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities]
    )

  return (
    <>
        <h2 className="text-4xl font-bold text-center text-slate-600">
            Comida y Actividades
        </h2>

        {activities.length === 0 ? <p className="mt-4 text-2xl text-center">No hay movimientos aun ...</p> :

            activities.map(activity => (
                <div
                    className="flex justify-between px-5 py-10 mt-5 bg-white shadow"
                    key={activity.id}
                >
                    <div className="relative space-y-2 ">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categotyName(+activity.category)}
                        </p>
                        <p className="pt-5 text-2xl font-bold ">{activity.name}</p>
                        <p className="text-4xl font-black text-lime-500">{activity.calories} Calorias {''}</p>
                    </div>

                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
                        >
                            <PencilSquareIcon 
                                className="w-8 h-8 text-gray-800"
                            />
                        </button>


                        <button
                            onClick={() => dispatch({type: 'delete-activity', payload: {id: activity.id}})}
                        >
                            <TrashIcon 
                                className="w-8 h-8 text-red-800"
                            />
                        </button>
                    </div>

                </div>
            ))
        }
    </>
  )
}
