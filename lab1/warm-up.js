"use strict"


const stringMod = (array)=>{
    for(let i=0;i<array.length;i++){
        if(array[i].length<2){
            console.log(array[i]+ " is less than 2 char");
        }
        else if(array[i].length===2){
            console.log(array[i]+array[i]);
        }
        else{
            let first=array[i].slice(0,2);
            let last=array[i].slice(-2);
            console.log(first+last);
        }
    }
}
let array=["i"]
// stringMod(array)

// function Obj(id,num){
//     this.id = id;
//     this.num = num;
//     // this.lista=[]
//     // this.sortBy= ()=> {return num.sort((a,b) => a.num-num-b.num)};
// }
//
// const o=[new Obj("a",2),new Obj("b",4),new Obj("c",3)];
// o.sort((a,b)=>
//     a.num>b.num?1:-1 );
// // o.sortBy
// console.log(o);
// let a=[2,1,4,3]
// a.sort((a,b)=>
//         a-b)
// console.log(a);

function Obj(num){
    this.num=num && "coa"
}
console.log(new Obj());