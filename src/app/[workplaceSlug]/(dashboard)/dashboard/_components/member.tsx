
// bg-[rgb(25,25,25)] 
export default function Member({
    name,
    joinDate
}:{
    name:string | null,
    joinDate:Date
}) {
  return (
    <div className="border-2 border-slate-800 px-4 py-2 rounded-lg">
        <div className="flex justify-between"> 
            <p>{name}</p>
            <p>{joinDate.toISOString().split('T')[0]}</p>
        </div>
    </div>
  )
}
