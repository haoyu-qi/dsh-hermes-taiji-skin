export function blessingDay(date = new Date()) {
  return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')
}
export function validBlessing(value, catalog, day) {
  return value?.day===day && catalog.some(d=>d.id===value.id) ? {day,id:value.id,accepted:value.accepted===true} : null
}
export function drawBlessing(catalog, day, rng = Math.random) {
  if (!catalog.length) return null
  const value=rng()
  const index=Math.min(catalog.length-1,Math.max(0,Math.floor((Number.isFinite(value)?value:0)*catalog.length)))
  return {day,id:catalog[index].id,accepted:false}
}
