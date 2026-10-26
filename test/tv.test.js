import {test} from 'node:test';
import assert from 'node:assert/strict';
import {seed} from '../public/model.js';
import {tvData} from '../public/tv.js';
test('TV apresenta hoje e amanhã e exclui tarefas concluídas',()=>{
 const s=seed();s.events=[{title:'Hoje',date:'2026-10-26',time:'08:00',repeat:'none'},{title:'Amanhã',date:'2026-10-27',time:'12:00',repeat:'none'}];s.tasks[0].history=['2026-10-26'];
 const data=tvData(s,new Date('2026-10-26T15:00:00'));
 assert.equal(data.today.items[0].title,'Hoje');assert.equal(data.tomorrow.items[0].title,'Amanhã');assert.equal(data.pending.total,3);assert.equal(data.progress[0].done,1);
});
test('rotação automática permite ver todos os elementos em listas longas',()=>{
 const s=seed();s.events=Array.from({length:11},(_,i)=>({title:'Evento '+i,date:'2026-10-26',time:'08:00',repeat:'none'}));
 const seen=new Set();for(let cycle=0;cycle<3;cycle++){const data=tvData(s,new Date('2026-10-26T12:00:00'),cycle);data.today.items.forEach(e=>seen.add(e.title));assert.equal(data.today.pages,3);}
 assert.equal(seen.size,11);assert.equal(tvData(s,new Date('2026-10-26T12:00:00'),3).today.page,1);
});
test('TV muda de dia e respeita recorrências sem mutar os dados',()=>{
 const s=seed();s.events=[{title:'Semanal',date:'2026-10-26',time:'08:00',repeat:'weekly'}];let copy=JSON.stringify(s);
 assert.equal(tvData(s,new Date('2026-11-02T00:01:00')).today.total,1);assert.equal(tvData(s,new Date('2026-11-01T23:59:00')).tomorrow.total,1);assert.equal(JSON.stringify(s),copy);
});
