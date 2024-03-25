import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from "uuid"
import type { activity } from "./types"
import { categories } from "./data/categories"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
   dispatch: Dispatch<ActivityActions>
}

const initialState: activity = {
   id: uuidv4(),
   category: 1,
   name: '',
   calories: 0
}

export default function Form({dispatch}: FormProps) {

   const [activity, setActivity] = useState<activity>(initialState)

   const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      const isNumberField = ['category', 'calories'].includes(e.target.id)
      setActivity({
         ...activity,
         [e.target.id]: isNumberField ? +e.target.value : e.target.value
      })
   }

   const isValidActivity = () => {
      const { name, calories } = activity
      return name.trim() !== '' && calories > 0
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
 
      dispatch({ type: 'save-activity', payload: {newActivity: activity} })
      
      setActivity({
         ...initialState,
         id: uuidv4(),
      })
   }

   return (
      <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category">Categoría: </label>
            <select
               name="category"
               id="category"
               className="border border-slate-300 p-2 rounded-lg w-full bg-white"
               value={activity.category}
               onChange={handleChange}
            >
               {categories.map(categories => (
                  <option
                     key={categories.id}
                     value={categories.id}
                  >
                     {categories.name}
                  </option>
               ))}
            </select>
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad: </label>
            <input
               type="text"
               id="name"
               className="border border-slate-300 p-2 rounded-lg"
               placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
               value={activity.name}
               onChange={handleChange}
            />
         </div>

         <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias: </label>
            <input
               type="text"
               id="calories"
               className="border border-slate-300 p-2 rounded-lg"
               placeholder="Calorias. Ej. 300 o 500"
               value={activity.calories}
               onChange={handleChange}
            />
         </div>

         <input
            type="submit"
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar Comida': 'Guardar Ejercicio'}
            disabled={!isValidActivity()}
         />
      </form>
   )
}   
