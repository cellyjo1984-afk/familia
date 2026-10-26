import {members,dateKey,occurs,taskDone} from './model.js';

// Paginação automática: nenhum compromisso, tarefa ou aviso fica inacessível.
export function tvData(state,now=new Date(),cycle=0){
 const day=dateKey(now),next=new Date(now);next.setDate(next.getDate()+1);
 const tomorrow=dateKey(next);
 const agenda=d=>state.events.filter(e=>occurs(e,d)).sort((a,b)=>a.time.localeCompare(b.time));
 const lists={today:agenda(day),tomorrow:agenda(tomorrow),pending:state.tasks.filter(t=>!taskDone(t,day)),notes:state.notes};
 const sizes={today:4,tomorrow:4,pending:4,notes:2};
 const result={day,tomorrowDate:tomorrow,progress:members.map(person=>{const tasks=state.tasks.filter(t=>t.person===person);return {person,total:tasks.length,done:tasks.filter(t=>taskDone(t,day)).length};})};
 for(const name of Object.keys(lists)){
  const pages=Math.max(1,Math.ceil(lists[name].length/sizes[name])),page=cycle%pages;
  result[name]={items:lists[name].slice(page*sizes[name],(page+1)*sizes[name]),page:page+1,pages,total:lists[name].length};
 }
 return result;
}
