import { Activity } from "../types"
import { categories  } from "../data/categories"
import { useMemo } from "react"

type ActivityListProps = {
    activities: Activity[]
}

export default function ActivityList({activities} : ActivityListProps ) {

    const categotyName = useMemo(() => 
        (category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities]
    )

  return (
    <>
        <h2 className="text-4xl font-bold text-center text-slate-600">
            Comida y Actividades
        </h2>

        {
            activities.map(activity => (
                <div
                    className="justify-between px-5 py-10 mt-5 bg-white"
                    key={activity.id}
                >
                    <div className="relative space-y-2 ">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categotyName(+activity.category)}
                        </p>
                        <p className="pt-5 text-2xl font-bold ">{activity.name}</p>
                        <p className="text-4xl font-black text-lime-500">{activity.calories} Calorias {''}</p>
                    </div>

                    <div>

                    </div>

                </div>
            ))

        }
    </>
  )
}
